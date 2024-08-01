import { createContext, useContext, useEffect, useReducer, useCallback, useState } from "react";
import { fetcher } from "@/utils/fetch";
import useSWR from "swr";
import axios from "axios";
import { useAuth } from "./authContext";

const BattleContext = createContext();

export const useBattle = () => useContext(BattleContext);

export const BattleProvider = ({ children }) => {

    const { user, logout } = useAuth();

    const [ menu, setMenu ] = useState(null);
    const [ opponent, setOpponent ] = useState(null);

    const get = useCallback(async (url) => {

        const { data, error } = (user) ? useSWR(`http://localhost:3001/api/${url}`, fetcher) : { data: null, error: "No token presented..." };
        return { data, error };

    }, []);

    const getRandomWildPokemon = useCallback( async () => {

        const token = localStorage.getItem('token');

        axios.get('http://localhost:3001/api/battle/wild', { headers: { Authorization: `Bearer ${token}` } })
            .then(async response => setOpponent(response.data))
            .catch(error => { console.error('Token invalid'); logout(); });

    }, []);

    useEffect(() => {

        getRandomWildPokemon();

    }, [])

    const context = {

        menu,
        setMenu,
        opponent

    }

    return (
        <BattleContext.Provider value={context}>
            { children }
        </BattleContext.Provider>
    )

}