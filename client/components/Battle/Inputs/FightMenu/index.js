import { useBattle } from "@/context/battleContext";
import { useRef, useState } from "react";
import styles from "./FightMenu.module.css";

const FightMenu = () => {

    const menuRef = useRef();
    const { menu, setMenu } = useBattle();
    const [ selected, setSelected ] = useState(1);

    const handleKeyDown = () => {

    }

    return (

        <div tabIndex={0} ref={menuRef} className="flex test_menu_div" onKeyDown={handleKeyDown}>

            <div className={"flex col " + styles.fight_menu_spacer}>

                <div className={"flex row wrap " + styles.move_inputs_spacer}>

                    <div className={"flex center " + styles.move_input_button}>
                        <div className={"flex center col " + styles.move_input_text_spacer}>
                            <h3>Pound</h3>
                            <span className="flex row">
                                <div className={"flex center " + styles.move_type + " " + styles.normal}></div>
                                <div className={"flex center " + styles.move_pp}>PP 35/35</div>
                            </span>
                        </div>
                    </div>

                    <div className={"flex center " + styles.move_input_button + " " + styles.dragon}>
                        <div className={"flex center col " + styles.move_input_text_spacer}>
                            <h3>Dragon Dance</h3>
                            <span className="flex row">
                                <div className={"flex center " + styles.move_type + " " + styles.dragon}></div>
                                <div className={"flex center " + styles.move_pp}>PP 20/20</div>
                            </span>
                        </div>
                    </div>

                    <div className={"flex center " + styles.move_input_button + " " + styles.psychic}>
                        <div className={"flex center col " + styles.move_input_text_spacer}>
                            <h3>Psychic</h3>
                            <span className="flex row">
                                <div className={"flex center " + styles.move_type + " " + styles.psychic}></div>
                                <div className={"flex center " + styles.move_pp}>PP 10/10</div>
                            </span>
                        </div>
                    </div>

                    <div className={"flex center " + styles.move_input_button + " " + styles.lightning}>
                        <div className={"flex center col " + styles.move_input_text_spacer}>
                            <h3>Thunder</h3>
                            <span className="flex row">
                                <div className={"flex center " + styles.move_type + " " + styles.lightning}></div>
                                <div className={"flex center " + styles.move_pp}>PP 10/10</div>
                            </span>
                        </div>
                    </div>

                </div>

                <div className={"flex center " + styles.cancel_button}>Cancel</div>

            </div>

        </div>

    )

}

export default FightMenu;