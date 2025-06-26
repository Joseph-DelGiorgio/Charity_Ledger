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
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Badge,
  IconButton,
  Tooltip,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Slider,
  FormControlLabel,
  Checkbox,
  Alert,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  LocationOn,
  AttachMoney,
  People,
  TrendingUp,
  FilterList,
  Search,
  ZoomIn,
  ZoomOut,
  MyLocation,
  Layers,
  Info,
  Star,
  Favorite,
  Share,
  Download,
  Visibility,
  Category,
  CalendarToday,
  Verified
} from '@mui/icons-material';

interface ProjectImpact {
  id: string;
  title: string;
  organization: string;
  category: string;
  location: {
    country: string;
    region: string;
    city: string;
    coordinates: [number, number];
  };
  impact: {
    peopleReached: number;
    amountRaised: number;
    amountDisbursed: number;
    milestonesCompleted: number;
    totalMilestones: number;
  };
  status: 'active' | 'completed' | 'fundraising';
  startDate: string;
  endDate?: string;
  description: string;
  image: string;
  isVerified: boolean;
  rating: number;
}

interface ImpactStats {
  totalProjects: number;
  totalPeopleReached: number;
  totalAmountRaised: number;
  totalAmountDisbursed: number;
  countriesReached: number;
  averageRating: number;
}

const mockProjects: ProjectImpact[] = [
  {
    id: '1',
    title: 'Clean Water for Rural Communities',
    organization: 'Water for Life Foundation',
    category: 'Health',
    location: {
      country: 'Kenya',
      region: 'Eastern Province',
      city: 'Machakos',
      coordinates: [-1.2921, 37.8199]
    },
    impact: {
      peopleReached: 15000,
      amountRaised: 75000,
      amountDisbursed: 45000,
      milestonesCompleted: 3,
      totalMilestones: 5
    },
    status: 'active',
    startDate: '2023-06-01',
    description: 'Providing clean water access to rural communities through sustainable water purification systems.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
    isVerified: true,
    rating: 4.8
  },
  {
    id: '2',
    title: 'Education for Refugee Children',
    organization: 'Global Education Initiative',
    category: 'Education',
    location: {
      country: 'Jordan',
      region: 'Amman Governorate',
      city: 'Amman',
      coordinates: [31.9539, 35.9106]
    },
    impact: {
      peopleReached: 2500,
      amountRaised: 120000,
      amountDisbursed: 80000,
      milestonesCompleted: 2,
      totalMilestones: 4
    },
    status: 'active',
    startDate: '2023-08-15',
    description: 'Building schools and providing education for refugee children in urban areas.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300',
    isVerified: true,
    rating: 4.9
  },
  {
    id: '3',
    title: 'Solar Energy for Rural India',
    organization: 'Green Energy Solutions',
    category: 'Environment',
    location: {
      country: 'India',
      region: 'Rajasthan',
      city: 'Jaipur',
      coordinates: [26.9124, 75.7873]
    },
    impact: {
      peopleReached: 8000,
      amountRaised: 95000,
      amountDisbursed: 60000,
      milestonesCompleted: 4,
      totalMilestones: 6
    },
    status: 'active',
    startDate: '2023-05-20',
    description: 'Installing solar panels and training local communities in renewable energy management.',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300',
    isVerified: true,
    rating: 4.7
  },
  {
    id: '4',
    title: 'Emergency Relief for Earthquake Victims',
    organization: 'Disaster Relief International',
    category: 'Emergency',
    location: {
      country: 'Turkey',
      region: 'Hatay Province',
      city: 'Antakya',
      coordinates: [36.2023, 36.1613]
    },
    impact: {
      peopleReached: 50000,
      amountRaised: 200000,
      amountDisbursed: 180000,
      milestonesCompleted: 5,
      totalMilestones: 5
    },
    status: 'completed',
    startDate: '2023-02-06',
    endDate: '2023-12-31',
    description: 'Emergency response and recovery support for earthquake-affected communities.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300',
    isVerified: true,
    rating: 4.9
  },
  {
    id: '5',
    title: 'Community Health Centers',
    organization: 'Health for All',
    category: 'Health',
    location: {
      country: 'Uganda',
      region: 'Central Region',
      city: 'Kampala',
      coordinates: [0.3476, 32.5825]
    },
    impact: {
      peopleReached: 12000,
      amountRaised: 85000,
      amountDisbursed: 40000,
      milestonesCompleted: 2,
      totalMilestones: 4
    },
    status: 'active',
    startDate: '2023-09-01',
    description: 'Establishing community health centers to provide basic healthcare services.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300',
    isVerified: true,
    rating: 4.6
  }
];

