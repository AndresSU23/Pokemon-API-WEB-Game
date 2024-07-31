import Battle from "@/components/Battle";
import { useAuth } from '@/context/authContext';
import Login from "@/components/Login";
import { BattleProvider } from "@/context/battleContext";

const Test = () => {

    const { user } = useAuth();

    return (
        <BattleProvider>
            <section className="flex center">
                { user ? <Battle /> : <Login /> }
            </section>
        </BattleProvider>
    );

}

export default Test;