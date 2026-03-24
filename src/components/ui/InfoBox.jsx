function InfoBox({ label, value, className = '', valueClassName = '' }) {
  return (
    <div className={`rounded-xl bg-pokedex-bg px-4 py-3 ${className}`}>
      <span className="block text-xs text-pokedex-text/50 mb-1">{label}</span>
      <span className={`font-semibold text-pokedex-text ${valueClassName}`}>
        {value}
      </span>
    </div>
  );
}

export default InfoBox;