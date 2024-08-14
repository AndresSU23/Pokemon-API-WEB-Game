import { useCallback, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useAuth } from '@/context/authContext';
import { useBattle } from '@/context/battleContext';

const Screen = () => {

    const opponentRef = useRef();
    const trainerRef = useRef();
    const trainerStatsRef = useRef();

    const { userPokemon } = useAuth();
    const { opponent } = useBattle();

    const hpPercentage =  userPokemon[0].hp > 0 ? (userPokemon[0].hp / userPokemon[0].ivs.hp) * 100 : 0;
    const hpOppPercentage = opponent.hp > 0 ? (opponent.hp / opponent.ivs.hp) * 100 : 0;

    useEffect(() => {

        console.log(opponent)

    }, [ opponent ])

    return (
    
        <div className="flex battle_screen_spacer">

            <div className="flex opponent_spacer">
                <div className="flex opponent_img_spacer">
                    { opponent && <img ref={opponentRef} src={opponent.shiny ? opponent.sprite.shiny : opponent.sprite.default} alt="opponent pokemon" /> }
                </div>
                <div className="flex opponent_stats_overlay">
                    <div className="flex col opponent_stats">
                        <div className="flex row opponent_pokemon_line">
                            <h3>{opponent.name}</h3>
                            <h4>Lv<span>{opponent.level}</span></h4>
                        </div>
                        <div className="flex row center trainer_hp_line">
                            <h3>HP</h3>
                            <span className="hp_bar" style={{ width: `${hpOppPercentage}%` }}></span>
                        </div>
                        <div className="flex trainer_exp_bar"></div>
                    </div>
                </div>
            </div>

            { userPokemon.length > 0 && 
            
                <div className="flex row trainer_spacer">
                    <div className="flex center trainer_img_spacer">
                        <img ref={trainerRef} src={userPokemon[0].shiny ? userPokemon[0].sprite.back_shiny : userPokemon[0].sprite.back} alt="trainer pokemon" />
                    </div>
                    <div ref={trainerStatsRef} className="flex trainer_stats_overlay">
                        <div className="flex col trainer_stats">
                            <div className="flex row trainer_pokemon_line">
                                <h3>{userPokemon[0].name}</h3>
                                <h4>Lv<span>{userPokemon[0].level}</span></h4>
                            </div>
                            <div className="flex row center trainer_hp_line">
                                <h3>HP</h3>
                                <span className="hp_bar" style={{ width: `${hpPercentage}%` }}></span>
                            </div>
                            <div className="flex trainer_exp_bar"></div>
                        </div>
                    </div>
                </div>
            
            }

            

        </div>
        
    )
    
}

export default Screen;