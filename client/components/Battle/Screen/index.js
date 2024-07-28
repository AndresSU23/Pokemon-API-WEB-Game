import { useCallback, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Screen = () => {

    const opponentRef = useRef();
    const trainerRef = useRef();
    const trainerStatsRef = useRef();

    const animateTrainerIntro = useCallback(() => {

        const trainerTime = setTimeout(() => {

            trainerRef.current.src = './images/test/trainer/mew-shiny.png';
            trainerRef.current.style.width = "272px";
            trainerRef.current.style.height = "272px";
            trainerRef.current.style.bottom = "-14px";

            gsap.to(trainerRef.current, { delay: 0.3, y: 7, yoyo: true, repeat: -1, duration: 0.5 })
            gsap.to(trainerStatsRef.current, { delay: 0.8, y: 4, yoyo: true, repeat: -1, duration: 0.5 })

            clearTimeout(trainerTime);

        }, 2100)

    }, [])

    const animateOpponentIntro = useCallback(() => {

        const opponentTime = setTimeout(() => {

            opponentRef.current.src = './images/test/opponent/mew.png';
            opponentRef.current.style.width = "180px";
            opponentRef.current.style.height = "180px";
            opponentRef.current.style.top = "-14px";

            clearTimeout(opponentTime);

        }, 3600)

    }, [])

    useEffect(() => {

        animateTrainerIntro();
        animateOpponentIntro();

    }, [ animateTrainerIntro, animateOpponentIntro ])

    return (
    
        <div className="flex battle_screen_spacer">

            <div className="flex opponent_spacer">
                <img ref={opponentRef} src='./images/test/opponent/mew.gif' alt="mew opponent animation"></img>
            </div>

            <div className="flex row trainer_spacer">
                <div className="flex center trainer_img_spacer">
                    <img ref={trainerRef} src='./images/test/trainer/mew-shiny.gif' alt="mew trainer animation"></img>
                </div>
                <div ref={trainerStatsRef} className="flex trainer_stats_overlay">
                    <div className="flex col trainer_stats">
                        <div className="flex row trainer_pokemon_line">
                            <h3>Mew</h3>
                            <h4>Lv<span>5</span></h4>
                        </div>
                        <div className="flex row center trainer_hp_line">
                            <h3>HP</h3>
                            <span className="hp_bar"></span>
                        </div>
                        <div className="flex trainer_exp_bar"></div>
                    </div>
                </div>
            </div>

        </div>
        
    )
    
}

export default Screen;