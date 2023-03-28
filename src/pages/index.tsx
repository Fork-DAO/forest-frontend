import { Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import Layout from '../components/Layout';
import MintingInfo from '../components/MintingInfo';
import MintNft from '../components/MintNft';
import TestnetDisclaimer from '../components/TestnetDisclaimer';
import TreasuryInfo from '../components/TreasuryInfo';

const Index = () => {
  const { address } = useAccount();
  const [hasConnected, setHasConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [address]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 400);
  }, []);

  return (
    <Layout setHasConnected={setHasConnected} isMobile={isMobile}>
      {(hasConnected || address) && !loading ?
        <Stack
          className="flex justify-self-auto items-center"
          spacing={{ xs: 1, sm: 1, md: 4 }}
        >
          <MintNft />
          <TreasuryInfo />
          <TestnetDisclaimer />
          {/* <MintingInfo userAddress={address!} /> */}
        </Stack>
        :
        <Stack
          className="flex justify-center content-baseline items-center"
          spacing={{ xs: 1, sm: 1, md: 4 }}>
          <Typography color="#dfebd5" variant="h6" style={{ textAlign: "center" }}>
            {"Por favor, conectar billetera para empezar."}
          </Typography>
        </Stack>
      }

    </Layout>)
}

export default Index;