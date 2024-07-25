import '../styles/reset.css';
import '../styles/styles.css';

import { AuthProvider } from '@/context/authContext';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
