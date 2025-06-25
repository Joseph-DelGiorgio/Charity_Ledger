import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Profile: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Profile
      </Typography>
      <Typography variant="body1" color="text.secondary">
        View your donation history and impact achievements.
      </Typography>
    </Container>
  );
};

export default Profile; 