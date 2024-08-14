import { createContext, useContext, useEffect, useCallback, useState } from "react";
import { fetcher } from "@/utils/fetch";

import useSWR from "swr";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState();
    const [ userPokemon, setUserPokemon ] = useState([]);
    const [ userItems, setUserItems ] = useState([]);
    const [ loginMenu, setLoginMenu ] = useState("login");

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

    const logout = useCallback(async () => { 
        
        localStorage.removeItem('token'); 
        setUser(null);

    }, []);

    const register = async (username, password) => {

        try {

            await axios.post('http://localhost:3001/api/users', { username, password })
                .then(async () => await login(username, password))
                .then(() => setLoginMenu("starter"))
                .catch(err => console.log(err))
            

        }

        catch (error) { console.error('Register failed :', error.response.data.message); }

    }

    const addPokemon = async (pokemon) => {

        try {

            const token = localStorage.getItem('token');

            await axios.post('http://localhost:3001/api/users/pokemon', { pokemon }, { headers: { Authorization: `Bearer ${token}` }})
                .then(data => console.log(data))
                .then(async () => await getUserPokemon())
                .catch(err => console.log(err))
            

        }

        catch (error) { console.error('Register failed :', error.response.data.message); }

    }

    const getUserPokemon = useCallback(async (url, pid) => {

        const token = localStorage.getItem('token');

        if (token) {

            await axios.get('http://localhost:3001/api/users/pokemon', { headers: { Authorization: `Bearer ${token}` } })
                .then(async response => setUserPokemon(response.data))
                .catch(error => { console.error('Token invalid'); logout(); });

        }

    }, []);

    const getUserItems = useCallback(async () => {

        const token = localStorage.getItem('token');

        if (token) {

            await axios.get('http://localhost:3001/api/users/items', { headers: { Authorization: `Bearer ${token}` } })
                .then(async response => setUserItems(response.data))
                .catch(error => { console.error('Token invalid'); logout(); });

        }

    }, []);

    const updateUserItems = useCallback(async (items) => {

        console.log(items)

        const token = localStorage.getItem('token');

        if (token) {

            await axios.put('http://localhost:3001/api/users/items', { items }, { headers: { Authorization: `Bearer ${token}` }})
                    .then(data => console.log(data))
                    .catch(err => console.log(err))

        }

    }, []);

    const getStarters = useCallback(async () => {

        const token = localStorage.getItem('token');

        const starters = await axios.get('http://localhost:3001/api/pokedex/starters', { headers: { Authorization: `Bearer ${token}` } });
        return starters.data;


    }, []);

    useEffect(() => {

        const token = localStorage.getItem('token');
        
        if (token) {

            axios.get('http://localhost:3001/api/users/verify', { headers: { Authorization: `Bearer ${token}` } })
                .then(async response => setUser(response.data.username))
                .catch(error => { console.error('Token invalid'); logout(); });

        }

    }, []); 

    useEffect(() => { getUserPokemon(); }, [ user, loginMenu ]);

    useEffect(() => {

        if (user && userPokemon.length === 0) setLoginMenu("starter")
        else if (user && userPokemon.length > 0) setLoginMenu(null);
    
    }, [ userPokemon] );

    const context = {   
        user,
        userPokemon,
        setUserPokemon,    
        loginMenu,
        userItems,
        getUserItems,
        getUserPokemon,
        updateUserItems,
        setUserPokemon,
        register,
        setLoginMenu,
        getStarters,
        addPokemon,
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