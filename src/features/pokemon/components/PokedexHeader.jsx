
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';

function PokedexHeader({pokemonCount}) {

    return (

    <header className="w-full shadow-md bg-white  ">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 pt-4">
            <div className="w-full p-5 flex flex-col gap-3">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">Pokedex</h1>
                <p className=" text-xs md:text-sm">
                    A simple pokedex app built with React and PrimeReact :)
                </p>
                </div>

                <div className="sm:text-right">
                <p className="text-xs md:text-sm">Total Pokemon</p>
                <p className="text-xl font-bold sm:text-2xl md:text-3xl">{pokemonCount}</p>
                </div>
            </div>

            <div className="w-full h-10">
                <div className="flex gap-3 w-full h-full px-0 sm:px-2">
                <div className="p-inputgroup flex-1">
                    <InputText
                    placeholder="Search Pokemon by name"
                    className="w-full bg-slate-100 text-slate-900 pl-4"
                    />
                    <Button icon="pi pi-search" className="bg-blue-400 border-blue-400" />
                </div>
                </div>
            </div>
            </div>
        </div>
    </header>
        
        
            

    )
}

export default PokedexHeader