import styles from "../PokemonMenu.module.css";
import { Icon } from '@iconify-icon/react';

const PokemonItem = (props) => {

    return (
        <div className={"flex row center " + styles.pokemon_item + " " + `${props.selected ? styles.selected : ""}`}>
            <div className={"flex center " + styles.pokemon_icon}><img src={props.pokemon.shiny ? props.pokemon.sprite.shiny : props.pokemon.sprite.default} /></div>
            <div className={"flex col " + styles.pokemon_info_spacer}>
                <h2>{props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1)}</h2>
                <div className={"flex center row " + styles.pokemon_info_hp}>
                    <h3 className="flex center">HP</h3>
                    <span className="flex">
                        <div className={styles.pokemon_hp}></div>
                    </span>
                </div>
                <div className={"flex center " + styles.pokemon_info_hp_text}>40 / 40</div>
                <span className={"flex center " + styles.gender_symbol + " " + styles.female}>{"♀"}</span>
            </div>
            <div className={"flex center " + styles.pokemon_level}><h3>Lv. <span>{props.pokemon.level}</span></h3></div>
            <div className={styles.pokeball_bg}><Icon icon="hugeicons:pokeball" /></div>
        </div>
    )

}

export default PokemonItem;