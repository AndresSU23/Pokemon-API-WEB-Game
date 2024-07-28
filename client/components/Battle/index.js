import { BattleProvider, useBattle } from "@/context/battleContext";
import Inputs from "./Inputs";
import Screen from "./Screen"
import { useEffect } from "react";

const Battle = () => {

    const { user, getUserMoves } = useBattle();

    useEffect(() => {

        getUserMoves();

    }, [ user ])

    return (
        
        <div className="easter_egg_spacer">
            <Screen />
            <Inputs />
        </div>
    )

}

export default Battle;