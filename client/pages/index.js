import GameCanvas from "@/components/GameCanvas";
import Battle from "@/components/Battle";
import Login from "@/components/Login";
import Nav from "@/components/Nav";

import { useAuth } from '@/context/authContext';
import { useBattle } from '@/context/battleContext';
import Footer from "@/components/Footer";
import Register from "@/components/Register";
import Starter from "@/components/Starter";
import Banner from "@/components/Banner";


export default function Home() {

  const { user, loginMenu } = useAuth();
  const { screen } = useBattle();

  return (
    <section className="flex center col">

      <Nav />
      { (user && loginMenu !== "starter") &&

        <>

          {screen === "map" && <GameCanvas />}
          {screen === "battle" && <Battle />}
        
        </>
      }

      { (!user && loginMenu === "login") && <Banner><Login /></Banner> }
      { (!user && loginMenu === "register") && <Banner><Register /></Banner> }
      { (user && loginMenu === "starter") && <Starter /> }
      
      <Footer />

    </section>
  );
}
