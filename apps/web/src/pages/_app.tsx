import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { IDEProvider } from '../store/IDEContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IDEProvider>
      <Component {...pageProps} />
    </IDEProvider>
  );
}

export default MyApp;
