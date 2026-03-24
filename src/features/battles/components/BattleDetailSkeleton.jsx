import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';

function BattleDetailSkeleton({ onBack }) {
  return (
    <div className="min-h-screen">
      <header className="w-full bg-pokedex-header px-6 py-4 flex items-center gap-4">
        <Button
          icon="pi pi-arrow-left"
          text
          className="text-white p-0"
          onClick={onBack}
        />
        <Skeleton width="8rem" height="1.5rem" />
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">
        <Skeleton height="16rem" className="rounded-[2rem]" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton height="14rem" className="rounded-[2rem]" />
          <Skeleton height="14rem" className="rounded-[2rem]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton height="3rem" className="rounded-full" />
          <Skeleton height="3rem" className="rounded-full" />
        </div>
      </main>
    </div>
  );
}

export default BattleDetailSkeleton;