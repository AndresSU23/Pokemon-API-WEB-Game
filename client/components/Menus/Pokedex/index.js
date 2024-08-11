import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import styles from "./Pokedex.module.css";

const Pokedex = () => {

    const [ pokemonList, setPokemonList ] = useState([]);

    useEffect(() => {

        const fetchData = async () => {

            await fetch("http://localhost:3001/api/pokedex")
            .then(async (data) => await data.json())    
            .then(data => setPokemonList(data))
            .catch(err => console.log(err))

        }

        fetchData();

    }, [])

    useEffect(() => {
        console.log(pokemonList);
    }, [ pokemonList ])

    return (
        <div className={styles.pokedex_spacer + " flex col"}>
        </div>
    )

}

export default Pokedex;