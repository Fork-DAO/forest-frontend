import '../styles/globals.css';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { polygon, polygonMumbai } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import type { AppProps } from 'next/app'

const { chains, provider, webSocketProvider } = configureChains(
  [polygon, polygonMumbai],
  [publicProvider()]
);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains })
  ],
  provider,
  webSocketProvider,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}
