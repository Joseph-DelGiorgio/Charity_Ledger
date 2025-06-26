import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  LinearProgress,
  Paper,
  useTheme,
} from '@mui/material';
import {
  TrendingUp,
  People,
  LocationOn,
  AttachMoney,
  VerifiedUser,
  Timeline,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const featuredProjects = [
    {
      id: 1,
      title: 'Clean Water Initiative - Lagos',
      description: 'Providing clean drinking water to 10,000 families in Lagos, Nigeria through sustainable well construction.',
      category: 'Water & Sanitation',
      location: 'Lagos, Nigeria',
      fundingGoal: 50000,
      currentFunding: 35000,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
      milestones: 3,
      validators: 5,
    },
    {
      id: 2,
      title: 'Solar Energy for Rural Schools',
      description: 'Installing solar panels in 20 rural schools across Kenya to provide reliable electricity for education.',
      category: 'Education & Energy',
      location: 'Kenya',
      fundingGoal: 75000,
      currentFunding: 42000,
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop',
      milestones: 4,
      validators: 7,
    },
    {
      id: 3,
      title: 'Medical Clinic Construction',
      description: 'Building a modern medical clinic to serve 15,000 people in rural India with essential healthcare services.',
      category: 'Healthcare',
      location: 'Rural India',
      fundingGoal: 100000,
      currentFunding: 68000,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
      milestones: 5,
      validators: 6,
    },
  ];

  const impactStats = [
    { label: 'Projects Funded', value: '127', icon: <TrendingUp />, color: '#1976d2' },
    { label: 'People Impacted', value: '45K+', icon: <People />, color: '#2e7d32' },
    { label: 'Countries Served', value: '23', icon: <LocationOn />, color: '#ed6c02' },
    { label: 'Total Funding', value: '$2.3M', icon: <AttachMoney />, color: '#9c27b0' },
    { label: 'Active Validators', value: '156', icon: <VerifiedUser />, color: '#d32f2f' },
    { label: 'Milestones Completed', value: '892', icon: <Timeline />, color: '#7b1fa2' },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 700, mb: 3 }}
              >
                Transparent Charity
                <br />
                <span style={{ color: '#ffd700' }}>Powered by Blockchain</span>
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                See exactly where your donations go with real-time tracking, 
                milestone-based fund releases, and local validator verification.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/projects')}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'grey.100' },
                  }}
                >
                  Explore Projects
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/create-project')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': { borderColor: 'grey.300', bgcolor: 'rgba(255,255,255,0.1)' },
                  }}
                >
                  Create Project
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  p: 3,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Typography variant="h5" gutterBottom>
                  How It Works
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ bgcolor: 'white', borderRadius: '50%', p: 1, minWidth: 40, textAlign: 'center' }}>
                      <Typography color="primary.main" fontWeight="bold">1</Typography>
                    </Box>
                    <Typography>Projects are created with clear milestones</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ bgcolor: 'white', borderRadius: '50%', p: 1, minWidth: 40, textAlign: 'center' }}>
                      <Typography color="primary.main" fontWeight="bold">2</Typography>
                    </Box>
                    <Typography>Local validators verify progress on the ground</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ bgcolor: 'white', borderRadius: '50%', p: 1, minWidth: 40, textAlign: 'center' }}>
                      <Typography color="primary.main" fontWeight="bold">3</Typography>
                    </Box>
                    <Typography>Funds are released automatically as milestones are completed</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Impact Statistics */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Our Impact
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          Real results from transparent, blockchain-powered charitable giving
        </Typography>
        <Grid container spacing={3}>
          {impactStats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 3,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: stat.color,
                    color: 'white',
                    mb: 2,
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  {stat.value}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Projects Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Featured Projects
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          Explore some of our most impactful, milestone-driven projects
        </Typography>
        <Grid container spacing={4}>
          {featuredProjects.map((project) => (
            <Grid item xs={12} md={4} key={project.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={project.image}
                  alt={project.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {project.category} • {project.location}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AttachMoney sx={{ fontSize: 18, mr: 0.5 }} />
                    <Typography variant="body2">
                      {`$${project.currentFunding.toLocaleString()} / $${project.fundingGoal.toLocaleString()}`}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min((project.currentFunding / project.fundingGoal) * 100, 100)}
                    sx={{ height: 8, borderRadius: 4, mb: 1 }}
                  />
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                    <Chip label={`${project.milestones} Milestones`} size="small" color="primary" />
                    <Chip label={`${project.validators} Validators`} size="small" color="success" />
                  </Box>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/projects/${project.id}?donate=true`)}
                  >
                    Donate
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          What Our Users Say
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          Real stories from donors, validators, and project creators
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                "I love being able to see exactly how my donation is used. The milestone system and validator transparency are game changers!"
              </Typography>
              <Typography variant="subtitle1" fontWeight={700}>
                — Priya S., Donor
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                "As a validator, I feel empowered to make a real difference in my community and ensure funds are used responsibly."
              </Typography>
              <Typography variant="subtitle1" fontWeight={700}>
                — Samuel K., Validator
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                "Launching our project on this platform was seamless, and the support from validators and donors has been incredible."
              </Typography>
              <Typography variant="subtitle1" fontWeight={700}>
                — Maria G., Project Creator
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 