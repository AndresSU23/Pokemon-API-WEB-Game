import styles from "../Starter.module.css";

const GenSelection = ({ setGen }) => {

    return (
        <>
        
            <div className={styles.select_message + " flex center col"}>
                <p>Select your Generation!</p>
            </div>

            <div className={styles.select_gen + " flex row wrap"}>

                <button onClick={() => setGen(1)}>Gen 1</button>
                <button onClick={() => setGen(2)}>Gen 2</button>
                <button onClick={() => setGen(3)}>Gen 3</button>
                <button onClick={() => setGen(4)}>Gen 4</button>
                        
            </div>

        </>
    )

}

export default GenSelection;