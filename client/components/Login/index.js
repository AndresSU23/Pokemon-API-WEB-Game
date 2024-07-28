import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";

const Login = () => {

    const { login } = useAuth();

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();
        try { await login(username, password) } 
        catch (error) { console.error('Login failed:', error); }

    };

    return (
        <section className="flex center">

            <form className="flex col" onSubmit={handleSubmit}>

                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Login</button>

            </form>

        </section>
    )

}

export default Login;