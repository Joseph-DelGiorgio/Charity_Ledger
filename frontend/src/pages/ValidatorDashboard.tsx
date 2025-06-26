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
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Alert,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Badge,
  IconButton,
  Tooltip,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Pending,
  Warning,
  Verified,
  Assignment,
  Timeline,
  AttachMoney,
  LocationOn,
  CalendarToday,
  Description,
  PhotoCamera,
  Download,
  Visibility,
  Star,
  TrendingUp,
  Assessment,
  Notifications
} from '@mui/icons-material';

interface MilestoneSubmission {
  id: string;
  projectId: string;
  projectTitle: string;
  organization: string;
  milestoneTitle: string;
  milestoneDescription: string;
  targetAmount: number;
  submittedAmount: number;
  dueDate: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  evidence: string[];
  validatorNotes?: string;
  validatorRating?: number;
  location: string;
  category: string;
}

interface ValidatorStats {
  totalReviewed: number;
  approvedCount: number;
  rejectedCount: number;
  pendingCount: number;
  averageRating: number;
  monthlyReviews: number;
}

const mockSubmissions: MilestoneSubmission[] = [
  {
    id: '1',
    projectId: '1',
    projectTitle: 'Clean Water for Rural Communities',
    organization: 'Water for Life Foundation',
    milestoneTitle: 'Equipment Procurement and Installation',
    milestoneDescription: 'Purchase and install water purification systems in the first 5 villages.',
    targetAmount: 15000,
    submittedAmount: 15000,
    dueDate: '2024-04-30',
    submissionDate: '2024-04-25',
    status: 'pending',
    evidence: [
      'Installation photos showing completed systems',
      'Equipment receipts and invoices',
      'Community feedback surveys',
      'Water quality test results'
    ],
    location: 'Kenya',
    category: 'Health'
  },
  {
    id: '2',
    projectId: '2',
    projectTitle: 'Education for Refugee Children',
    organization: 'Global Education Initiative',
    milestoneTitle: 'School Construction Phase 1',
    milestoneDescription: 'Complete foundation and basic structure for the first school building.',
    targetAmount: 20000,
    submittedAmount: 18500,
    dueDate: '2024-05-15',
    submissionDate: '2024-05-10',
    status: 'under_review',
    evidence: [
      'Construction progress photos',
      'Building permits and approvals',
      'Material delivery receipts',
      'Safety inspection reports'
    ],
    validatorNotes: 'Need additional documentation for material costs',
    location: 'Jordan',
    category: 'Education'
  },
  {
    id: '3',
    projectId: '3',
    projectTitle: 'Solar Energy for Rural India',
    organization: 'Green Energy Solutions',
    milestoneTitle: 'Community Training Program',
    milestoneDescription: 'Train local technicians and community members on system maintenance.',
    targetAmount: 8000,
    submittedAmount: 8000,
    dueDate: '2024-06-15',
    submissionDate: '2024-06-12',
    status: 'approved',
    evidence: [
      'Training session photos and videos',
      'Participant attendance records',
      'Training material distribution logs',
      'Post-training assessment results'
    ],
    validatorRating: 4.8,
    location: 'India',
    category: 'Environment'
  }
];

