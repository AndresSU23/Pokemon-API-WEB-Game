import { useAuth } from "@/context/authContext";
import styles from "./Nav.module.css";
import { useState } from "react";

const Nav = () => {

    const { user, logout } = useAuth();
    const [ display, setDisplay ] = useState(null);

    return (
        <div className={styles.nav_spacer + " flex between"}>

            <div className={styles.logo_spacer + " flex center"}>PokeSimulator</div>

            <div className={styles.nav_links + " flex"}>
                <li className={"flex center"}>Home</li>
                <li className={"flex center"}>About</li>
                <li className={"flex center"}>Controls</li>
                <li className={"flex center"}>{ user ? user : "Login"}</li>
            </div>

            <div className={styles.display_spacer + " flex center"}>
                <button onClick={logout}>Logout</button>
            </div>

        </div>
    )

}

export default Nav;