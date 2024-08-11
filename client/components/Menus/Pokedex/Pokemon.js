import { useEffect, useState } from "react";
import styles from "./Pokedex.module.css";

const Pokemon = ({ id }) => {

    const [ pokemon, setPokemon ] = useState(null);

    useEffect(() => {

        const fetchData = async () => {

            await fetch(`http://localhost:3001/api/pokedex/${id}`)
                .then(async (data) => await data.json())
                .then((data) => setPokemon(data))
                .catch(err => console.log(err))

        }

        fetchData();

    }, [ id ]);

    return (
        <div className={styles.pokedex_spacer + " flex col"}>
            { pokemon &&
            <>
            <div className={styles.top_spacer + " flex row"}>
                <div className={styles.pokedex_img}>
                    <img src={pokemon.sprite.default} alt={`${pokemon.name}'s pokedex image`}/>
                </div>
                <div className={styles.pokedex_info + " flex col"}>
                    <div className={styles.pokedex_name + " flex col"}>

                        <h2>{String(pokemon.pid).padStart(3, "0")}<span>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span></h2>
                        <h3></h3>

                    </div>

                    <div className={styles.pokedex_stats + " flex col"}>

                        <div className={styles.pokedex_types + " flex row"}>

                            { pokemon.types.map((type) => <span className={"flex center"}>{type}</span>) }

                        </div>

                        <div className={styles.pokedex_sizes + " flex col"}>
                            <h2>Weight :<span>??? kg</span></h2>
                            <h2>Height :<span>??? m</span></h2>
                        </div>

                    </div>
                </div>
            </div>
            <div className={styles.bottom_spacer + " flex col"}>
                <div className={styles.pokedex_desc + " flex center"}>
                    <p>{pokemon.description}</p>
                </div>
            </div>
            </>
            }
        </div>
    )

}

export default Pokemon;