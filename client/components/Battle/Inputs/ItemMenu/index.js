import { useAuth } from "@/context/authContext";
import { useEffect, useState, useRef } from "react";

import styles from "./ItemMenu.module.css";
import { useBattle } from "@/context/battleContext";
import { Icon } from '@iconify-icon/react';
import { gsap } from 'gsap';

const ItemMenu = () => {

    const menuRef = useRef(null);
    const messageRef = useRef(null);
    const iconRef = useRef(null);

    const { getUserItems, userItems, addPokemon } = useAuth();
    const [ selected, setSelected ] = useState(1);
    const { setMenu, menu, setScreen, opponent, message, setMessage } = useBattle();

    const animateIcon = () => { (iconRef.current) && gsap.to(iconRef.current, { duration: 1, opacity: 0, repeat: -1, yoyo: true}) }

    const handleKeyDown = (e) => {

        if (e.key === "ArrowDown") setSelected(prev => (prev > 2) ? prev : prev + 1);
        if (e.key === "ArrowUp") setSelected(prev => (prev <= 1) ? prev : prev - 1);

        if (e.key === "Enter") {

            if (selected === 1) catchPokemon();
            else if (selected === 2) setMenu(null);

        }

    }

    const catchPokemon = async () => {

        if (opponent) {

            setMessage("Caught " + opponent.name.toUpperCase() + "!");

        }

    }

    const catchAwaitPress = async (e) => {

        if (e.key === "Enter") {

            await addPokemon(opponent);
            setMenu(null);
            setScreen("map");

        }

    }

    useEffect(() => {

        getUserItems();

    }, [])

    useEffect(() => { menuRef.current && menuRef.current.focus() }, [ menuRef, menu ]);
    useEffect(() => { messageRef.current && messageRef.current.focus(); animateIcon(); }, [ messageRef, message ]);

    return (
        <div tabIndex={0} ref={menuRef} className="flex center test_menu_div" onKeyDown={handleKeyDown}>

            {! message &&

            <div className={"flex col center " + styles.item_menu_spacer}>

                <div className={"flex row center wrap " + styles.items_menu}>

                    { userItems.map((item, index) => {

                            return <div key={index} className={"flex center col " + styles.item +  ` ${(index === (selected - 1)) ? styles.selected : ""}`}>

                                <div className={"flex " + styles.item_line}>{item.name}</div>
                                <div className={"flex " + styles.item_line}>x&nbsp;{item.quantity}</div>

                            </div>

                        })
                    
                    }

                    { Array.from({ length: 4 - userItems.length }, () => 1).map(p => 

                        <div className={"flex center " + styles.item}>
                        </div>

                    ) }

                </div>

                <div className={"flex center " + styles.cancel_button + ` ${(selected === 2) ? styles.selected : ""}`}>Cancel</div>

            </div>

            }

            { message && 
                <div tabIndex={0} ref={messageRef} onKeyDown={catchAwaitPress} className={"flex center input_message"}>
                    {message}
                    <span ref={iconRef} className={"flex center arrow_blink"}><Icon icon="icon-park-solid:down-one" /></span>
                </div>}

        </div>
    )

}

export default ItemMenu;