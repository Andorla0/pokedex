// features/battles/components/BattleCard.jsx
import { Button } from 'primereact/button';

function BattleCard({ battle, onView, onEdit, onDelete, isDeleting = false }) {
  return (
    <div className="bg-white rounded-[2rem] shadow-sm py-2 px-7 flex flex-col gap-4">
      <p className="text-sm font-semibold text-pokedex-text text-center capitalize">
        {battle.name}
      </p>

      <div className="flex items-stretch gap-3">
        <div className="flex-1 flex flex-col items-center gap-2 bg-pokedex-yellow/20 rounded-2xl p-3">
          <div className="w-20 h-20 flex items-center justify-center shrink-0">
            <img
              src={battle.pokemonImage}
              alt={battle.pokemonName}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xs font-bold text-pokedex-text capitalize text-center leading-tight">
            {battle.pokemonName}
          </span>
        </div>

        <div className="flex items-center justify-center shrink-0">
          <div className="bg-pokedex-header text-white text-xs font-black w-8 h-8 rounded-full flex items-center justify-center">
            VS
          </div>
        </div>

        <div
          className={`flex-1 flex flex-col items-center gap-2 rounded-2xl p-3 ${
            battle.winner === 'dragonball'
              ? 'bg-pokedex-accent/20 ring-2 ring-pokedex-accent'
              : 'bg-pokedex-yellow/20'
          }`}
        >
          <div className="w-20 h-20 flex items-center justify-center shrink-0">
            <img
              src={battle.characterImage}
              alt={battle.characterName}
              className="w-full h-full object-contain"
            />
          </div>

          <span className="text-xs font-bold text-pokedex-text text-center leading-tight">
            {battle.characterName}
          </span>

          {battle.winner === 'dragonball' && (
            <span className="text-xs bg-pokedex-accent text-white px-2 py-0.5 rounded-full flex items-center gap-1">
              <i className="pi pi-trophy text-xs" /> Winner
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2 pb-5">
        <Button
          label="View"
          icon="pi pi-eye"
          size="small"
          className="flex-1 bg-pokedex-accent border-pokedex-accent hover:bg-pokedex-header/60 text-sm"
          onClick={onView}
          disabled={isDeleting}
        />
        <Button
          icon="pi pi-pencil"
          size="small"
          outlined
          className="border-pokedex-accent text-pokedex-accent hover:bg-pokedex-accent hover:text-white"
          onClick={onEdit}
          disabled={isDeleting}
        />
        <Button
          icon={isDeleting ? 'pi pi-spin pi-spinner' : 'pi pi-trash'}
          size="small"
          outlined
          className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
          onClick={onDelete}
          disabled={isDeleting}
        />
      </div>
    </div>
  );
}

export default BattleCard;