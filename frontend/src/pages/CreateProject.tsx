import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const CreateProject: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Create Project
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Start a new charity project with transparent milestone tracking.
      </Typography>
    </Container>
  );
};

export default CreateProject; 