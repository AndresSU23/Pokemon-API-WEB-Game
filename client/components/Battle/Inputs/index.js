import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from 'gsap';
import styles from '../Battle.module.css';
import { useBattle } from "@/context/battleContext";
import FightMenu from "./FightMenu";
import ItemMenu from "./ItemMenu";
import Message from "./Message";
import PokemonMenu from "./PokemonMenu";


const Inputs = () => {

    const inputRef = useRef();
    const menuRef = useRef();
    const messageRef = useRef();

    const [ selected, setSelected ] = useState(1);
    const { menu, setMenu, setScreen, message, setMessage } = useBattle();

    const handleKeyDown = (e) => {

        if (e.key === "ArrowDown") setSelected(3);
        if (e.key === "ArrowUp") setSelected(1);
        if (e.key === "ArrowLeft") setSelected(2);
        if (e.key === "ArrowRight") setSelected(4);

        if (e.key === "Enter") {

            switch (selected) {
                case 1: setMenu("fight"); break;
                case 2: setMenu("item"); break;
                case 3: setMessage("Got away safely!"); setMenu("flee"); break;
                case 4: setMenu("pokemon"); break;
            }

        }
        
    }

    const awaitEnterPress = (e) => {

        if (e.key === "Enter") {

            setMessage(null);
            setScreen("map");

        }

    }

    useEffect(() => { menuRef.current && menuRef.current.focus() }, [ menuRef, menu ]);
    useEffect(() => { (messageRef.current) && messageRef.current.focus(); }, [ messageRef, message ]);

    return (

        <>

        { (!menu && !message)
        
            &&

            <div tabIndex={0} ref={menuRef} className="flex test_menu_div" onKeyDown={handleKeyDown}>

                <div className="flex col battle_input_spacer">

                    <div ref={inputRef} className="flex center fight_input_spacer">
                        <div className={"flex center fight_button " + `${selected === 1 ? styles.selected : ""}`}>Fight</div>
                    </div>

                    <div className="flex center row options_input_spacer">
                        <div className={"flex center items_button " + `${selected === 2 ? styles.selected : ""}`}>Items</div>
                        <div className={"flex center flee_button " + `${selected === 3 ? styles.selected : ""}`}>Flee</div>
                        <div className={"flex center pokemon_button " + `${selected === 4 ? styles.selected : ""}`}>Pokemon</div>
                    </div>

                </div>

            </div>

        }

        { (menu === "fight") && <FightMenu /> }
        { (menu === "item") && <ItemMenu /> }
        { (menu === "pokemon") && <PokemonMenu /> }

        { (menu === "flee" && message) && <Message ref={messageRef} onKeyDown={awaitEnterPress} message={message} />}

        </>
    
    )
    
}

export default Inputs;