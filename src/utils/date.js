// "2014-05-04" → "4 Mayıs 2014" / "4 May 2014" (sunucu ve tarayıcıda aynı sonucu verir)
export function fmtDate(iso, lang = 'tr') {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(date);
}
