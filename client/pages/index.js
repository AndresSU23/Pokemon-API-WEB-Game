import GameCanvas from "@/components/GameCanvas";
import Battle from "@/components/Battle";
import Login from "@/components/Login";
import { useAuth } from '@/context/authContext';
import { useBattle } from '@/context/battleContext';


export default function Home() {

  const { user } = useAuth();
  const { menu } = useBattle();


  if (!user) {
    return <Login />;
  }

  return (
    <section className="flex center">
      {menu === "map" && <GameCanvas />}
      {menu === "fight" && <Battle />}
    </section>
  );
}
