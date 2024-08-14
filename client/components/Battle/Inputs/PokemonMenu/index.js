import { useAuth } from "@/context/authContext";
import styles from "./PokemonMenu.module.css";
import styles2 from "./PokemonItem";
import { useRef, useState, useEffect } from "react";
import PokemonItem from "./PokemonItem";
import { Icon } from '@iconify-icon/react';
import { useBattle } from "@/context/battleContext";

const PokemonMenu = () => {

    const { userPokemon, setUserPokemon } = useAuth();
    const { setMenu } = useBattle();
    const [ selected, setSelected ] = useState(1);

    const menuRef = useRef();

    const handleKeyDown = (e) => {

        if (e.key === "ArrowDown") setSelected(prev => (prev > userPokemon.length) ? prev : prev + 1);
        if (e.key === "ArrowUp") setSelected(prev => (prev <= 1) ? prev : prev - 1);

        if (e.key === "Enter") {

            if (selected <= userPokemon.length) setUserPokemon((prev) => {

                const newOrder = [...prev];
                const [ selectedPokemon ] = newOrder.splice(selected - 1, 1);
                newOrder.unshift(selectedPokemon);
                setMenu(null);
                return newOrder;
    
            })
    
            else if (selected === userPokemon.length + 1) setMenu(null);

        }

    }

    useEffect(() => {

        console.log(userPokemon);

    }, [ userPokemon ])

    useEffect(() => { (menuRef.current) && menuRef.current.focus(); }, [ menuRef ])

    return (
        <div tabIndex={0} ref={menuRef} className="flex test_menu_div" onKeyDown={handleKeyDown}>

        <div className={"flex col center " + styles.pokemon_menu_spacer}>

            <div className={"flex row wrap " + styles.pokemon_menu}>

            { userPokemon.map((p, index) => <PokemonItem pokemon={p} selected={(selected - 1 === index) ? true : false}/>) }

            { Array.from({ length: 6 - userPokemon.length }, () => 1).map(p => 

                <div className={"flex row center " + styles.pokemon_item}>
                    <div className={"flex col " + styles.pokemon_info_spacer}>
                    </div>
                    <div className={styles.pokeball_bg}><Icon icon="hugeicons:pokeball" /></div>
                </div>

            ) }

            </div>

            <div className={"flex center " + styles.cancel_button + ` ${(selected === (userPokemon.length + 1)) ? styles.selected : ""}`}>Cancel</div>

        </div>


        </div>
    )

}

export default PokemonMenu;