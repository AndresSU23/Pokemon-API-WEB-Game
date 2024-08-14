import { useEffect, useRef, useState } from "react";
import styles from "./Banner.module.css";

const Banner = ({ children }) => {

    const bannerRef = useRef();
    const [ message, setMessage ] = useState();
    const [ slide, setSlide ] = useState(0);

    useEffect(() => {

        const intervalId = setInterval(() => {

            setSlide((prevSlide) => (prevSlide + 1) % 3);

        }, 7000);

        return () => clearInterval(intervalId);

    }, []);

    useEffect(() => {

        if (bannerRef.current) bannerRef.current.style.backgroundImage = `url("/layout/banner-${slide + 1}.jpg")`;
        (slide === 0) && setMessage("Travel the world of Pokemon!");
        (slide === 1) && setMessage("Battle and Catch new Pokemon!");
        (slide === 2) && setMessage("Build your team!");

    }, [ slide ])   

    return (
        <header ref={bannerRef} className={"flex center " + styles.banner_spacer}>

            { children }

            <div className={"flex " + styles.banner_message}>
                <p>{message}</p>
            </div>

            <div className={"flex " + styles.blinker_spacer}>
                <span className={(slide === 0) ? styles.selected : ""}></span>
                <span className={(slide === 1) ? styles.selected : ""}></span>
                <span className={(slide === 2) ? styles.selected : ""}></span>
            </div>

        </header>
    )

}

export default Banner;