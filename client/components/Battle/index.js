import Inputs from "./Inputs";
import Screen from "./Screen"
import { useEffect } from "react";
import { useAuth } from "@/context/authContext";

const Battle = () => {

    const { userPokemon } = useAuth();

    useEffect(() => {

        //console.log(userPokemon);

    }, [ userPokemon ])

    return (
        
        <div className="easter_egg_spacer">
            <Screen />
            <Inputs />
        </div>
    )

}

export default Battle;