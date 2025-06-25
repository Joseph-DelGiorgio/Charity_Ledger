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
  LinearProgress,
  Rating,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Tabs,
  Tab,
  Paper,
  IconButton,
  Tooltip,
  Badge,
  InputAdornment
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import {
  LocationOn,
  People,
  AttachMoney,
  Verified,
  Favorite,
  Share,
  CheckCircle,
  Schedule,
  Warning,
  TrendingUp,
  AccountBalance,
  Description,
  CalendarToday,
  Email,
  Language,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';

interface Milestone {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  dueDate: string;
  isCompleted: boolean;
  completionDate?: string;
  evidence?: string;
}

interface Donation {
  id: string;
  donor: string;
  amount: number;
  currency: string;
  date: string;
  message?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  location: string;
  targetAmount: number;
  raisedAmount: number;
  currency: string;
  image: string;
  organization: string;
  contactEmail: string;
  website?: string;
  validatorRating: number;
  isVerified: boolean;
  milestones: Milestone[];
  donations: Donation[];
  endDate: string;
  tags: string[];
  createdAt: string;
}

const mockProject: Project = {
  id: '1',
  title: 'Clean Water for Rural Communities',
  description: 'Providing clean drinking water to 10,000 people in rural Kenya through sustainable water purification systems.',
  longDescription: `This comprehensive project aims to address the critical water crisis affecting rural communities in Kenya. 
  Through the installation of sustainable water purification systems, we will provide clean, safe drinking water to over 10,000 people 
  across 15 villages. The project includes community training, maintenance programs, and long-term sustainability planning.
  
  Our approach combines modern technology with local community involvement to ensure lasting impact. Each water purification system 
  will be maintained by trained local technicians, creating employment opportunities while ensuring the project's long-term success.`,
  category: 'Health',
  location: 'Kenya',
  targetAmount: 50000,
  raisedAmount: 32000,
  currency: 'USD',
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  organization: 'Water for Life Foundation',
  contactEmail: 'contact@waterforlife.org',
  website: 'https://waterforlife.org',
  validatorRating: 4.8,
  isVerified: true,
  milestones: [
    {
      id: '1',
      title: 'Site Assessment and Community Engagement',
      description: 'Conduct comprehensive site assessments and engage with local communities to understand their needs.',
      targetAmount: 5000,
      dueDate: '2024-02-15',
      isCompleted: true,
      completionDate: '2024-02-10',
      evidence: 'Site assessment reports and community meeting minutes uploaded'
    },
    {
      id: '2',
      title: 'Equipment Procurement and Installation',
      description: 'Purchase and install water purification systems in the first 5 villages.',
      targetAmount: 15000,
      dueDate: '2024-04-30',
      isCompleted: true,
      completionDate: '2024-04-25',
      evidence: 'Installation photos and equipment receipts provided'
    },
    {
      id: '3',
      title: 'Community Training Program',
      description: 'Train local technicians and community members on system maintenance and water safety.',
      targetAmount: 8000,
      dueDate: '2024-06-15',
      isCompleted: false
    },
    {
      id: '4',
      title: 'Expansion to Additional Villages',
      description: 'Extend the water purification systems to the remaining 10 villages.',
      targetAmount: 15000,
      dueDate: '2024-08-30',
      isCompleted: false
    },
    {
      id: '5',
      title: 'Monitoring and Evaluation',
      description: 'Implement comprehensive monitoring systems and conduct impact evaluation.',
      targetAmount: 7000,
      dueDate: '2024-12-31',
      isCompleted: false
    }
  ],
  donations: [
    {
      id: '1',
      donor: 'Anonymous',
      amount: 5000,
      currency: 'USD',
      date: '2024-01-15',
      message: 'Great cause! Keep up the good work.'
    },
    {
      id: '2',
      donor: 'John Smith',
      amount: 2500,
      currency: 'USD',
      date: '2024-01-20'
    },
    {
      id: '3',
      donor: 'Sarah Johnson',
      amount: 1000,
      currency: 'USD',
      date: '2024-01-25',
      message: 'Happy to support this important project.'
    }
  ],
  endDate: '2024-12-31',
  tags: ['Water', 'Health', 'Sustainability', 'Community Development'],
  createdAt: '2024-01-01'
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
      id={`project-tabpanel-${index}`}
      aria-labelledby={`project-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [donationDialog, setDonationDialog] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [donationMessage, setDonationMessage] = useState('');
  const [showAmount, setShowAmount] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch the project data from your API
    setProject(mockProject);
  }, [id]);

  if (!project) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading project...</Typography>
      </Container>
    );
  }

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDonation = () => {
    if (donationAmount && Number(donationAmount) > 0) {
      // In a real app, you would process the donation through your backend
      console.log('Processing donation:', { amount: donationAmount, message: donationMessage });
      setDonationDialog(false);
      setDonationAmount('');
      setDonationMessage('');
    }
  };

  const completedMilestones = project.milestones.filter(m => m.isCompleted).length;
  const totalMilestones = project.milestones.length;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Project Header */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h3" component="h1" sx={{ flexGrow: 1 }}>
                {project.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {project.isVerified && (
                  <Tooltip title="Verified Project">
                    <Chip
                      icon={<Verified />}
                      label="Verified"
                      color="success"
                      size="small"
                    />
                  </Tooltip>
                )}
                <IconButton>
                  <Favorite />
                </IconButton>
                <IconButton>
                  <Share />
                </IconButton>
              </Box>
            </Box>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {project.description}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {project.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              ))}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {project.location}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Rating value={project.validatorRating} precision={0.1} size="small" readOnly />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  {project.validatorRating}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 24 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Funding Progress
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h4" color="primary">
                    {formatCurrency(project.raisedAmount, project.currency)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {getProgressPercentage(project.raisedAmount, project.targetAmount).toFixed(1)}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={getProgressPercentage(project.raisedAmount, project.targetAmount)}
                  sx={{ height: 8, borderRadius: 4, mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Goal: {formatCurrency(project.targetAmount, project.currency)}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Milestones Completed
                </Typography>
                <Typography variant="h6">
                  {completedMilestones} of {totalMilestones}
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<AttachMoney />}
                onClick={() => setDonationDialog(true)}
                sx={{ mb: 2 }}
              >
                Donate Now
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/projects')}
              >
                Back to Projects
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Project Image */}
      <Box
        sx={{
          height: 400,
          backgroundImage: `url(${project.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 2,
          mb: 4
        }}
      />

      {/* Tabs */}
      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="fullWidth"
        >
          <Tab label="Overview" />
          <Tab label="Milestones" />
          <Tab label="Donations" />
          <Tab label="Organization" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              About This Project
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, whiteSpace: 'pre-line' }}>
              {project.longDescription}
            </Typography>

            <Typography variant="h6" gutterBottom>
              Project Details
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <AccountBalance />
                </ListItemIcon>
                <ListItemText
                  primary="Organization"
                  secondary={project.organization}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CalendarToday />
                </ListItemIcon>
                <ListItemText
                  primary="Project End Date"
                  secondary={formatDate(project.endDate)}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <TrendingUp />
                </ListItemIcon>
                <ListItemText
                  primary="Category"
                  secondary={project.category}
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                <Timeline>
                  {project.milestones.slice(0, 3).map((milestone) => (
                    <TimelineItem key={milestone.id}>
                      <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
                        {formatDate(milestone.dueDate)}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot color={milestone.isCompleted ? 'success' : 'primary'} />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="body2">
                          {milestone.title}
                        </Typography>
                        {milestone.isCompleted && (
                          <Typography variant="caption" color="success.main">
                            Completed
                          </Typography>
                        )}
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography variant="h5" gutterBottom>
          Project Milestones
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Track the progress of this project through its key milestones. Funds are released as milestones are completed and verified.
        </Typography>

        <Grid container spacing={3}>
          {project.milestones.map((milestone, index) => (
            <Grid item xs={12} key={milestone.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Milestone {index + 1}: {milestone.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {milestone.description}
                      </Typography>
                    </Box>
                    <Chip
                      icon={milestone.isCompleted ? <CheckCircle /> : <Schedule />}
                      label={milestone.isCompleted ? 'Completed' : 'Pending'}
                      color={milestone.isCompleted ? 'success' : 'default'}
                      variant={milestone.isCompleted ? 'filled' : 'outlined'}
                    />
                  </Box>

                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        Target Amount: {formatCurrency(milestone.targetAmount, project.currency)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        Due Date: {formatDate(milestone.dueDate)}
                      </Typography>
                    </Grid>
                  </Grid>

                  {milestone.isCompleted && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        <strong>Completed on:</strong> {formatDate(milestone.completionDate!)}
                      </Typography>
                      {milestone.evidence && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          <strong>Evidence:</strong> {milestone.evidence}
                        </Typography>
                      )}
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Typography variant="h5" gutterBottom>
          Recent Donations
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          See how others are supporting this project.
        </Typography>

        <Grid container spacing={2}>
          {project.donations.map((donation) => (
            <Grid item xs={12} key={donation.id}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="h6">
                        {donation.donor}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(donation.date)}
                      </Typography>
                      {donation.message && (
                        <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                          "{donation.message}"
                        </Typography>
                      )}
                    </Box>
                    <Typography variant="h6" color="primary">
                      {formatCurrency(donation.amount, donation.currency)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Typography variant="h5" gutterBottom>
          About {project.organization}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {project.organization} is a dedicated organization committed to making a positive impact in communities around the world.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Contact Information
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Email />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary={project.contactEmail}
                    />
                  </ListItem>
                  {project.website && (
                    <ListItem>
                      <ListItemIcon>
                        <Language />
                      </ListItemIcon>
                      <ListItemText
                        primary="Website"
                        secondary={project.website}
                      />
                    </ListItem>
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Organization Stats
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Validator Rating"
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating value={project.validatorRating} precision={0.1} size="small" readOnly />
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {project.validatorRating}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Projects Completed"
                      secondary="15+"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Total Impact"
                      secondary="50,000+ people helped"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Donation Dialog */}
      <Dialog open={donationDialog} onClose={() => setDonationDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Make a Donation</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Your donation will help fund this important project. All donations are tracked transparently on the blockchain.
          </Typography>
          
          <TextField
            fullWidth
            label="Donation Amount"
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Message (Optional)"
            multiline
            rows={3}
            value={donationMessage}
            onChange={(e) => setDonationMessage(e.target.value)}
            placeholder="Share why you're supporting this project..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDonationDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleDonation}>
            Donate {donationAmount ? formatCurrency(Number(donationAmount), project.currency) : ''}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProjectDetail; 