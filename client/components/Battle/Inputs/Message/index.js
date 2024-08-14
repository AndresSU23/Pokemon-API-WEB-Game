import { useBattle } from "@/context/battleContext";
import { forwardRef, useRef, useEffect } from "react";
import { Icon } from '@iconify-icon/react';
import { gsap } from "gsap";

const Message = forwardRef((props, ref) => {

    const iconRef = useRef();

    const animateIcon = () => { (iconRef.current) && gsap.to(iconRef.current, { duration: 1, opacity: 0, repeat: -1, yoyo: true}) }

    useEffect(() => { animateIcon(); }, [])

    return (
    
        <div tabIndex={0} ref={ref} onKeyDown={props.onKeyDown} className={"flex center input_message"}>
            {props.message}
            <span ref={iconRef} className={"flex center arrow_blink"}><Icon icon="icon-park-solid:down-one" /></span>
        </div>
    
    )

})

export default Message;