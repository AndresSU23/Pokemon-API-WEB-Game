import styles from './Window.module.css';
import LoginForm from "./LoginForm";

const Window = () => {

    return (
        <article className={styles.window_spacer + " flex center col"}>
            <div className={styles.window_header + " flex"}></div>
            <LoginForm />
        </article>
    );

}

export default Window;