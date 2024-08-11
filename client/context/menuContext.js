import { createContext, useContext, useEffect, useReducer, useCallback, useState } from "react";
import { fetcher } from "@/utils/fetch";
import useSWR from "swr";
import { useAuth } from "./authContext";

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {

    const [ mapMenu, setMapMenu ] = useState(null);
    const [ pokemonId, setPokemonId ] = useState(null);

    const context = {

        mapMenu,
        setMapMenu,
        pokemonId,
        setPokemonId

    }

    return (
        <MenuContext.Provider value={context}>
            { children }
        </MenuContext.Provider>
    )

}

