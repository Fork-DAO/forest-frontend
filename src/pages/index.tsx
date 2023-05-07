import { OpenInNew } from '@mui/icons-material';
import { Card, Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CollectionInfo from '../components/CollectionInfo';
import Layout from '../components/Layout';

const Index = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 400);
  }, []);

  return (
    <Layout isMobile={isMobile}>
      <Stack
        className="flex justify-self-auto items-center"
        spacing={{ xs: 1, sm: 1, md: 4 }}
      >
        <CollectionInfo />
      </Stack>
    </Layout >)
}

export default Index;