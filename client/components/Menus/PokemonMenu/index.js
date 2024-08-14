import { useEffect, useRef, useState } from "react";
import styles from "./PokemonMenu.module.css";
import { Icon } from '@iconify-icon/react';
import { useAuth } from "@/context/authContext";
import PokemonItem from "./PokemonItem";

const PokemonMenu = (props) => {

    const menuRef = useRef();

    const { userPokemon, setUserPokemon } = useAuth();

    const [ selected, setSelected ] = useState(1);


    const handleKeyDown = (e) => {

        if (e.key === "ArrowDown") setSelected(prev => (prev > userPokemon.length) ? prev : prev + 1);
        if (e.key === "ArrowUp") setSelected(prev => (prev <= 1) ? prev : prev - 1);

        if (e.key === "Enter") {

            if (selected <= userPokemon.length) setUserPokemon((prev) => {

                const newOrder = [...prev];
                const [ selectedPokemon ] = newOrder.splice(selected - 1, 1);
                newOrder.unshift(selectedPokemon);
                return newOrder;
    
            })

        }

    }

    useEffect(() => {

        if (menuRef.current) { menuRef.current.focus(); }
    
    }, [ menuRef ])

    return (
        <div ref={menuRef} tabIndex={0} className={"flex " + styles.pokemon_menu_spacer} onKeyDown={handleKeyDown}>

            <div className={"flex wrap " + styles.pokemon_menu}>

            { userPokemon.map((p, index) => <PokemonItem pokemon={p} selected={selected === index + 1} />) }

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