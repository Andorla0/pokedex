import { ProgressBar } from 'primereact/progressbar';

function StatBar({ label, value, max, color }) {
  const safeValue = Math.max(0, Math.min(value, max));
  const percentage = max > 0 ? Math.round((safeValue / max) * 100) : 0;

  return (
    <li className="list-none">
      <div className="flex justify-between text-sm capitalize text-pokedex-text mb-1">
        <span>{label.replace('-', ' ')}</span>
        <span className="font-bold">{Math.round(safeValue)}</span>
      </div>

      <ProgressBar
        value={percentage}
        showValue={false}
        className="h-2"
        style={{ '--p-progressbar-value-background': color }}
      />
    </li>
  );
}

export default StatBar;