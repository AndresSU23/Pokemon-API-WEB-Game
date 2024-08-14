import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import styles from "./Login.module.css";

const Login = () => {

    const { login, setLoginMenu } = useAuth();

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();
        try { await login(username, password) } 
        catch (error) { console.error('Login failed:', error); }

    };

    return (
            <form className={"flex col " + styles.form_spacer} onSubmit={handleSubmit}>

            <div className={styles.login_header + " flex center"}>
                <h2>Login Menu</h2>    
            </div>

                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

                <div className={"flex row"}>

                    <button type="submit">Login</button>
                    <button onClick={() =>  setLoginMenu("register")}>Register</button>

                </div>

            </form>
    )

}

export default Login;