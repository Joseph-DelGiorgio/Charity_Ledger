import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Avatar,
  Rating,
  InputAdornment,
  IconButton,
  Tooltip,
  Badge,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  LocationOn,
  People,
  AttachMoney,
  TrendingUp,
  Verified,
  Favorite,
  Share
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  targetAmount: number;
  raisedAmount: number;
  currency: string;
  image: string;
  organization: string;
  validatorRating: number;
  isVerified: boolean;
  milestones: number;
  completedMilestones: number;
  endDate: string;
  tags: string[];
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Clean Water for Rural Communities',
    description: 'Providing clean drinking water to 10,000 people in rural Kenya through sustainable water purification systems.',
    category: 'Health',
    location: 'Kenya',
    targetAmount: 50000,
    raisedAmount: 32000,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    organization: 'Water for Life Foundation',
    validatorRating: 4.8,
    isVerified: true,
    milestones: 5,
    completedMilestones: 2,
    endDate: '2024-12-31',
    tags: ['Water', 'Health', 'Sustainability']
  },
  {
    id: '2',
    title: 'Education for Refugee Children',
    description: 'Building schools and providing educational materials for refugee children in Jordan.',
    category: 'Education',
    location: 'Jordan',
    targetAmount: 75000,
    raisedAmount: 45000,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
    organization: 'Global Education Initiative',
    validatorRating: 4.6,
    isVerified: true,
    milestones: 4,
    completedMilestones: 1,
    endDate: '2024-11-30',
    tags: ['Education', 'Refugees', 'Children']
  },
  {
    id: '3',
    title: 'Solar Energy for Rural India',
    description: 'Installing solar panels in 50 villages to provide clean, renewable energy.',
    category: 'Environment',
    location: 'India',
    targetAmount: 100000,
    raisedAmount: 28000,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400',
    organization: 'Green Energy Solutions',
    validatorRating: 4.9,
    isVerified: true,
    milestones: 6,
    completedMilestones: 3,
    endDate: '2025-03-31',
    tags: ['Solar', 'Energy', 'Rural Development']
  }
];

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const categories = ['all', 'Health', 'Education', 'Environment', 'Poverty', 'Disaster Relief'];
  const locations = ['all', 'Kenya', 'Jordan', 'India', 'Uganda', 'Bangladesh'];

  useEffect(() => {
    let filtered = projects;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.organization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(project => project.category === categoryFilter);
    }

    // Location filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter(project => project.location === locationFilter);
    }

    // Sort
    switch (sortBy) {
      case 'recent':
        filtered = [...filtered].sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
        break;
      case 'popular':
        filtered = [...filtered].sort((a, b) => b.raisedAmount - a.raisedAmount);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.validatorRating - a.validatorRating);
        break;
      case 'deadline':
        filtered = [...filtered].sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
        break;
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, categoryFilter, locationFilter, sortBy]);

  const getProgressPercentage = (raised: number, target: number) => {
    return Math.min((raised / target) * 100, 100);
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Charity Projects
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Discover and support impactful projects with transparent fund tracking and milestone verification.
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                value={locationFilter}
                label="Location"
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                {locations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="recent">Most Recent</MenuItem>
                <MenuItem value="popular">Most Funded</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
                <MenuItem value="deadline">Deadline Soon</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate('/create-project')}
              startIcon={<TrendingUp />}
            >
              Create Project
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Projects Grid */}
      <Grid container spacing={3}>
        {filteredProjects.map((project) => (
          <Grid item xs={12} md={6} lg={4} key={project.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                }
              }}
              onClick={() => handleProjectClick(project.id)}
            >
              <Box
                sx={{
                  height: 200,
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    display: 'flex',
                    gap: 1,
                  }}
                >
                  {project.isVerified && (
                    <Tooltip title="Verified Project">
                      <Chip
                        icon={<Verified />}
                        label="Verified"
                        size="small"
                        color="success"
                        sx={{ backgroundColor: 'rgba(76, 175, 80, 0.9)' }}
                      />
                    </Tooltip>
                  )}
                </Box>
              </Box>

              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
                    {project.title}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                  {project.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {project.location}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={project.validatorRating} precision={0.1} size="small" readOnly />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    {project.validatorRating}
                  </Typography>
                </Box>

                {/* Progress Bar */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {formatCurrency(project.raisedAmount, project.currency)} raised
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {getProgressPercentage(project.raisedAmount, project.targetAmount).toFixed(1)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={getProgressPercentage(project.raisedAmount, project.targetAmount)}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Goal: {formatCurrency(project.targetAmount, project.currency)}
                  </Typography>
                </Box>

                {/* Milestones */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <People sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {project.completedMilestones}/{project.milestones} milestones completed
                  </Typography>
                </Box>

                {/* Tags */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                  {project.tags.slice(0, 3).map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Box>
              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProjectClick(project.id);
                  }}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredProjects.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No projects found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria or filters.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Projects; 