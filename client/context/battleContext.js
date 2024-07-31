import { createContext, useContext, useEffect, useReducer, useCallback, useState } from "react";
import { fetcher } from "@/utils/fetch";
import useSWR from "swr";
import { useAuth } from "./authContext";

const BattleContext = createContext();

export const useBattle = () => useContext(BattleContext);

export const BattleProvider = ({ children }) => {

    const { user } = useAuth();

    const [ menu, setMenu ] = useState(null);

    const get = useCallback(async (url) => {

        const { data, error } = (user) ? useSWR(`http://localhost:3001/api/${url}`, fetcher) : { data: null, error: "No token presented..." };
        return { data, error };

    }, []);

    const getUserMoves = useCallback(async (url, pid) => {

        console.log(user)

        // const moves = await get(`/users/pokemon/${pid}/moves`);
        // return moves;

    }, [ user ]);

    const context = {

        getUserMoves,
        menu,
        setMenu

    }

    return (
        <BattleContext.Provider value={context}>
            { children }
        </BattleContext.Provider>
    )

}