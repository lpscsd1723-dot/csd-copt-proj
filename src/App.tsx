import React, { useState, useCallback } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Typography } from '@mui/material';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import CenterHistory from './components/CenterHistory';
import DepartmentIntro from './components/DepartmentIntro';
import EnhancedServicesSection from './components/EnhancedServicesSection';
import ContactSection from './components/ContactSection';
import VoiceAssistant from './components/VoiceAssistant';
import TextSearchNavigator from './components/TextSearchNavigator';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Noto Sans TC", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
  },
});

function App() {
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);

  // 處理語音導航
  const handleVoiceNavigation = useCallback((href: string, serviceId?: string) => {
    const element = document.querySelector(href) as HTMLElement;
    if (element) {
      const navElement = document.querySelector('.MuiAppBar-root') as HTMLElement;
      const navHeight = navElement ? navElement.offsetHeight : 80;
      
      const elementRect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const elementPosition = elementRect.top + scrollTop;
      
      let finalPosition: number;
      
      if (href === '#center-development') {
        finalPosition = Math.max(0, elementPosition - navHeight - 50);
      } else if (href === '#department-structure') {
        finalPosition = Math.max(0, elementPosition - navHeight - 50);
      } else if (href === '#department-development') {
        finalPosition = Math.max(0, elementPosition - navHeight - 50);
      } else {
        finalPosition = Math.max(0, elementPosition - 60);
      }
      
      requestAnimationFrame(() => {
        window.scrollTo({
          top: finalPosition,
          behavior: 'smooth'
        });
      });

      // 如果有 serviceId，在滾動後打開服務
      if (serviceId) {
        setTimeout(() => {
          setOpenServiceId(serviceId);
        }, 800); // 等待滾動完成後再打開
      }
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ overflowX: 'hidden', width: '100%', maxWidth: '100vw' }}>
        <Navigation />
        <HeroSection />
        <CenterHistory />
        <DepartmentIntro />
        <EnhancedServicesSection 
          openServiceId={openServiceId}
          onServiceClose={() => setOpenServiceId(null)}
        />
        {/* <InsightsSection /> */}
        <ContactSection />
        <VoiceAssistant onNavigate={handleVoiceNavigation} />
        <TextSearchNavigator onNavigate={handleVoiceNavigation} />
        
        {/* Copyright Section */}
        <Box
          sx={{
            py: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Container maxWidth="xl">
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  mb: 1,
                  fontSize: '0.9rem',
                }}
              >
                © 2024 財團法人中衛發展中心. 版權所有.
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.8rem',
                }}
              >
                Corporate Synergy Development Center. All rights reserved.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;