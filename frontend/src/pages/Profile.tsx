import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Chip,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Badge,
  IconButton,
  Tooltip,
  LinearProgress,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  LocationOn,
  CalendarToday,
  AttachMoney,
  Favorite,
  TrendingUp,
  Settings,
  Edit,
  Save,
  Cancel,
  Verified,
  Star,
  Timeline,
  AccountBalance,
  Notifications,
  Security,
  Language,
  Palette
} from '@mui/icons-material';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  avatar: string;
  isVerified: boolean;
  totalDonated: number;
  projectsSupported: number;
  favoriteCategories: string[];
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    anonymousDonations: boolean;
    language: string;
    theme: string;
  };
}

interface DonationHistory {
  id: string;
  projectTitle: string;
  organization: string;
  amount: number;
  currency: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  message?: string;
  isAnonymous: boolean;
}

interface ProjectContribution {
  id: string;
  projectTitle: string;
  organization: string;
  role: 'donor' | 'validator' | 'creator';
  contribution: string;
  date: string;
  impact: string;
}

const mockUserProfile: UserProfile = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  joinDate: '2023-01-15',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
  isVerified: true,
  totalDonated: 12500,
  projectsSupported: 8,
  favoriteCategories: ['Health', 'Education', 'Environment'],
  preferences: {
    emailNotifications: true,
    smsNotifications: false,
    anonymousDonations: false,
    language: 'English',
    theme: 'light'
  }
};

const mockDonationHistory: DonationHistory[] = [
  {
    id: '1',
    projectTitle: 'Clean Water for Rural Communities',
    organization: 'Water for Life Foundation',
    amount: 5000,
    currency: 'USD',
    date: '2024-01-15',
    status: 'completed',
    message: 'Great cause! Keep up the good work.',
    isAnonymous: false
  },
  {
    id: '2',
    projectTitle: 'Education for Refugee Children',
    organization: 'Global Education Initiative',
    amount: 2500,
    currency: 'USD',
    date: '2024-01-20',
    status: 'completed',
    isAnonymous: false
  },
  {
    id: '3',
    projectTitle: 'Solar Energy for Rural India',
    organization: 'Green Energy Solutions',
    amount: 1000,
    currency: 'USD',
    date: '2024-01-25',
    status: 'completed',
    message: 'Happy to support this important project.',
    isAnonymous: false
  },
  {
    id: '4',
    projectTitle: 'Emergency Relief for Earthquake Victims',
    organization: 'Disaster Relief International',
    amount: 3000,
    currency: 'USD',
    date: '2024-02-01',
    status: 'pending',
    isAnonymous: true
  }
];

