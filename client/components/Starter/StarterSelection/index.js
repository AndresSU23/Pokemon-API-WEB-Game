import { useState, useEffect } from "react";
import styles from "../Starter.module.css";
import { useAuth } from "@/context/authContext";

const StarterSelection = ({ pokemon }) => {

    const { addPokemon, setLoginMenu } = useAuth();
    const [ starters, setStarters ] = useState(null);

    const enterHandler = ({ currentTarget }) => {

        const pokeball = currentTarget.querySelector('.poke');
        const img = currentTarget.querySelector('img');

        pokeball.classList.remove('rock');
        pokeball.classList.add('open');

        img.style.opacity = 1;

    }

    const leaveHandler = ({ currentTarget }) => {

        const pokeball = currentTarget.querySelector('.poke');
        const img = currentTarget.querySelector('img');

        pokeball.classList.remove('open');
        pokeball.classList.add('rock');

        img.style.opacity = 0;

    }

    const addStarterPokemon = async (pokemon) => {

        await addPokemon(pokemon);
        setLoginMenu(null);
        
    }

    useEffect(() => {

        const fetchData = async () => {

            try {
                const array = await Promise.all(
                    pokemon.map(async (p) => {
                        const response = await fetch(`http://localhost:3001/api/pokedex/${p.pokemonId}`);
                        const data = await response.json();
                        return data;
                    })
                );
                
                setStarters(array);

            } 
            
            catch (error) { console.error("Error fetching data:", error); }

        }

        fetchData()

    }, [])

    return (
        <>
        
            <div className={styles.select_message + " flex center col"}>
                <p>Select your Starter!</p>
            </div>

            <div className={styles.select_starter + " flex row"}>

            { 
                starters &&
                
                    starters.map((starter, index) => 
                        <div key={starter.id} className={styles.choice + " flex center"} onMouseEnter={enterHandler} onMouseLeave={leaveHandler}>
                            <div className={styles.selected_pokemon_spacer + " flex center"} onClick={() => addStarterPokemon(pokemon[index]) }>
                                <img src={(pokemon[index].shiny) ? starter.sprite.shiny : starter.sprite.default} alt={starter.name} />
                            </div>
                            <div className="poke ball rock"></div>
                        </div>
                    )
            }
                    
            </div>
            
            <div className={styles.back_button_spacer}>
                <button onClick={() => setLoginMenu("gen")}>Back</button>
            </div>
        
        </>
    )

}

export default StarterSelection;