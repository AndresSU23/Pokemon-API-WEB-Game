import { useAuth } from '@/context/authContext';
import styles from './LoginForm.module.css';

import { useEffect, useState } from "react";

const LoginForm = () => {

    const { get } = useAuth();

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {

        const fetchData = async () => {

            const { data, error } = await get('/users/verify');
            console.log(data, error);

        }

        fetchData();

    }, [])

    return (
        <>
        
            <form className={styles.form_spacer + " flex col center"} onSubmit={handleSubmit}>
                <label>Username :</label>
                <input type="text" className={styles.input_line} placeholder="Enter Username" onChange={(e) => setUsername(e.target.value) }/>
                <label>Password :</label>
                <input type="password" className={styles.input_line} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value) }/>
                <button type="submit" className={styles.form_button}>Login</button>
            </form>

        </>
    );

}

export default LoginForm;