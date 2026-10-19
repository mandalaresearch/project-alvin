const { createClient } = require('@supabase/supabase-js');

const ALLOWED_ORIGINS = [
  'https://rentalps-pearl.vercel.app',
  'https://mandalapsid.vercel.app',
  'https://psmandala.vercel.app',
];

function cors(req, res) {
  const o = req.headers.origin;
  if (o && ALLOWED_ORIGINS.includes(o)) res.setHeader('Access-Control-Allow-Origin', o);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function json(res, code, obj) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(obj));
}

function supa() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
}

module.exports = async (req, res) => {
  cors(req, res);
  if (req.method === 'OPTIONS') { res.statusCode = 204; res.end(); return; }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return json(res, 503, { error: 'booking_offline' });
  }
  const sb = supa();

  // ---- GET: daftar slot terisi ----
  if (req.method === 'GET') {
    const { from, to, unit } = req.query || {};
    if (!from || !to) return json(res, 400, { error: 'range_required' });
    let q = sb.from('bookings')
      .select('id,unit,start_at,end_at,status')
      .gte('start_at', from).lte('start_at', to)
      .in('status', ['pending', 'confirmed'])
      .order('start_at', { ascending: true })
      .limit(500);
    if (unit && ['ps3', 'ps4'].includes(unit)) q = q.eq('unit', unit);
    const { data, error } = await q;
    if (error) return json(res, 500, { error: 'db_error' });
    return json(res, 200, { bookings: data || [] });
  }

  // ---- POST: buat booking baru ----
  if (req.method === 'POST') {
    const b = req.body || {};
    const unit = b.unit;
    const dur = parseInt(b.duration_hours, 10);
    const name = String(b.customer_name || '').trim();
    const wa = String(b.customer_wa || '').replace(/\D/g, '');
    const date = b.date, startTime = b.start_time;

    if (!['ps3', 'ps4'].includes(unit)) return json(res, 400, { error: 'unit_invalid' });
    if (![6, 12, 24].includes(dur)) return json(res, 400, { error: 'duration_invalid' });
    if (name.length < 2) return json(res, 400, { error: 'name_invalid' });
    if (wa.length < 9 || wa.length > 15) return json(res, 400, { error: 'wa_invalid' });
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '') || !/^\d{2}:\d{2}$/.test(startTime || '')) {
      return json(res, 400, { error: 'datetime_invalid' });
    }
    const start = new Date(date + 'T' + startTime + ':00+07:00');
    if (isNaN(start.getTime())) return json(res, 400, { error: 'datetime_invalid' });
    if (start.getTime() < Date.now() - 3600 * 1000) return json(res, 400, { error: 'datetime_past' });
    const end = new Date(start.getTime() + dur * 3600 * 1000);

    // cegah bentrok dengan booking pending/confirmed
    const { data: clash, error: cErr } = await sb.from('bookings').select('id')
      .eq('unit', unit)
      .in('status', ['pending', 'confirmed'])
      .lt('start_at', end.toISOString())
      .gt('end_at', start.toISOString())
      .limit(1);
    if (cErr) return json(res, 500, { error: 'db_error' });
    if (clash && clash.length) return json(res, 409, { error: 'slot_taken' });

    const { data, error } = await sb.from('bookings').insert({
      unit: unit,
      start_at: start.toISOString(),
      end_at: end.toISOString(),
      duration_hours: dur,
      customer_name: name,
      customer_wa: wa,
      status: 'pending',
    }).select('id').single();
    if (error) return json(res, 500, { error: 'db_error' });
    return json(res, 200, { ok: true, id: data.id });
  }

  return json(res, 405, { error: 'method_not_allowed' });
};
