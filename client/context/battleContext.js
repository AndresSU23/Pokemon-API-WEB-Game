import { createContext, useContext, useEffect, useReducer, useCallback, useState } from "react";
import { fetcher } from "@/utils/fetch";
import useSWR from "swr";
import axios from "axios";
import { useAuth } from "./authContext";
import {determineMoveOrder, willHit, calculateDamage} from "@/utils/battle";

const NO_EVENT_TYPE = 10;


const BattleContext = createContext();

export const useBattle = () => useContext(BattleContext);

export const BattleProvider = ({ children }) => {

    const { user, logout, userPokemon, getUserPokemon, setUserPokemon } = useAuth();

    const [ menu, setMenu ] = useState(null);
    const [ screen, setScreen ] = useState("map")
    const [ position, setPosition ] = useState({ x: 112, y: 240 })
    const [ opponent, setOpponent ] = useState(null);
    const [ encounters, setEncounters ] = useState(null);
    const [ tileSize, setTileSize ] = useState(16);
    const [ userMoves, setUserMoves ] = useState([]);
    const [ opponentMoves, setOpponentMoves ] =  useState([]);
    const [ userAction, setUserAction ] = useState(null);
    const [ opponentAction, setOpponentAction ] = useState(null);
    const [ message, setMessage ] = useState(null);

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

    async function setMoveSet(moveSet, setMoves) {

        let moves = []
        for (let i = 0; i < moveSet.length; i++) {
            const moveInfo = moveSet[i];
            moves[i] = await getMoveById(moveInfo.moveId);;
        }

        setMoves(moves)
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

    const getMoveById = useCallback(async (moveId) => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get(`http://localhost:3001/api/battle/move/${moveId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Token invalid or other error occurred:', error);
            logout();
        }
        
    }, [])

    useEffect(() => {
        console.log(`Current User: ${user}`);
        
        (user) && setRandomEncounterPerGrass();
        (!user) && setScreen("map");

    }, [ user ])

    useEffect(() => {

        (userPokemon && userPokemon[0] && userPokemon[0].moveSet) && setMoveSet(userPokemon[0].moveSet, setUserMoves);
    
    }, [ userPokemon ]);

    useEffect(() => {

        (opponent && opponent.moveSet) && setMoveSet(opponent.moveSet, setOpponentMoves);
    }, [ opponent ]);

    useEffect(() => {
        
        if(userAction && opponentAction)
        {
        const order = determineMoveOrder(userAction.name, opponentAction.name,
                                            userPokemon[0].ivs.speed, opponent.ivs.speed);

        for (let i = 0; i < order.length; i++) {
            if (order[i] == userAction.name){

                setMessage(`${ userPokemon[0].name} used ${userAction.name}`);
                
                if (willHit(userPokemon[0].ivs, opponent.ivs, userAction.accuracy)){
                    const result = calculateDamage({
                        targetTypes: opponent.types,
                        targetStats: opponent.ivs,
                        moveUsed: opponentAction.name,
                        attackerLevel: userPokemon[0].level,
                        attackerStats: userPokemon[0].ivs,
                        moveName: userAction.name,
                        moveType: userAction.type.toLowerCase(),
                        movePower: userAction.power,
                        moveCategory: userAction.category,
                    });
                    //updateOpponentHP(dmg)
                    setOpponent(opponent => ({
                        ...opponent,  // Spread the previous state
                        hp: (opponent.hp - result[0]),  // Update only the specific property
                      }));
                    console.log(`${ userPokemon[0].name} did ${result[0]} of damage`);
                    console.log(`${ opponent.name} has ${opponent.hp} of hp`);

                    result[1] ? console.log(`It was ${result[1]}`) : {};
                }
                else {
                    console.log("Attacked Missed")
                }
            }
            else {
                console.log(`${opponent.name} used ${opponentAction.name}`);
                if (willHit(opponent.ivs, userPokemon[0].ivs, opponentAction.accuracy)){
                    const result = calculateDamage({
                        targetTypes: userPokemon[0].types,
                        targetStats: userPokemon[0].ivs,
                        moveUsed: userAction.name,
                        attackerLevel: opponent.level,
                        attackerStats: opponent.ivs,
                        moveName: opponentAction.name,
                        moveType: opponentAction.type.toLowerCase(),
                        movePower: opponentAction.power,
                        moveCategory: opponentAction.category,
                    });
                    //updateUserHP(dmg)
                    setUserPokemon(userPokemon => [
                        {
                          ...userPokemon[0],  // Spread the first object to keep other properties unchanged
                          hp: (userPokemon[0].hp - result[0]),  // Update only the property you want
                        },
                        ...userPokemon.slice(1)  // Keep the rest of the array unchanged
                      ]);
                    console.log(`${ opponent.name} did ${result[0]} of damage`);
                    console.log(`${ userPokemon[0].name} has ${userPokemon[0].hp} of hp`);
                    console.log(userPokemon[0]);
                    
                    
                    result[1] ? console.log(`It was ${result[1]}`) : {};
                }
                else {
                    console.log("Attacked Missed")
                }
            }
        }
        setUserAction(null);
        setOpponentAction(null);
        setMenu("fight")
    }
    }, [userAction, opponentAction, userMoves, opponentMoves]);

    useEffect(() => {
        (userAction && setOpponentAction(opponentMoves[0]))
    }, [userAction, opponentMoves]);

    useEffect(() => {

        if (screen === "map") { 
            (!userPokemon && getUserPokemon());
            setMessage(null);
            setMenu(null);
        }

    }, [ screen ])

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
        message, 
        setMessage,
        setTileSize,
        opponentMoves,
        userMoves,
        setUserAction
        
    }

    return (
        <BattleContext.Provider value={context}>
            { children }
        </BattleContext.Provider>
    )

}