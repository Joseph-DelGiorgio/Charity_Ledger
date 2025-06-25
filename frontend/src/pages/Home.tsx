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
import { motion } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

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
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
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
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
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
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Impact Statistics */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            Our Impact
          </Typography>
          <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
            Real results from transparent, blockchain-powered charitable giving
          </Typography>
          
          <Grid container spacing={3}>
            {impactStats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div variants={itemVariants}>
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
                        bgcolor: `${stat.color}15`,
                        color: stat.color,
                        mb: 2,
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography variant="h4" component="div" fontWeight="bold" gutterBottom>
                      {stat.value}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Featured Projects */}
      <Box sx={{ bgcolor: 'grey.50', py: 6 }}>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
              Featured Projects
            </Typography>
            <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
              Support these impactful initiatives and track their progress in real-time
            </Typography>
            
            <Grid container spacing={4}>
              {featuredProjects.map((project) => (
                <Grid item xs={12} md={4} key={project.id}>
                  <motion.div variants={itemVariants}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s',
                        cursor: 'pointer',
                        '&:hover': { transform: 'translateY(-8px)' },
                      }}
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={project.image}
                        alt={project.title}
                      />
                      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Chip
                          label={project.category}
                          size="small"
                          sx={{ alignSelf: 'flex-start', mb: 2 }}
                        />
                        <Typography variant="h6" component="h3" gutterBottom>
                          {project.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                          {project.description}
                        </Typography>
                        
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              ${project.currentFunding.toLocaleString()} raised
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              ${project.fundingGoal.toLocaleString()} goal
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={(project.currentFunding / project.fundingGoal) * 100}
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
                            {project.location}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Chip
                              label={`${project.milestones} milestones`}
                              size="small"
                              variant="outlined"
                            />
                            <Chip
                              label={`${project.validators} validators`}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
            
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/projects')}
              >
                View All Projects
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 