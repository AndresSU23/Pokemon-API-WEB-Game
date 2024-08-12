import { useBattle } from "@/context/battleContext";
import { useAuth } from '@/context/authContext';
import { useRef, useState } from "react";
import styles from "./FightMenu.module.css";

const FightMenu = () => {

    const menuRef = useRef();
    const { menu, setMenu, userMoves } = useBattle();
    const [ selected, setSelected ] = useState(1);
    const { userPokemon } = useAuth();

    

    const handleKeyDown = () => {

    }

    return (

        <div tabIndex={0} ref={menuRef} className="flex test_menu_div" onKeyDown={handleKeyDown}>

            <div className={"flex col " + styles.fight_menu_spacer}>

                <div className={"flex row wrap " + styles.move_inputs_spacer}>

                {userMoves.map((move, index) => (
                    <div className={"flex center " + styles.move_input_button}>
                        <div className={"flex center col " + styles.move_input_text_spacer}>
                            <h3>Pound</h3>
                            <span className="flex row">
                            <div className={"flex center " + styles.move_type + " " + styles[move.type]}></div>
                            <div className={"flex center " + styles.move_pp}>PP {userPokemon[0].moveSet[index].pp}/{userPokemon[0].moveSet[index].ppMax}</div>
                            </span>
                        </div>
                    </div>
                ))}


                </div>

                <div className={"flex center " + styles.cancel_button}>Cancel</div>

            </div>

        </div>

    )

}

export default FightMenu;