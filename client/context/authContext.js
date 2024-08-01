import { createContext, useContext, useEffect, useCallback, useState } from "react";
import { fetcher } from "@/utils/fetch";

import useSWR from "swr";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState();
    const [ userPokemon, setUserPokemon ] = useState([]);

    const get = useCallback(async (url) => {

        const token = localStorage.getItem('token');

        const { data, error } = (token) ? useSWR(`http://localhost:3001/api/${url}`, fetcher) : { data: null, error: "No token presented..." };
        return { data, error };
    
    }, []);

    const login = async (username, password) => {

        try {

            const response = await axios.post('http://localhost:3001/api/users/login', { username, password });
            const token = response.data.token;

            localStorage.setItem('token', token);
            setUser(response.data.username);
            
        } 
        
        catch (error) { console.error('Login failed :', error.response.data.message); }

    };

    const logout = useCallback(async () => localStorage.removeItem('token'), []);

    const getUserPokemon = useCallback(async (url, pid) => {

        const token = localStorage.getItem('token');

        axios.get('http://localhost:3001/api/users/pokemon', { headers: { Authorization: `Bearer ${token}` } })
            .then(async response => setUserPokemon(response.data))
            .catch(error => { console.error('Token invalid'); logout(); });

    }, []);

    useEffect(() => {

        const token = localStorage.getItem('token');
        
        if (token) {

            axios.get('http://localhost:3001/api/users/verify', { headers: { Authorization: `Bearer ${token}` } })
                .then(async response => setUser(response.data.username))
                .catch(error => { console.error('Token invalid'); logout(); });


        }

    }, []);

    useEffect(() => { getUserPokemon(); }, []);

    const context = {
        user,
        userPokemon,
        get,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={context}>
            { children }
        </AuthContext.Provider>
    )


}