const mockStats: ValidatorStats = {
  totalReviewed: 156,
  approvedCount: 142,
  rejectedCount: 8,
  pendingCount: 6,
  averageRating: 4.6,
  monthlyReviews: 23
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
      id={`validator-tabpanel-${index}`}
      aria-labelledby={`validator-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const ValidatorDashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [submissions, setSubmissions] = useState<MilestoneSubmission[]>(mockSubmissions);
  const [stats, setStats] = useState<ValidatorStats>(mockStats);
  const [selectedSubmission, setSelectedSubmission] = useState<MilestoneSubmission | null>(null);
  const [reviewDialog, setReviewDialog] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewRating, setReviewRating] = useState<number>(0);
  const [filterStatus, setFilterStatus] = useState('all');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleReview = (submission: MilestoneSubmission) => {
    setSelectedSubmission(submission);
    setReviewNotes(submission.validatorNotes || '');
    setReviewRating(submission.validatorRating || 0);
    setReviewDialog(true);
  };

  const handleApprove = () => {
    if (selectedSubmission) {
      const updatedSubmissions = submissions.map(sub =>
        sub.id === selectedSubmission.id
          ? { ...sub, status: 'approved' as const, validatorNotes: reviewNotes, validatorRating: reviewRating }
          : sub
      );
      setSubmissions(updatedSubmissions);
      setReviewDialog(false);
      setSelectedSubmission(null);
      setReviewNotes('');
      setReviewRating(0);
    }
  };

  const handleReject = () => {
    if (selectedSubmission) {
      const updatedSubmissions = submissions.map(sub =>
        sub.id === selectedSubmission.id
          ? { ...sub, status: 'rejected' as const, validatorNotes: reviewNotes, validatorRating: reviewRating }
          : sub
      );
      setSubmissions(updatedSubmissions);
      setReviewDialog(false);
      setSelectedSubmission(null);
      setReviewNotes('');
      setReviewRating(0);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'pending': return 'warning';
      case 'under_review': return 'info';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle />;
      case 'rejected': return <Cancel />;
      case 'pending': return <Pending />;
      case 'under_review': return <Warning />;
      default: return <Pending />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredSubmissions = submissions.filter(sub => 
    filterStatus === 'all' || sub.status === filterStatus
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Validator Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Review and validate project milestones to ensure transparent fund distribution.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assessment sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Total Reviewed</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {stats.totalReviewed}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                All time reviews
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircle sx={{ mr: 1, color: 'success.main' }} />
                <Typography variant="h6">Approved</Typography>
              </Box>
              <Typography variant="h4" color="success.main">
                {stats.approvedCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {((stats.approvedCount / stats.totalReviewed) * 100).toFixed(1)}% approval rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Pending sx={{ mr: 1, color: 'warning.main' }} />
                <Typography variant="h6">Pending</Typography>
              </Box>
              <Typography variant="h4" color="warning.main">
                {stats.pendingCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Awaiting review
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Star sx={{ mr: 1, color: 'secondary.main' }} />
                <Typography variant="h6">Avg Rating</Typography>
              </Box>
              <Typography variant="h4" color="secondary.main">
                {stats.averageRating}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Project quality score
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Pending Reviews" />
            <Tab label="All Submissions" />
            <Tab label="Analytics" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Milestones Awaiting Review
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Review and validate milestone submissions to release funds to projects.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {submissions.filter(sub => sub.status === 'pending').map((submission) => (
              <Grid item xs={12} key={submission.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {submission.milestoneTitle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {submission.projectTitle} • {submission.organization}
                        </Typography>
                        <Typography variant="body2">
                          {submission.milestoneDescription}
                        </Typography>
                      </Box>
                      <Chip
                        icon={getStatusIcon(submission.status)}
                        label={submission.status.replace('_', ' ')}
                        color={getStatusColor(submission.status)}
                        size="small"
                      />
                    </Box>

                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={12} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AttachMoney sx={{ mr: 1, fontSize: 16 }} />
                          <Typography variant="body2">
                            {formatCurrency(submission.submittedAmount)} / {formatCurrency(submission.targetAmount)}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationOn sx={{ mr: 1, fontSize: 16 }} />
                          <Typography variant="body2">
                            {submission.location}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarToday sx={{ mr: 1, fontSize: 16 }} />
                          <Typography variant="body2">
                            Due: {formatDate(submission.dueDate)}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Description sx={{ mr: 1, fontSize: 16 }} />
                          <Typography variant="body2">
                            {submission.evidence.length} evidence files
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <CardActions>
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<CheckCircle />}
                        onClick={() => handleReview(submission)}
                      >
                        Review & Approve
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Cancel />}
                        onClick={() => handleReview(submission)}
                      >
                        Review & Reject
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Visibility />}
                        onClick={() => handleReview(submission)}
                      >
                        View Details
                      </Button>
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5">
                All Submissions
              </Typography>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Filter by Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Filter by Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="under_review">Under Review</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Project</TableCell>
                  <TableCell>Milestone</TableCell>
                  <TableCell>Organization</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Submitted</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {submission.projectTitle}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {submission.category}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {submission.milestoneTitle}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {submission.organization}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatCurrency(submission.submittedAmount)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(submission.status)}
                        label={submission.status.replace('_', ' ')}
                        color={getStatusColor(submission.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(submission.submissionDate)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        onClick={() => handleReview(submission)}
                      >
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h5" gutterBottom>
            Validation Analytics
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Track your validation performance and impact metrics.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Monthly Review Trends
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TrendingUp sx={{ mr: 1, color: 'success.main' }} />
                    <Typography variant="h4" color="success.main">
                      {stats.monthlyReviews}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Reviews this month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Approval Rate
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h4" color="primary">
                      {((stats.approvedCount / stats.totalReviewed) * 100).toFixed(1)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(stats.approvedCount / stats.totalReviewed) * 100}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {stats.approvedCount} approved out of {stats.totalReviewed} total
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Review Dialog */}
      <Dialog open={reviewDialog} onClose={() => setReviewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Review Milestone Submission
          {selectedSubmission && (
            <Typography variant="body2" color="text.secondary">
              {selectedSubmission.milestoneTitle} • {selectedSubmission.projectTitle}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
          {selectedSubmission && (
            <Box>
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Project Details</Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="Organization"
                        secondary={selectedSubmission.organization}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Location"
                        secondary={selectedSubmission.location}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Category"
                        secondary={selectedSubmission.category}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Target Amount"
                        secondary={formatCurrency(selectedSubmission.targetAmount)}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Submitted Amount"
                        secondary={formatCurrency(selectedSubmission.submittedAmount)}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Evidence Files</Typography>
                  <List dense>
                    {selectedSubmission.evidence.map((file, index) => (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <Avatar>
                            <PhotoCamera />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Evidence ${index + 1}`}
                          secondary={file}
                        />
                        <IconButton size="small">
                          <Download />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>Review Notes</Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="Add your review notes and feedback..."
                sx={{ mb: 2 }}
              />

              <Typography variant="h6" gutterBottom>Quality Rating</Typography>
              <Rating
                value={reviewRating}
                onChange={(event, newValue) => setReviewRating(newValue || 0)}
                size="large"
                sx={{ mb: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReviewDialog(false)}>Cancel</Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleReject}
            startIcon={<Cancel />}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleApprove}
            startIcon={<CheckCircle />}
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ValidatorDashboard; 