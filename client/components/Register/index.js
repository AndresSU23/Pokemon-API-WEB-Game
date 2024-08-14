import { useAuth } from "@/context/authContext";
import styles from "./Register.module.css";
import { useState } from "react";

const Register = () => {

    const { user, register, setLoginMenu } = useAuth();

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ confirm, setConfirm ] = useState("")

    const registerSubmit = async (e) => {

        e.preventDefault();

        if ((password === confirm) && (password.length > 0)) {

            try { await register(username, password); }
            catch (error) { console.error('Register failed:', error); }

        }

        else if (!password === confirm || password.length <= 0) console.log("Invalid credentials...");

    }

    const handleUsernameChange = (value) => setUsername(value);
    const handlePasswordChange = (value) => setPassword(value);
    const handleConfirmChange = (value) => setConfirm(value);

    return (
        <form className={"flex col " + styles.form_spacer}>

            <div className={styles.login_header + " flex center"}>
                <h2>Register Menu</h2>  
            </div>

            <input type="text" placeholder="Enter username..." onChange={(e) => handleUsernameChange(e.target.value)} />
            <input type="password" placeholder="Enter password..." onChange={(e) => handlePasswordChange(e.target.value)} />
            <input type="password" placeholder="Confirm password..." onChange={(e) => handleConfirmChange(e.target.value)} />

            <div className={"flex row"}>
                <button type="submit" onClick={(e) => registerSubmit(e)}>Register</button>
                <button onClick={() =>  setLoginMenu("login")}>Login</button>
            </div>

        </form>
    )
    
}

export default Register;