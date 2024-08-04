import '../styles/reset.css';
import '../styles/styles.css';
import '../styles/test.css';

import { AuthProvider } from '@/context/authContext';
import { BattleProvider } from '@/context/battleContext';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <BattleProvider>
        <Component {...pageProps} />
      </BattleProvider>
    </AuthProvider>
  );
}
