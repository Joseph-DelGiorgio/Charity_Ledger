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
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp,
  People,
  LocationOn,
  AttachMoney,
  VerifiedUser,
  Timeline,
  ArrowForward,
  Star,
  Favorite,
  Share,
  PlayArrow,
  CheckCircle,
  Security,
  Visibility,
  Speed,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

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
      rating: 4.8,
      daysLeft: 15,
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
      rating: 4.9,
      daysLeft: 8,
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
      rating: 4.7,
      daysLeft: 22,
    },
  ];

  const impactStats = [
    { label: 'Projects Funded', value: '127', icon: <TrendingUp />, color: '#2563eb', change: '+12%' },
    { label: 'People Impacted', value: '45K+', icon: <People />, color: '#10b981', change: '+8%' },
    { label: 'Countries Served', value: '23', icon: <LocationOn />, color: '#f59e0b', change: '+3' },
    { label: 'Total Funding', value: '$2.3M', icon: <AttachMoney />, color: '#8b5cf6', change: '+15%' },
    { label: 'Active Validators', value: '156', icon: <VerifiedUser />, color: '#ef4444', change: '+5%' },
    { label: 'Milestones Completed', value: '892', icon: <Timeline />, color: '#06b6d4', change: '+23%' },
  ];

  const features = [
    {
      icon: <Security />,
      title: 'Secure & Transparent',
      description: 'All transactions and fund releases are recorded on the blockchain for complete transparency.',
    },
    {
      icon: <VerifiedUser />,
      title: 'Local Validators',
      description: 'Community-based validators ensure projects are completed as promised on the ground.',
    },
    {
      icon: <Timeline />,
      title: 'Milestone-Based',
      description: 'Funds are released only when project milestones are verified and completed.',
    },
    {
      icon: <Speed />,
      title: 'Real-Time Tracking',
      description: 'Track project progress and fund usage in real-time with detailed analytics.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 6, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3,
          },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                component="h1"
                gutterBottom
                sx={{ 
                  fontWeight: 700, 
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.1,
                }}
              >
                Transparent Charity
                <br />
                <span style={{ color: '#ffd700', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                  Powered by Blockchain
                </span>
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4, 
                  opacity: 0.9,
                  lineHeight: 1.4,
                  fontWeight: 400,
                }}
              >
                See exactly where your donations go with real-time tracking, 
                milestone-based fund releases, and local validator verification.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/projects')}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': { 
                      bgcolor: 'grey.100',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Explore Projects
                  <ArrowForward sx={{ ml: 1 }} />
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/create-project')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': { 
                      borderColor: 'grey.300', 
                      bgcolor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Create Project
                </Button>
              </Box>
              
              {/* Trust indicators */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle sx={{ color: '#10b981' }} />
                  <Typography variant="body2">Verified Projects</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Security sx={{ color: '#10b981' }} />
                  <Typography variant="body2">Secure Transactions</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Visibility sx={{ color: '#10b981' }} />
                  <Typography variant="body2">100% Transparent</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  p: 4,
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  How It Works
                </Typography>
                <List sx={{ p: 0 }}>
                  {[
                    'Projects are created with clear milestones',
                    'Local validators verify progress on the ground',
                    'Funds are released automatically as milestones are completed'
                  ].map((step, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: 'primary.main',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                          }}
                        >
                          {index + 1}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText 
                        primary={step}
                        primaryTypographyProps={{
                          sx: { fontWeight: 500, fontSize: '1rem' }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
                
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Button
                    variant="outlined"
                    startIcon={<PlayArrow />}
                    sx={{
                      borderColor: 'rgba(255,255,255,0.5)',
                      color: 'white',
                      '&:hover': { borderColor: 'white' },
                    }}
                  >
                    Watch Demo
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Impact Statistics */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Our Impact
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Real results from transparent, blockchain-powered charitable giving
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          {impactStats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  borderRadius: 3,
                  border: '1px solid rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: `${stat.color}15`,
                    color: stat.color,
                    mb: 3,
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography variant="h3" fontWeight={700} gutterBottom sx={{ color: stat.color }}>
                  {stat.value}
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {stat.label}
                </Typography>
                <Chip
                  label={stat.change}
                  size="small"
                  color="success"
                  sx={{ fontWeight: 600 }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Why Choose Charity Ledger?
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Built on blockchain technology for maximum transparency and trust
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    border: '1px solid rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'white',
                      mb: 3,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Projects Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Featured Projects
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Explore some of our most impactful, milestone-driven projects
            </Typography>
          </Box>
          <Button
            variant="outlined"
            endIcon={<ArrowForward />}
            onClick={() => navigate('/projects')}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            View All Projects
          </Button>
        </Box>
        
        <Grid container spacing={4}>
          {featuredProjects.map((project) => (
            <Grid item xs={12} md={4} key={project.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={project.image}
                    alt={project.title}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      display: 'flex',
                      gap: 1,
                    }}
                  >
                    <Chip
                      label={project.category}
                      size="small"
                      sx={{ bgcolor: 'rgba(255,255,255,0.9)', fontWeight: 600 }}
                    />
                    <Chip
                      label={`${project.daysLeft} days left`}
                      size="small"
                      color="warning"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      display: 'flex',
                      gap: 1,
                    }}
                  >
                    <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.9)' }}>
                      <Favorite />
                    </IconButton>
                    <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.9)' }}>
                      <Share />
                    </IconButton>
                  </Box>
                </Box>
                
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Star sx={{ color: 'warning.main', fontSize: 20 }} />
                    <Typography variant="body2" fontWeight={600}>
                      {project.rating}
                    </Typography>
                  </Box>
                  
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, lineHeight: 1.3 }}>
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
                      value={Math.min((project.currentFunding / project.fundingGoal) * 100, 100)}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
                    <Chip label={`${project.milestones} Milestones`} size="small" color="primary" />
                    <Chip label={`${project.validators} Validators`} size="small" color="success" />
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => navigate(`/projects/${project.id}?donate=true`)}
                    >
                      Donate
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onClick={() => navigate('/projects')}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            View All Projects
          </Button>
        </Box>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h2" textAlign="center" gutterBottom sx={{ fontWeight: 700 }}>
            What Our Users Say
          </Typography>
          <Typography variant="h5" textAlign="center" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
            Real stories from donors, validators, and project creators
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                quote: "I love being able to see exactly how my donation is used. The milestone system and validator transparency are game changers!",
                author: "Priya S.",
                role: "Donor",
                avatar: "PS",
                rating: 5,
              },
              {
                quote: "As a validator, I feel empowered to make a real difference in my community and ensure funds are used responsibly.",
                author: "Samuel K.",
                role: "Validator",
                avatar: "SK",
                rating: 5,
              },
              {
                quote: "Launching our project on this platform was seamless, and the support from validators and donors has been incredible.",
                author: "Maria G.",
                role: "Project Creator",
                avatar: "MG",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    borderRadius: 3, 
                    textAlign: 'center',
                    border: '1px solid rgba(0,0,0,0.08)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} sx={{ color: 'warning.main', fontSize: 20 }} />
                    ))}
                  </Box>
                  
                  <Typography variant="body1" sx={{ mb: 3, flexGrow: 1, fontStyle: 'italic' }}>
                    "{testimonial.quote}"
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        width: 48,
                        height: 48,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                      }}
                    >
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {testimonial.author}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 