export default function SectionHead({ idx, label, title }) {
  return (
    <div className="sec-head">
      <div className="sec-head__meta">
        <span>{String(idx).padStart(2, '0')}</span>
        <i />
        <span>{label}</span>
      </div>
      <h2 className="sec-head__title">
        {title}
        <b>.</b>
      </h2>
    </div>
  );
}
