import MapMenu from "@/components/Menus/MapMenu";
import PokemonMenu from "@/components/Menus/PokemonMenu";
import { useState } from "react";

const MenuTest = () => {

    const [ selected, setSelected ] = useState(null);

    return (
        <section className="flex center">
            <div className="flex row">
                <MapMenu onClick={(input) => setSelected(input)} />
                { selected === "pokemon" && <PokemonMenu /> }
            </div>
        </section>
    )

}

export default MenuTest;