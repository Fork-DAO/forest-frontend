import { Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import MintNft from '../components/MintNft';
import MintNftMobile from '../components/MintNftMobile';

const Index = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 400);
  }, []);

  return (
    <Layout isMobile={isMobile}>
      <Stack
          className="flex items-center"
          spacing={{ xs: 1, sm: 1, md: 4 }}
        >
          {isMobile ? <MintNftMobile /> : <MintNft />}
        </Stack>

    </Layout>)
}

export default Index;