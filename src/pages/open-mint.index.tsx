import { Card, Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import Layout from '../components/open-mint.Layout';
import MintNft from '../components/MintNft';
import MintNftMobile from '../components/MintNftMobile';
import SoldOutDisclaimer from '../components/SoldOutDisclaimer';
import TestnetDisclaimer from '../components/TestnetDisclaimer';
import TreasuryInfo from '../components/TreasuryInfo';
import { IS_MAINNET } from '../constants';

// This index is used when the mint is Open.
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
          <SoldOutDisclaimer />
          {!isMobile && !IS_MAINNET ? <TestnetDisclaimer /> : <></>}
          {isMobile ? <MintNftMobile /> : <MintNft />}
          <TreasuryInfo />
          {isMobile && !IS_MAINNET ? <TestnetDisclaimer /> : <></>}
        </Stack>
        :
        <Stack
          className="flex justify-center content-baseline items-center"
          spacing={{ xs: 1, sm: 1, md: 4 }}>
          <Card className="p-1" style={{ background: "rgb(67 103 110 / 69%)" }}>
            <Typography color="#cdd8c4" variant="h6" style={{ textAlign: "center" }}>
              {"Por favor, conectar billetera para empezar."}
            </Typography>
          </Card>
        </Stack>
      }

    </Layout>)
}

export default Index;