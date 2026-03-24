
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router";

function PokedexHeader({searchPokemon, onSearchChange}) {
    const navigate = useNavigate();
    return (

    <header className="w-full bg-pokedex-header">
        <div className="max-w-5xl mx-auto sm:px-6 md:px-10 lg:px-12 xl:px-16 p-2">
            <div className="w-full flex flex-col gap-2">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-bold sm:text-2xl md:text-3xl text-white"> 
                            <i className="pi pi-mobile text-white text-xl md:text-2xl mr-1" />
                            Pokedex
                        </h1>
                        <p className="text-xs md:text-sm text-pokedex-yellow">
                            A simple pokedex app built with React and PrimeReact :)
                        </p>
                    </div>

                    <div className="flex">
                        <Button
                            label="Battles"
                            icon="fa-solid fa-bolt"
                            className="bg-pokedex-yellow border-pokedex-yellow text-pokedex-text font-bold"
                            onClick={() => navigate('/battles')}
                        />
                    </div>
                </div>

            <div className="w-full h-10">
                <div className="flex gap-3 w-full h-full px-0 sm:px-2">
                <div className="p-inputgroup flex-1">
                    <InputText
                    value={searchPokemon}
                    onChange={(e)=> onSearchChange(e.target.value)}
                    placeholder="Search Pokemon by name"
                    className="w-full bg-pokedex-bg text-pokedex-text pl-4"
                    />
                    <Button icon="pi pi-search" className="bg-pokedex-accent border-pokedex-accent " />
                </div>
                </div>
            </div>
            
            </div>
        </div>
    </header>
        
        
            

    )
}

export default PokedexHeader