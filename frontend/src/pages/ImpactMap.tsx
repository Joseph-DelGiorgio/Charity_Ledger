import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const ImpactMap: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Impact Map
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Explore projects and their impact across different regions.
      </Typography>
    </Container>
  );
};

export default ImpactMap; 