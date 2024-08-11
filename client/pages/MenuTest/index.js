import MapMenu from "@/components/Menus/MapMenu";
import Pokedex from "@/components/Menus/Pokedex";
import Pokemon from "@/components/Menus/Pokedex/Pokemon";
import PokemonMenu from "@/components/Menus/PokemonMenu";
import { useState } from "react";

const MenuTest = () => {

    const [ selected, setSelected ] = useState(null);

    return (
        <section className="flex center">
            <div className="flex row">
                <MapMenu onClick={(input) => setSelected(input)} />
                { selected === "pokemon" && <PokemonMenu /> }
                { selected === "pokedex" && <Pokemon id={1} /> }
            </div>
        </section>
    )

}

export default MenuTest;