import { useEffect, useRef, useState } from "react";
import styles from "./PokemonMenu.module.css";
import { Icon } from '@iconify-icon/react';
import { useAuth } from "@/context/authContext";
import PokemonItem from "./PokemonItem";

const PokemonMenu = (props) => {

    const menuRef = useRef();
    const subMenuRef = useRef();

    const { userPokemon } = useAuth();

    const handleKeyDown = (e) => {

        // if (e.key === "Enter") {

        //     if (selected === 1) { 

        //         setPokemon(1); 
        //         setSubSelected(1);

        //     }

        //     if (selected === 7) console.log("?");

        // }

        // if (e.key === "ArrowDown") {
        //     setSelected((prev) => {
        //         if (prev < 7) return prev + 1;
        //         else return prev; 
        //     })
        // }

        // if (e.key === "ArrowUp") {
        //     setSelected((prev) => {
        //         if (prev > 1) return prev - 1;
        //         else return prev; 
        //     })
        // }

    }

    return (
        <div ref={menuRef} tabIndex={0} className={"flex " + styles.pokemon_menu_spacer} onKeyDown={handleKeyDown}>

            <div className={"flex wrap " + styles.pokemon_menu}>

            { userPokemon.map((p) => <PokemonItem pokemon={p} />) }

            { Array.from({ length: 6 - userPokemon.length }, () => 1).map(p => 

                <div className={"flex row center " + styles.pokemon_item}>
                    <div className={"flex col " + styles.pokemon_info_spacer}>
                    </div>
                    <div className={styles.pokeball_bg}><Icon icon="hugeicons:pokeball" /></div>
                </div>

            ) }

            </div>

            <div className={"flex row " + styles.pokemon_info_text}>
                <div className={"flex " + styles.pokemon_info_message}>
                    <p>Choose a Pokemon.</p>
                </div>
            </div>

        </div>
    )

}

export default PokemonMenu;