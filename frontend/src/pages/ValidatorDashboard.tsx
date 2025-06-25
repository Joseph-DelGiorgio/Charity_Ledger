import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const ValidatorDashboard: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Validator Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Manage and verify project milestones as a local validator.
      </Typography>
    </Container>
  );
};

export default ValidatorDashboard; 