const mockStats: ImpactStats = {
  totalProjects: 156,
  totalPeopleReached: 1250000,
  totalAmountRaised: 8500000,
  totalAmountDisbursed: 6200000,
  countriesReached: 23,
  averageRating: 4.7
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`impact-tabpanel-${index}`}
      aria-labelledby={`impact-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const ImpactMap: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [projects, setProjects] = useState<ProjectImpact[]>(mockProjects);
  const [stats, setStats] = useState<ImpactStats>(mockStats);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectImpact | null>(null);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [impactRange, setImpactRange] = useState<[number, number]>([0, 100000]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'completed': return 'primary';
      case 'fundraising': return 'warning';
      default: return 'default';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.location.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVerified = !showVerifiedOnly || project.isVerified;
    const matchesImpact = project.impact.peopleReached >= impactRange[0] && 
                         project.impact.peopleReached <= impactRange[1];

    return matchesCategory && matchesStatus && matchesSearch && matchesVerified && matchesImpact;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Impact Map
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore the global impact of charitable projects and track fund distribution across the world.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Projects</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {stats.totalProjects}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active projects worldwide
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <People sx={{ mr: 1, color: 'success.main' }} />
                <Typography variant="h6">People Reached</Typography>
              </Box>
              <Typography variant="h4" color="success.main">
                {formatNumber(stats.totalPeopleReached)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lives impacted globally
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoney sx={{ mr: 1, color: 'warning.main' }} />
                <Typography variant="h6">Funds Raised</Typography>
              </Box>
              <Typography variant="h4" color="warning.main">
                {formatCurrency(stats.totalAmountRaised)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total funds collected
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp sx={{ mr: 1, color: 'secondary.main' }} />
                <Typography variant="h6">Countries</Typography>
              </Box>
              <Typography variant="h4" color="secondary.main">
                {stats.countriesReached}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Nations with projects
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Map View" />
            <Tab label="Project List" />
            <Tab label="Analytics" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Interactive Impact Map
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Click on markers to view project details and impact metrics.
            </Typography>
          </Box>

          {/* Map Placeholder */}
          <Box
            sx={{
              height: 500,
              bgcolor: 'grey.100',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <LocationOn sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Interactive Map Coming Soon
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                We're integrating with mapping services to show real-time project locations.
              </Typography>
              <Button variant="outlined" startIcon={<Layers />}>
                Enable Map View
              </Button>
            </Box>

            {/* Mock Map Markers */}
            {filteredProjects.map((project, index) => (
              <Box
                key={project.id}
                sx={{
                  position: 'absolute',
                  left: `${20 + (index * 15)}%`,
                  top: `${30 + (index * 10)}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <Tooltip title={`${project.title} - ${project.location.city}, ${project.location.country}`}>
                  <IconButton
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' },
                      width: 40,
                      height: 40
                    }}
                    onClick={() => setSelectedProject(project)}
                  >
                    <LocationOn />
                  </IconButton>
                </Tooltip>
              </Box>
            ))}
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={filterCategory}
                    label="Category"
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <MenuItem value="all">All Categories</MenuItem>
                    <MenuItem value="Health">Health</MenuItem>
                    <MenuItem value="Education">Education</MenuItem>
                    <MenuItem value="Environment">Environment</MenuItem>
                    <MenuItem value="Emergency">Emergency</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filterStatus}
                    label="Status"
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="fundraising">Fundraising</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showVerifiedOnly}
                      onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                    />
                  }
                  label="Verified Only"
                />
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={3}>
            {filteredProjects.map((project) => (
              <Grid item xs={12} md={6} key={project.id}>
                <Card>
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      component="img"
                      src={project.image}
                      alt={project.title}
                      sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover'
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        display: 'flex',
                        gap: 1
                      }}
                    >
                      {project.isVerified && (
                        <Tooltip title="Verified Project">
                          <Verified sx={{ color: 'success.main', bgcolor: 'white', borderRadius: 1 }} />
                        </Tooltip>
                      )}
                      <Chip
                        label={project.status}
                        color={getStatusColor(project.status)}
                        size="small"
                      />
                    </Box>
                  </Box>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {project.organization} • {project.location.city}, {project.location.country}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {project.description}
                    </Typography>

                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          People Reached
                        </Typography>
                        <Typography variant="h6" color="primary">
                          {formatNumber(project.impact.peopleReached)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Funds Raised
                        </Typography>
                        <Typography variant="h6" color="primary">
                          {formatCurrency(project.impact.amountRaised)}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Star sx={{ color: 'warning.main', mr: 1 }} />
                      <Typography variant="body2">
                        {project.rating} • {project.impact.milestonesCompleted}/{project.impact.totalMilestones} milestones
                      </Typography>
                    </Box>

                    <LinearProgress
                      variant="determinate"
                      value={(project.impact.milestonesCompleted / project.impact.totalMilestones) * 100}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </CardContent>
                  <CardActions>
                    <Button size="small" startIcon={<Visibility />}>
                      View Details
                    </Button>
                    <Button size="small" startIcon={<Favorite />}>
                      Follow
                    </Button>
                    <Button size="small" startIcon={<Share />}>
                      Share
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h5" gutterBottom>
            Impact Analytics
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Detailed analysis of project impact and fund distribution patterns.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Impact by Category
                  </Typography>
                  <List>
                    {['Health', 'Education', 'Environment', 'Emergency'].map((category) => {
                      const categoryProjects = projects.filter(p => p.category === category);
                      const totalPeople = categoryProjects.reduce((sum, p) => sum + p.impact.peopleReached, 0);
                      const totalFunds = categoryProjects.reduce((sum, p) => sum + p.impact.amountRaised, 0);
                      
                      return (
                        <ListItem key={category}>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              {category.charAt(0)}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={category}
                            secondary={`${formatNumber(totalPeople)} people • ${formatCurrency(totalFunds)} raised`}
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Geographic Distribution
                  </Typography>
                  <List>
                    {Array.from(new Set(projects.map(p => p.location.country))).slice(0, 5).map((country) => {
                      const countryProjects = projects.filter(p => p.location.country === country);
                      const totalPeople = countryProjects.reduce((sum, p) => sum + p.impact.peopleReached, 0);
                      
                      return (
                        <ListItem key={country}>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'secondary.main' }}>
                              <LocationOn />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={country}
                            secondary={`${formatNumber(totalPeople)} people reached`}
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Project Detail Dialog */}
      {selectedProject && (
        <Dialog open={!!selectedProject} onClose={() => setSelectedProject(null)} maxWidth="md" fullWidth>
          <DialogTitle>
            {selectedProject.title}
            <Typography variant="body2" color="text.secondary">
              {selectedProject.organization} • {selectedProject.location.city}, {selectedProject.location.country}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Project Details</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {selectedProject.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Category:</strong> {selectedProject.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Status:</strong> {selectedProject.status}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Start Date:</strong> {new Date(selectedProject.startDate).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Impact Metrics</Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    People Reached
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {formatNumber(selectedProject.impact.peopleReached)}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Funds Raised
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {formatCurrency(selectedProject.impact.amountRaised)}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Funds Disbursed
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {formatCurrency(selectedProject.impact.amountDisbursed)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Progress
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(selectedProject.impact.milestonesCompleted / selectedProject.impact.totalMilestones) * 100}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {selectedProject.impact.milestonesCompleted} of {selectedProject.impact.totalMilestones} milestones completed
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedProject(null)}>Close</Button>
            <Button variant="contained" startIcon={<Visibility />}>
              View Full Project
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default ImpactMap; 