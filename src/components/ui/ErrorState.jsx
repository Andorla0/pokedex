import { Button } from 'primereact/button';

function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred.',
  actionLabel = 'Try again',
  onAction,
}) {
  return (
    <div className="bg-white rounded-[2rem] shadow-sm p-8 text-center">
      <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
        <i className="pi pi-exclamation-triangle text-red-500 text-2xl" />
      </div>

      <h2 className="text-xl font-bold text-pokedex-text">{title}</h2>
      <p className="text-pokedex-text/60 mt-2">{message}</p>

      {onAction && (
        <Button
          label={actionLabel}
          className="mt-6 bg-pokedex-accent border-pokedex-accent"
          onClick={onAction}
        />
      )}
    </div>
  );
}

export default ErrorState;