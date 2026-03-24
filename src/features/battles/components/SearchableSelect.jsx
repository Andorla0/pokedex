// features/battles/components/SearchableSelect.jsx
import { useMemo, useState } from 'react';
import { InputText } from 'primereact/inputtext';

function SearchableSelect({
  label,
  placeholder,
  items = [],
  selectedItem,
  error,
  onSelect,
  getItemLabel = (item) => item.name,
  getItemImage = (item) => item.image,
  capitalizeLabel = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      getItemLabel(item).toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search, getItemLabel]);

  const handleSelect = (item) => {
    onSelect(item);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-pokedex-text">{label}</label>

      <div className="relative">
        <div
          className={`w-full bg-pokedex-bg rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer border ${
            error ? 'border-red-400' : 'border-transparent'
          }`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selectedItem ? (
            <div className="flex items-center gap-2">
              <img
                src={getItemImage(selectedItem)}
                alt={getItemLabel(selectedItem)}
                className="w-6 h-6 object-contain"
              />
              <span className={capitalizeLabel ? 'capitalize' : ''}>
                {getItemLabel(selectedItem)}
              </span>
            </div>
          ) : (
            <span className="text-pokedex-text/40">{placeholder}</span>
          )}

          <i className={`pi pi-chevron-${isOpen ? 'up' : 'down'} text-pokedex-text/40`} />
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full bg-white rounded-2xl shadow-xl mt-1 overflow-hidden">
            <div className="p-2 border-b">
              <InputText
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full bg-pokedex-bg text-sm"
                autoFocus
              />
            </div>

            <ul className="max-h-48 overflow-y-auto list-none p-0 m-0">
              {filteredItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-pokedex-bg cursor-pointer"
                  onClick={() => handleSelect(item)}
                >
                  <img
                    src={getItemImage(item)}
                    alt={getItemLabel(item)}
                    className="w-8 h-8 object-contain"
                  />
                  <span className={`text-sm ${capitalizeLabel ? 'capitalize' : ''}`}>
                    {getItemLabel(item)}
                  </span>
                </li>
              ))}

              {filteredItems.length === 0 && (
                <li className="px-4 py-3 text-sm text-pokedex-text/50">
                  No results found.
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {error && <small className="text-red-500 text-xs">{error}</small>}
    </div>
  );
}

export default SearchableSelect;