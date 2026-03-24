// pages/battles/BattlesPage.jsx
import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

import { useBattles, useDeleteBattle } from '../../features/battles/hooks/useBattles';
import BattleCard from '../../features/battles/components/BattleCard';
import ErrorState from '../../components/ui/ErrorState';
import { showSuccess, showError } from '../../features/shared/utils/showToast';

function BattlesPageSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} height="18rem" className="rounded-[2rem]" />
      ))}
    </div>
  );
}

function EmptyState({ onCreateFirst }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      <div className="flex items-center gap-3">
        <div className="bg-pokedex-yellow/20 rounded-2xl p-4">
          <i className="fa-solid fa-dragon text-4xl text-pokedex-accent" />
        </div>
        <div className="bg-pokedex-header rounded-full p-3">
          <i className="fa-solid fa-bolt text-2xl text-white" />
        </div>
        <div className="bg-pokedex-yellow/20 rounded-2xl p-4">
          <i className="fa-solid fa-bolt text-4xl text-pokedex-yellow" />
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-xl font-bold text-pokedex-text">No battles yet!</h2>
        <p className="text-pokedex-text/50 text-sm mt-1">
          Create your first crossover battle and find out who would win.
        </p>
      </div>

      <Button
        label="+ Create First Battle"
        className="bg-pokedex-accent border-pokedex-accent font-bold rounded-full px-6"
        onClick={onCreateFirst}
      />
    </div>
  );
}

function BattlesPage() {
  const navigate = useNavigate();
  const toastRef = useRef(null);

  const {
    data: battles = [],
    isLoading,
    isError,
    refetch,
  } = useBattles();

  const { mutate: deleteBattle, isPending: isDeleting } = useDeleteBattle();

  const handleDelete = (battle) => {
    confirmDialog({
      message: `Are you sure you want to delete "${battle.name}"?`,
      header: 'Delete Battle',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => {
        deleteBattle(battle.id, {
          onSuccess: () => {
            showSuccess(toastRef, 'Battle deleted', 'The battle was removed successfully.');
          },
          onError: () => {
            showError(toastRef, 'Delete failed', 'The battle could not be deleted.');
          },
        });
      },
    });
  };

  return (
    <div className="min-h-screen">
      <Toast ref={toastRef} />
      <ConfirmDialog />

      <header className="w-full bg-pokedex-header px-6 py-4 flex items-center gap-4">
        <Button
          icon="pi pi-arrow-left"
          text
          className="text-white p-0"
          onClick={() => navigate('/')}
        />
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <i className="fa-solid fa-bolt text-pokedex-yellow" />
            Crossover Battles
          </h1>
          <p className="text-xs text-pokedex-yellow">Pokemon × Dragon Ball</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {isLoading ? (
          <BattlesPageSkeleton />
        ) : isError ? (
          <ErrorState
            title="Could not load battles"
            message="Please try again."
            actionLabel="Retry"
            onAction={refetch}
          />
        ) : battles.length === 0 ? (
          <EmptyState onCreateFirst={() => navigate('/battles/new')} />
        ) : (
          <div className="flex flex-col gap-4">
            {battles.map((battle) => (
              <BattleCard
                key={battle.id}
                battle={battle}
                onView={() => navigate(`/battles/${battle.id}`)}
                onEdit={() => navigate(`/battles/${battle.id}/edit`)}
                onDelete={() => handleDelete(battle)}
                isDeleting={isDeleting}
              />
            ))}
          </div>
        )}
      </main>

      {battles.length > 0 && (
        <button
          onClick={() => navigate('/battles/new')}
          className="fixed bottom-6 right-6 bg-pokedex-accent text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-pokedex-hover transition-colors"
        >
          +
        </button>
      )}
    </div>
  );
}

export default BattlesPage;