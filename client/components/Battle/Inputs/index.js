import { useCallback, useEffect, useRef } from "react";
import { gsap } from 'gsap';

const Inputs = () => {

    const inputRef = useRef();

    const animateSelected = useCallback(() => {

        let q = gsap.utils.selector(inputRef);
        gsap.to(q('.top_left'), { left: "-8px", top: "-8px", duration: 0.5, yoyo: true, repeat: -1 })
        gsap.to(q('.top_right'), { right: "-8px", top: "-8px", duration: 0.5, yoyo: true, repeat: -1 })
        gsap.to(q('.bottom_left'), { left: "-8px", bottom: "-8px", duration: 0.5, yoyo: true, repeat: -1 })
        gsap.to(q('.bottom_right'), { right: "-8px", bottom: "-8px", duration: 0.5, yoyo: true, repeat: -1 })

    }, [])

    useEffect(() => {

        animateSelected();

    }, [ animateSelected ])

    return (

        <div className="flex col battle_input_spacer">

            <div ref={inputRef} className="flex center fight_input_spacer">
                <div className="flex center fight_button">

                <span className="input_accent top_left">
                    <div className="input_accent_top"></div>
                    <div className="input_accent_bottom"></div>
                </span>
                <span className="input_accent top_right">
                    <div className="input_accent_top"></div>
                    <div className="input_accent_bottom"></div>
                </span>
                <span className="input_accent bottom_left">
                    <div className="input_accent_top"></div>
                    <div className="input_accent_bottom"></div>
                </span>
                <span className="input_accent bottom_right">
                    <div className="input_accent_top"></div>
                    <div className="input_accent_bottom"></div>
                </span>
                    Fight
                </div>
            </div>

            <div className="flex center row options_input_spacer">
                <div className="flex center items_button">Items</div>
                <div className="flex center flee_button">Flee</div>
                <div className="flex center pokemon_button">Pokemon</div>
            </div>

        </div>
    
    )
    
}

export default Inputs;