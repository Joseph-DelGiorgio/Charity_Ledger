import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
  OutlinedInput,
  FormHelperText,
  Card,
  CardContent,
  Alert,
  Divider,
  InputAdornment,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  CloudUpload as UploadIcon,
  LocationOn,
  AttachMoney,
  Description,
  Timeline
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Milestone {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  dueDate: string;
}

const steps = ['Basic Information', 'Project Details', 'Milestones', 'Review & Submit'];

const categories = [
  'Health',
  'Education',
  'Environment',
  'Poverty',
  'Disaster Relief',
  'Human Rights',
  'Animal Welfare',
  'Arts & Culture',
  'Technology',
  'Other'
];

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    targetAmount: '',
    currency: 'USD',
    endDate: '',
    organization: '',
    contactEmail: '',
    website: '',
    image: '',
    tags: [] as string[],
    longDescription: ''
  });
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: '1',
      title: '',
      description: '',
      targetAmount: 0,
      dueDate: ''
    }
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagInput, setTagInput] = useState('');

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    switch (activeStep) {
      case 0:
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.targetAmount || Number(formData.targetAmount) <= 0) {
          newErrors.targetAmount = 'Valid target amount is required';
        }
        break;
      case 1:
        if (!formData.longDescription.trim()) newErrors.longDescription = 'Detailed description is required';
        if (!formData.organization.trim()) newErrors.organization = 'Organization name is required';
        if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';
        break;
      case 2:
        milestones.forEach((milestone, index) => {
          if (!milestone.title.trim()) newErrors[`milestone-${index}-title`] = 'Milestone title is required';
          if (!milestone.description.trim()) newErrors[`milestone-${index}-description`] = 'Milestone description is required';
          if (milestone.targetAmount <= 0) newErrors[`milestone-${index}-amount`] = 'Valid amount is required';
          if (!milestone.dueDate) newErrors[`milestone-${index}-date`] = 'Due date is required';
        });
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleMilestoneChange = (index: number, field: string, value: string | number) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index] = { ...updatedMilestones[index], [field]: value };
    setMilestones(updatedMilestones);
    
    const errorKey = `milestone-${index}-${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const addMilestone = () => {
    setMilestones(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title: '',
        description: '',
        targetAmount: 0,
        dueDate: ''
      }
    ]);
  };

  const removeMilestone = (index: number) => {
    if (milestones.length > 1) {
      setMilestones(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = () => {
    if (validateStep()) {
      // Here you would typically send the data to your backend
      console.log('Project Data:', { ...formData, milestones });
      navigate('/projects');
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project Title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Short Description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
                multiline
                rows={3}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.category} required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  label="Category"
                  onChange={(e) => handleInputChange('category', e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                error={!!errors.location}
                helperText={errors.location}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Target Amount"
                type="number"
                value={formData.targetAmount}
                onChange={(e) => handleInputChange('targetAmount', e.target.value)}
                error={!!errors.targetAmount}
                helperText={errors.targetAmount}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  value={formData.currency}
                  label="Currency"
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                >
                  {currencies.map((currency) => (
                    <MenuItem key={currency} value={currency}>
                      {currency}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Project End Date"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Detailed Description"
                value={formData.longDescription}
                onChange={(e) => handleInputChange('longDescription', e.target.value)}
                error={!!errors.longDescription}
                helperText={errors.longDescription}
                multiline
                rows={6}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Organization Name"
                value={formData.organization}
                onChange={(e) => handleInputChange('organization', e.target.value)}
                error={!!errors.organization}
                helperText={errors.organization}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Email"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                error={!!errors.contactEmail}
                helperText={errors.contactEmail}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Website (Optional)"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://example.com"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Project Image URL"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Add Tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleTagAdd()}
                  helperText="Press Enter to add a tag"
                />
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleTagRemove(tag)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Project Milestones
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Define the key milestones for your project. Funds will be released as milestones are completed and verified.
            </Typography>
            {milestones.map((milestone, index) => (
              <Card key={milestone.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Milestone {index + 1}</Typography>
                    {milestones.length > 1 && (
                      <IconButton
                        color="error"
                        onClick={() => removeMilestone(index)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Milestone Title"
                        value={milestone.title}
                        onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
                        error={!!errors[`milestone-${index}-title`]}
                        helperText={errors[`milestone-${index}-title`]}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Description"
                        value={milestone.description}
                        onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
                        error={!!errors[`milestone-${index}-description`]}
                        helperText={errors[`milestone-${index}-description`]}
                        multiline
                        rows={2}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Target Amount"
                        type="number"
                        value={milestone.targetAmount}
                        onChange={(e) => handleMilestoneChange(index, 'targetAmount', Number(e.target.value))}
                        error={!!errors[`milestone-${index}-amount`]}
                        helperText={errors[`milestone-${index}-amount`]}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AttachMoney />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Due Date"
                        type="date"
                        value={milestone.dueDate}
                        onChange={(e) => handleMilestoneChange(index, 'dueDate', e.target.value)}
                        error={!!errors[`milestone-${index}-date`]}
                        helperText={errors[`milestone-${index}-date`]}
                        InputLabelProps={{ shrink: true }}
                        required
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addMilestone}
              sx={{ mt: 2 }}
            >
              Add Milestone
            </Button>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Alert severity="info" sx={{ mb: 3 }}>
              Please review your project details before submitting. Once submitted, your project will be reviewed by validators.
            </Alert>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Project Summary</Typography>
                <Typography><strong>Title:</strong> {formData.title}</Typography>
                <Typography><strong>Category:</strong> {formData.category}</Typography>
                <Typography><strong>Location:</strong> {formData.location}</Typography>
                <Typography><strong>Target Amount:</strong> {formData.currency} {formData.targetAmount}</Typography>
                <Typography><strong>Organization:</strong> {formData.organization}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Milestones</Typography>
                {milestones.map((milestone, index) => (
                  <Box key={milestone.id} sx={{ mb: 1 }}>
                    <Typography variant="body2">
                      <strong>{index + 1}.</strong> {milestone.title} - {formData.currency} {milestone.targetAmount}
                    </Typography>
                  </Box>
                ))}
              </Grid>
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Create New Project
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Start a new charity project with transparent milestone tracking and blockchain verification.
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4, mb: 2 }}>
          {renderStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                startIcon={<SaveIcon />}
              >
                Create Project
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateProject; 