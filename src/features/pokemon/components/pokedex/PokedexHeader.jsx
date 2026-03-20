
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Dropdown } from "primereact/dropdown";
function PokedexHeader({pokemonCount, searchPokemon, onSearchChange}) {

    return (

    <header className="w-full bg-[#de5239]">
        {/* <div className="max-w-5xl mx-auto sm:px-6 md:px-10 lg:px-12 xl:px-16 p-2"> */}
        <div className="max-w-5xl mx-auto sm:px-6 md:px-10 lg:px-12 xl:px-16 p-2">
            <div className="w-full flex flex-col gap-2">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h1 className="text-xl font-bold sm:text-2xl md:text-3xl text-white">Pokedex</h1>
                        <p className=" text-xs md:text-sm text-[#ffd57b]">
                            A simple pokedex app built with React and PrimeReact :)
                        </p>
                    
                    </div>

                    <div className="sm:text-right text-[#ffd57b]">
                    <p className="text-xs md:text-sm">Total Pokemon</p>
                    <p className="text-xl font-bold sm:text-2xl md:text-3xl text-white">{pokemonCount}</p>
                </div>
            </div>

            <div className="w-full h-10">
                <div className="flex gap-3 w-full h-full px-0 sm:px-2">
                <div className="p-inputgroup flex-1">
                    <InputText
                    value={searchPokemon}
                    onChange={(e)=> onSearchChange(e.target.value)}
                    placeholder="Search Pokemon by name"
                    className="w-full bg-[#fff8f0] text-[#3d1a00] pl-4"
                    />
                    <Button icon="pi pi-search" className="bg-[#ffad52] border-[#ffad52] " />
                </div>
                </div>
            </div>
            </div>
        </div>
    </header>
        
        
            

    )
}

export default PokedexHeader