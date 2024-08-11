import { createContext, useContext, useEffect, useReducer, useCallback, useState } from "react";
import { fetcher } from "@/utils/fetch";
import useSWR from "swr";
import axios from "axios";
import { useAuth } from "./authContext";

const NO_EVENT_TYPE = 10;


const BattleContext = createContext();

export const useBattle = () => useContext(BattleContext);

export const BattleProvider = ({ children }) => {

    const { user, logout } = useAuth();

    const [ menu, setMenu ] = useState(null);
    const [ screen, setScreen ] = useState("map")
    const [ position, setPosition ] = useState({ x: 112, y: 240 })
    const [ opponent, setOpponent ] = useState(null);
    const [ encounters, setEncounters ] = useState(null);
    const [ tileSize, setTileSize ] = useState(16);

    class Odds {
        constructor (rarity, pokemonId = null, probability = null) {
            this.rarity = rarity;
            this.pokemonId = pokemonId;
            if (probability) this.probability = probability;
            else {
                switch (rarity) {
                    case "common":
                        this.probability = 15;
                        break;
                    case "uncommon":
                        this.probability = 10;
                        break;
                    case "rare":
                        this.probability = 5;
                        break;
                    default:
                        this.probability = 0;
                        break;
                }
            }
        }
        setPokemonObj(pokemonId) {this.pokemonId = pokemonId}
    }
    class BattleEvent {
        constructor (odds) {
            this.odds = odds
        }
        async triggerEvent() {
            const random = Math.floor(Math.random() * 100);
            let floor = 0;

            for (let i in this.odds) {
                if (floor >= random && random <= (floor + this.odds[i].probability)) {

                    let wildPokemon = await getWildPokemonById(this.odds[i].pokemonId)
                    console.log(`Battle Event triggered`);
                    setScreen("battle");
                    setOpponent(wildPokemon);
                    return this.odds[i].pokemonId;
                }
                floor += this.odds[i].probability;
            }
        }
    }

    const get = useCallback(async (url) => {

        const { data, error } = (user) ? useSWR(`http://localhost:3001/api/${url}`, fetcher) : { data: null, error: "No token presented..." };
        return { data, error };

    }, []);

    const setRandomEncounterPerGrass = useCallback( async () => {
        
        
        let tempEncounters = {}
        for (let i = 0; i < NO_EVENT_TYPE; i++) {
            let odds = [new Odds("common"), new Odds("common"), new Odds("uncommon"), new Odds("uncommon"), new Odds("rare")]
            for (let i = 0; i < odds.length; i++) {
                const pokemonObj = await getRandomWildPokemonByRarity(odds[i].rarity);
                odds[i].setPokemonObj(pokemonObj);
            }
            tempEncounters[i] = new BattleEvent(odds);
        }
        setEncounters(tempEncounters)
        setScreen("map");
    }, []);

    const getRandomWildPokemonByRarity = useCallback(async (rarity) => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get(`http://localhost:3001/api/battle/grass/${rarity}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Token invalid or other error occurred:', error);
            logout();
        }
    }, []);

    const getWildPokemonById = useCallback(async (pid) => {
        console.log(pid);
        
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get(`http://localhost:3001/api/battle/encounter/${pid}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Token invalid or other error occurred:', error);
            logout();
        }
    }, []);


    const getRandomWildPokemon = useCallback( async () => {

        const token = localStorage.getItem('token');

        axios.get('http://localhost:3001/api/battle/wild', { headers: { Authorization: `Bearer ${token}` } })
            .then(async response => setOpponent(response.data))
            .catch(error => { console.error('Token invalid'); logout(); });

    }, []);

    useEffect(() => {
        console.log(`Current User: ${user}`);
        
        (user) && setRandomEncounterPerGrass();

    }, [user])

    const context = {

        menu,
        screen,
        setMenu,
        setScreen,
        opponent,
        encounters,
        position,
        setPosition,
        tileSize,
        setTileSize

    }

    return (
        <BattleContext.Provider value={context}>
            { children }
        </BattleContext.Provider>
    )

}