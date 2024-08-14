import { useBattle } from "@/context/battleContext";
import { useAuth } from '@/context/authContext';
import { useRef, useState, useEffect } from "react";
import styles from "./FightMenu.module.css";
import Message from "../Message";

const formatMoveName = (name) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '); 
  };

const FightMenu = () => {

    const menuRef = useRef();
    const messageRef = useRef(null);

    const { menu, setMenu, userMoves, setUserAction, message, setMessage } = useBattle();
    const [ selected, setSelected ] = useState(1);
    const [ selectedPokemon, setSelectedPokemon ] = useState(null);
    const { userPokemon } = useAuth();
    

    const handleKeyDown = (e) => {

        if (e.key === "ArrowDown") setSelected(prev => (prev > 5) ? prev : prev + 1);
        if (e.key === "ArrowUp") setSelected(prev => (prev <= 1) ? prev : prev - 1);

        if (e.key === "Enter") {

            if (selected >= 1 && selected <= 4){
                console.log(userMoves[selected - 1]);
                setMenu(null)
                setUserAction(userMoves[selected - 1]);
            }
            else if (selected === 5) setMenu(null)

        }

    }

    const handleMessagePress = (e) => {

        if (e.key === "Enter") {

            setMenu(null);
            setMessage(null);

        }

    }

    useEffect(() => {

        if (userPokemon.length > 0) {

            setSelectedPokemon(userPokemon[0]); 

        }

    }, [ userPokemon ])

    useEffect(() => { (menuRef.current) && menuRef.current.focus(); }, [ menuRef ])
    useEffect(() => { (messageRef.current) && messageRef.current.focus(); }, [ messageRef, message ]);  

    return (

            <>

            { !message && 

                <div tabIndex={0} ref={menuRef} className="flex test_menu_div" onKeyDown={handleKeyDown}>

            <div className={"flex col " + styles.fight_menu_spacer}>
                <div className={"flex row wrap " + styles.move_inputs_spacer}>
                { userMoves.map((move, index) => (
                    <div key={index} className={"flex center " + styles.move_input_button + ` ${(index === (selected - 1)) ? styles.selected : ""}`}
                    >
                        <div className={"flex center col " + styles.move_input_text_spacer}>
                            <h3>{formatMoveName(move.name)}</h3>
                            <span className="flex row">
                                <div className={"flex center " + styles.move_type + " " + styles[move.type]}>{move.type.toUpperCase()}</div>
                                <div className={"flex center " + styles.move_pp}>PP {userPokemon[0].moveSet[index].pp}/{userPokemon[0].moveSet[index].ppMax}</div>
                            </span>
                        </div>
                    </div>
                ))}


                </div>

                <div className={"flex center " + styles.cancel_button + ` ${(selected === 5) ? styles.selected : ""}`}>Cancel</div>

            </div>

            </div>

            }

            { message && <Message ref={messageRef} onKeyDown={handleMessagePress} message={message} /> }

            </>


    )

}

export default FightMenu;