const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

function json(res, code, obj) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(obj));
}

function sign(v) {
  return crypto.createHmac('sha256', process.env.SESSION_SECRET || 'change-me').update(v).digest('hex');
}

function authed(req) {
  const c = '; ' + (req.headers.cookie || '') + ';';
  const m = c.match(/; *adm=([^;]+);/);
  return !!(m && m[1] === sign('admin'));
}

module.exports = async (req, res) => {
  const body = req.body || {};

  // ---- login ----
  if (req.method === 'POST' && body.action === 'login') {
    const exp = process.env.ADMIN_PASSWORD || '';
    if (!exp) return json(res, 503, { error: 'no_admin_password' });
    const pw = String(body.password || '');
    const ok = pw.length === exp.length &&
      crypto.timingSafeEqual(Buffer.from(pw), Buffer.from(exp));
    if (!ok) return json(res, 401, { error: 'wrong_password' });
    res.setHeader('Set-Cookie',
      'adm=' + sign('admin') + '; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=' + (7 * 86400));
    return json(res, 200, { ok: true });
  }

  if (!authed(req)) return json(res, 401, { error: 'unauthorized' });

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return json(res, 503, { error: 'booking_offline' });
  }
  const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

  // ---- list ----
  if (req.method === 'GET') {
    const { data, error } = await sb.from('bookings').select('*')
      .order('start_at', { ascending: true }).limit(300);
    if (error) return json(res, 500, { error: 'db_error' });
    return json(res, 200, { bookings: data || [] });
  }

  // ---- set status ----
  if (req.method === 'POST' && body.action === 'set-status') {
    const { id, status } = body;
    if (!id || !['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return json(res, 400, { error: 'bad_request' });
    }
    const { error } = await sb.from('bookings').update({ status }).eq('id', id);
    if (error) return json(res, 500, { error: 'db_error' });
    return json(res, 200, { ok: true });
  }

  return json(res, 405, { error: 'method_not_allowed' });
};
