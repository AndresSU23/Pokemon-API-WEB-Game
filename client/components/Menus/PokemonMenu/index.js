import { useEffect, useRef, useState } from "react";
import styles from "./PokemonMenu.module.css";
import { Icon } from '@iconify-icon/react';

const PokemonMenu = (props) => {

    const menuRef = useRef();
    const subMenuRef = useRef();

    const [ selected, setSelected ] = useState(1);
    const [ pokemon, setPokemon ] = useState(null);
    const [ subSelected, setSubSelected ] = useState(null);

    const handleSubDown = (e) => {

        e.stopPropagation();

        if (e.key === "ArrowDown") setSubSelected((prev) => (prev < 3) ? prev + 1 : prev);
        if (e.key === "ArrowUp") setSubSelected((prev) => (prev > 1) ? prev - 1 : prev);
        if (e.key === "Enter") { setPokemon(null); setSubSelected(null); menuRef.current.focus(); }

    }

    const handleKeyDown = (e) => {

        if (e.key === "Enter") {

            if (selected === 1) { 

                setPokemon(1); 
                setSubSelected(1);

            }

            if (selected === 7) console.log("?");

        }

        if (e.key === "ArrowDown") {
            setSelected((prev) => {
                if (prev < 7) return prev + 1;
                else return prev; 
            })
        }

        if (e.key === "ArrowUp") {
            setSelected((prev) => {
                if (prev > 1) return prev - 1;
                else return prev; 
            })
        }

    }

    useEffect(() => menuRef.current && menuRef.current.focus(), [])

    useEffect(() => {

        if (subSelected) {

            subMenuRef.current && subMenuRef.current.focus();
            menuRef.current && menuRef.current.blur();

        }
    
    }, [ subSelected ])

    return (
        <div ref={menuRef} tabIndex={0} className={"flex " + styles.pokemon_menu_spacer} onKeyDown={handleKeyDown}>

            <div className={"flex wrap " + styles.pokemon_menu}>
                <div className={"flex row center " + styles.pokemon_item + " " + `${selected === 1 ? styles.selected : ""}`}>
                    <div className={"flex center " + styles.pokemon_icon}><img src="./images/test/opponent/mew.png" /></div>
                    <div className={"flex col " + styles.pokemon_info_spacer}>
                        <h2>Mew</h2>
                        <div className={"flex center row " + styles.pokemon_info_hp}>
                            <h3 className="flex center">HP</h3>
                            <span className="flex">
                                <div className={styles.pokemon_hp}></div>
                            </span>
                        </div>
                        <div className={"flex center " + styles.pokemon_info_hp_text}>40 / 40</div>
                        <span className={"flex center " + styles.gender_symbol + " " + styles.female}>{"♀"}</span>
                    </div>
                    <div className={"flex center " + styles.pokemon_level}><h3>Lv. <span>5</span></h3></div>
                    <div className={styles.pokeball_bg}><Icon icon="hugeicons:pokeball" /></div>
                </div>
                <div className={"flex " + styles.pokemon_item + " " + `${selected === 2 ? styles.selected : ""}`}>
                    <div className={styles.pokeball_bg}><Icon icon="hugeicons:pokeball" /></div>
                </div>
                <div className={"flex " + styles.pokemon_item + " " + `${selected === 3 ? styles.selected : ""}`}>
                    <div className={styles.pokeball_bg}><Icon icon="hugeicons:pokeball" /></div>
                </div>
                <div className={"flex " + styles.pokemon_item + " " + `${selected === 4 ? styles.selected : ""}`}>
                    <div className={styles.pokeball_bg}><Icon icon="hugeicons:pokeball" /></div>
                </div>
                <div className={"flex " + styles.pokemon_item + " " + `${selected === 5 ? styles.selected : ""}`}>
                    <div className={styles.pokeball_bg}><Icon icon="hugeicons:pokeball" /></div>
                </div>
                <div className={"flex " + styles.pokemon_item + " " + `${selected === 6 ? styles.selected : ""}`}>
                    <div className={styles.pokeball_bg}><Icon icon="hugeicons:pokeball" /></div>
                </div>
            </div>

            <div className={"flex row " + styles.pokemon_info_text}>
                <div className={"flex " + styles.pokemon_info_message}>
                    <p>Choose a Pokemon.</p>
                </div>
                <div className={"flex center " + styles.pokemon_info_cancel  + " " + `${selected === 7 ? styles.selected : ""}`}>
                    Cancel
                </div>
            </div>

            {
                pokemon

                    &&
                    
                    <div tabIndex={0} className={"flex col " + styles.pokemon_options} ref={subMenuRef} onKeyDown={handleSubDown}>
                            <li><span className={`${subSelected === 1 && styles.sub_selected}`}><Icon icon="teenyicons:right-solid" /></span>Summary</li>
                            <li><span className={`${subSelected === 2 && styles.sub_selected}`}><Icon icon="teenyicons:right-solid" /></span>Switch</li>
                            <li><span className={`${subSelected === 3 && styles.sub_selected}`}><Icon icon="teenyicons:right-solid" /></span>Cancel</li>

                    </div>
            }

        </div>
    )

}

export default PokemonMenu;