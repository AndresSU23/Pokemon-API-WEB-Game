import { MenuProvider } from '@/context/menuContext';
import '../styles/reset.css';
import '../styles/styles.css';
import '../styles/test.css';
import '../styles/pokeball.css';

import { AuthProvider } from '@/context/authContext';
import { BattleProvider } from '@/context/battleContext';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <BattleProvider>
        <MenuProvider>
          <Component {...pageProps} />
        </MenuProvider>
      </BattleProvider>
    </AuthProvider>
  );
}
