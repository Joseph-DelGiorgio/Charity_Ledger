import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const ProjectDetail: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Project Details
      </Typography>
      <Typography variant="body1" color="text.secondary">
        View detailed information about this charity project and track its progress.
      </Typography>
    </Container>
  );
};

export default ProjectDetail; 