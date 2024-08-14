import styles from "./MapMenu.module.css";
import { Icon } from '@iconify-icon/react';

const MapMenu = (props) => {

    return (
        <div className={"flex col " + styles.map_menu_spacer}>

            <div className={"flex row " + styles.map_button} onClick={() => props.onClick("pokedex")}>
                <div className={"flex center " + styles.map_button_icon}><span><Icon icon="fa-solid:book" /></span></div>
                <div className={"flex center " + styles.map_button_text}>Pokdex</div>
            </div>

            <div className={"flex row " + styles.map_button} onClick={() => props.onClick("pokemon")}>
                <div className={"flex center " + styles.map_button_icon}><span><Icon icon="hugeicons:pokeball" /></span></div>
                <div className={"flex center " + styles.map_button_text}>Pokemon</div>
            </div>
            
            <div className={"flex row " + styles.map_button} onClick={() => props.onClick("items")}>
                <div className={"flex center " + styles.map_button_icon}><span><Icon icon="game-icons:gym-bag" /></span></div>
                <div className={"flex center " + styles.map_button_text}>Items</div>
            </div>

            <div className={"flex row " + styles.map_button} onClick={() => props.onClick(null)}>
                <div className={"flex center " + styles.map_button_icon}><span><Icon icon="icon-park-solid:back" /></span></div>
                <div className={"flex center " + styles.map_button_text}>Cancel</div>
            </div>

        </div>
        
    )

}

export default MapMenu;