import { createContext, useContext, useEffect, useReducer, useCallback, useState } from "react";
import { fetcher } from "@/utils/fetch";
import useSWR from "swr";
import axios from "axios";
import { useAuth } from "./authContext";

const NO_EVENT_TYPE = 10;

class Odds {
    constructor (rarity, pokemonObj = null, probability = null) {
        this.rarity = rarity;
        this.pokemonObj = pokemonObj;
        if (probability) this.probability = probability;
        else {
            switch (rarity) {
                case "common":
                    this.probability = 20;
                    break;
                case "uncommon":
                    this.probability = 15;
                    break;
                case "rare":
                    this.probability = 10;
                    break;
                default:
                    this.probability = 0;
                    break;
            }
        }
    }

    setPokemonObj(pokemonObj) {this.pokemonObj = pokemonObj}
}
class BattleEvent {
    constructor (odds) {
        this.odds = odds
    }

    triggerEvent() {
        const random = Math.floor(Math.random() * 100);
        let floor = 0;
        for (let i in this.odds) {
            if (floor >= random && random <= this.odds[i].probability) {
                console.log(`Battle Event triggered`);
                console.log(this.odds[i].pokemonObj);
                setOpponent(this.odds[i].pokemonObj)
                setMenu("fight")
            }
            floor += this.odds[i].probability();
        }
    }
}

const BattleContext = createContext();

export const useBattle = () => useContext(BattleContext);

export const BattleProvider = ({ children }) => {

    const { user, logout } = useAuth();

    const [ menu, setMenu ] = useState(null);
    const [ opponent, setOpponent ] = useState(null);
    const [ encounters, setEncounters ] = useState(null);

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
                console.log(odds[i]);
            }
            tempEncounters[i] = new BattleEvent(odds);
        }
        setEncounters(tempEncounters)

    }, []);

    const getRandomWildPokemonByRarity = useCallback( async (rarity) => {

        const token = localStorage.getItem('token');

        let response = axios.get('http://localhost:3001/api/battle/wild', {
            params: { rarity },
            headers: { Authorization: `Bearer ${token}` }
        })
            .catch(error => { console.error('Token invalid'); logout(); });
        return response.data;

    }, []);

    const getRandomWildPokemon = useCallback( async () => {

        const token = localStorage.getItem('token');

        axios.get('http://localhost:3001/api/battle/wild', { headers: { Authorization: `Bearer ${token}` } })
            .then(async response => setOpponent(response.data))
            .catch(error => { console.error('Token invalid'); logout(); });

    }, []);

    useEffect(() => {

        (user) && setRandomEncounterPerGrass();

    }, [])

    const context = {

        menu,
        setMenu,
        opponent,
        encounters

    }

    return (
        <BattleContext.Provider value={context}>
            { children }
        </BattleContext.Provider>
    )

}