import { useAuth } from "@/context/authContext";
import { useEffect, useState, useRef } from "react";

import styles from "./ItemMenu.module.css";
import { useBattle } from "@/context/battleContext";

const ItemMenu = () => {

    const menuRef = useRef(null);
    const { getUserItems, userItems, addPokemon } = useAuth();
    const [ selected, setSelected ] = useState(1);
    const { setMenu, menu, setScreen, opponent } = useBattle();

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

            await addPokemon(opponent);
            setMenu(null);
            setScreen("map");

        }

    }

    useEffect(() => {

        getUserItems();

    }, [])

    useEffect(() => { menuRef.current && menuRef.current.focus() }, [ menuRef, menu ]);

    return (
        <div tabIndex={0} ref={menuRef} className="flex test_menu_div" onKeyDown={handleKeyDown}>
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
        </div>
    )

}

export default ItemMenu;