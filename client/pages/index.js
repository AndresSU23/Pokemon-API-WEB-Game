import GameCanvas from "@/components/GameCanvas";
import Battle from "@/components/Battle";
import Login from "@/components/Login";
import Nav from "@/components/Nav";

import { useAuth } from '@/context/authContext';
import { useBattle } from '@/context/battleContext';
import { useEffect } from "react";
import Footer from "@/components/Footer";


export default function Home() {

  const { user } = useAuth();
  const { screen } = useBattle();

  return (
    <section className="flex center">

      <Nav />
      { user && 

        <>

          {screen === "map" && <GameCanvas />}
          {screen === "battle" && <Battle />}
        
        </>
      }

      { !user && <Login /> }
      
      <Footer />

    </section>
  );
}
