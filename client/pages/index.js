import GameCanvas from "@/components/GameCanvas";
import Login from "@/components/Login";
import { useAuth } from '@/context/authContext';

export default function Home() {

  const { user } = useAuth();

  return (
      <section className="flex center">
        { user ? <GameCanvas /> : <Login /> }
      </section>
  );
}
