import { createContext, useContext, useEffect, useReducer, useCallback, useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState();

    const get = useCallback(async (url) => {

        const token = localStorage.getItem('token');

        const { data, error } = (token) ? useSWR(`http://localhost:3001/api/${url}`, fetcher) : { data: null, error: "No token presented..." };
        return { data, error };
    
    }, []);

    const context = { 
        get
    }

    return (
        <AuthContext.Provider value={context}>
            { children }
        </AuthContext.Provider>
    )


}