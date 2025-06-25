import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Projects: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Projects
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Browse and support impactful charity projects with transparent fund tracking.
      </Typography>
    </Container>
  );
};

export default Projects; 