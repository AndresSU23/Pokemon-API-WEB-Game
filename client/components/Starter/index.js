import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import styles from "./Starter.module.css";

import GenSelection from "./GenSelection";
import StarterSelection from "./StarterSelection";

const Starter = () => {

    const { userPokemon, getStarters } = useAuth();
    const [ starters, setStarters ] = useState(null);
    const [ gen, setGen ] = useState(null);

    useEffect(() => {

        const fetchData = async () => {

            await getStarters()
                .then((data) => setStarters(data))
                .catch((err) => console.log(err))

        }

        if (userPokemon.length === 0 && !starters) fetchData();

    }, [ starters ]);

    return (
        <>

        {
            starters && 

            <div className={styles.starter_spacer + " flex center col"}>

                { !gen && <GenSelection setGen={setGen} /> }
                { gen === 1 && starters && (<StarterSelection pokemon={starters.filter(pokemon => [1, 4, 7].includes(pokemon.pokemonId))} />) }
                { gen === 2 && starters && (<StarterSelection pokemon={starters.filter(pokemon => [152, 155, 158].includes(pokemon.pokemonId))} />) }
                { gen === 3 && starters && (<StarterSelection pokemon={starters.filter(pokemon => [252, 255, 258].includes(pokemon.pokemonId))} />) }
                { gen === 4 && starters && (<StarterSelection pokemon={starters.filter(pokemon => [387, 390, 393].includes(pokemon.pokemonId))} />) }


            </div>
        }
        
            

        </>
    )

}

export default Starter;