const mockProjectContributions: ProjectContribution[] = [
  {
    id: '1',
    projectTitle: 'Clean Water for Rural Communities',
    organization: 'Water for Life Foundation',
    role: 'donor',
    contribution: 'Major donor - $5,000',
    date: '2024-01-15',
    impact: 'Helped provide clean water to 1,000 people'
  },
  {
    id: '2',
    projectTitle: 'Education for Refugee Children',
    organization: 'Global Education Initiative',
    role: 'validator',
    contribution: 'Milestone validator',
    date: '2024-01-20',
    impact: 'Verified completion of school construction phase'
  },
  {
    id: '3',
    projectTitle: 'Local Community Garden',
    organization: 'Urban Green Initiative',
    role: 'creator',
    contribution: 'Project creator and manager',
    date: '2024-01-10',
    impact: 'Created sustainable food source for 200 families'
  }
];

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
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Profile: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile>(mockUserProfile);
  const [settingsDialog, setSettingsDialog] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEdit = () => {
    setEditForm(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: any) => {
    setEditForm(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [field]: value }
    }));
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          My Profile
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your account, view donation history, and track your impact.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 24 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                <Avatar
                  src={profile.avatar}
                  sx={{ width: 120, height: 120, mx: 'auto' }}
                />
                {profile.isVerified && (
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <Tooltip title="Verified User">
                        <Verified sx={{ color: 'success.main', fontSize: 20 }} />
                      </Tooltip>
                    }
                  >
                    <Box />
                  </Badge>
                )}
              </Box>

              <Typography variant="h5" gutterBottom>
                {profile.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Member since {formatDate(profile.joinDate)}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h4" color="primary" gutterBottom>
                  {formatCurrency(profile.totalDonated, 'USD')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Donated
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {profile.projectsSupported}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Projects Supported
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Favorite Categories
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                  {profile.favoriteCategories.map((category) => (
                    <Chip key={category} label={category} size="small" variant="outlined" />
                  ))}
                </Box>
              </Box>

              <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                  variant="outlined"
                  startIcon={<Settings />}
                  onClick={() => setSettingsDialog(true)}
                >
                  Settings
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ mb: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Profile Info" />
                <Tab label="Donation History" />
                <Tab label="Contributions" />
                <Tab label="Impact" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5">
                  Personal Information
                </Typography>
                <Button
                  variant={isEditing ? "contained" : "outlined"}
                  startIcon={isEditing ? <Save /> : <Edit />}
                  onClick={isEditing ? handleSave : handleEdit}
                >
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
              </Box>

              {isEditing && (
                <Alert severity="info" sx={{ mb: 3 }}>
                  You can edit your profile information. Click Save to apply changes.
                </Alert>
              )}

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={isEditing ? editForm.name : profile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={isEditing ? editForm.email : profile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={isEditing ? editForm.phone : profile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={isEditing ? editForm.location : profile.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
              </Grid>

              {isEditing && (
                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                  <Button variant="contained" onClick={handleSave}>
                    Save Changes
                  </Button>
                  <Button variant="outlined" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Box>
              )}
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="h5" gutterBottom>
                Donation History
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Track all your donations and their impact on projects.
              </Typography>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Project</TableCell>
                      <TableCell>Organization</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Anonymous</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockDonationHistory.map((donation) => (
                      <TableRow key={donation.id}>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {donation.projectTitle}
                          </Typography>
                          {donation.message && (
                            <Typography variant="caption" color="text.secondary">
                              "{donation.message}"
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {donation.organization}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {formatCurrency(donation.amount, donation.currency)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {formatDate(donation.date)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={donation.status}
                            color={getStatusColor(donation.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={donation.isAnonymous ? 'Yes' : 'No'}
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Typography variant="h5" gutterBottom>
                Project Contributions
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Your contributions across different projects and roles.
              </Typography>

              <Grid container spacing={3}>
                {mockProjectContributions.map((contribution) => (
                  <Grid item xs={12} key={contribution.id}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Box>
                            <Typography variant="h6" gutterBottom>
                              {contribution.projectTitle}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              {contribution.organization}
                            </Typography>
                            <Chip
                              label={contribution.role}
                              color={contribution.role === 'creator' ? 'primary' : 'secondary'}
                              size="small"
                              sx={{ mr: 1 }}
                            />
                            <Typography variant="caption" color="text.secondary">
                              {formatDate(contribution.date)}
                            </Typography>
                          </Box>
                        </Box>

                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Contribution:</strong> {contribution.contribution}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Impact:</strong> {contribution.impact}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <Typography variant="h5" gutterBottom>
                Your Impact
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                See the real-world impact of your contributions.
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <TrendingUp sx={{ mr: 1, color: 'success.main' }} />
                        <Typography variant="h6">Total Impact</Typography>
                      </Box>
                      <Typography variant="h4" color="success.main" gutterBottom>
                        2,500+ People Helped
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Through your donations and contributions
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Star sx={{ mr: 1, color: 'secondary.main' }} />
                        <Typography variant="h6">Average Rating</Typography>
                      </Box>
                      <Typography variant="h4" color="secondary.main" gutterBottom>
                        4.8/5.0
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quality score of supported projects
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>

      {/* Settings Dialog */}
      <Dialog open={settingsDialog} onClose={() => setSettingsDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Account Settings</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={profile.preferences.emailNotifications}
                onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
              />
            }
            label="Email Notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={profile.preferences.smsNotifications}
                onChange={(e) => handlePreferenceChange('smsNotifications', e.target.checked)}
              />
            }
            label="SMS Notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={profile.preferences.anonymousDonations}
                onChange={(e) => handlePreferenceChange('anonymousDonations', e.target.checked)}
              />
            }
            label="Default to Anonymous Donations"
          />

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Privacy & Security
          </Typography>
          <Button variant="outlined" fullWidth sx={{ mb: 2 }}>
            Change Password
          </Button>
          <Button variant="outlined" fullWidth sx={{ mb: 2 }}>
            Two-Factor Authentication
          </Button>
          <Button variant="outlined" fullWidth>
            Download My Data
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSettingsDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile; 