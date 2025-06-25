import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { WalletProvider } from '@sui/wallet-adapter-react';
import { WalletStandardAdapter } from '@sui/wallet-adapter-wallet-standard';
import { WalletModalProvider } from '@sui/wallet-adapter-react-ui';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import CreateProject from './pages/CreateProject';
import Profile from './pages/Profile';
import ValidatorDashboard from './pages/ValidatorDashboard';
import ImpactMap from './pages/ImpactMap';

// Styles
import '@sui/wallet-adapter-react-ui/styles.css';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const adapters = [new WalletStandardAdapter()];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider adapters={adapters} autoConnect>
        <WalletModalProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar />
                <Box component="main" sx={{ flexGrow: 1 }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:id" element={<ProjectDetail />} />
                    <Route path="/create-project" element={<CreateProject />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/validator" element={<ValidatorDashboard />} />
                    <Route path="/impact-map" element={<ImpactMap />} />
                  </Routes>
                </Box>
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                  }}
                />
              </Box>
            </Router>
          </ThemeProvider>
        </WalletModalProvider>
      </WalletProvider>
    </QueryClientProvider>
  );
}

export default App; 