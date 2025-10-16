import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const HeroSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();

  return (
    <Box
      id="hero"
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #667eea 50%, #764ba2 75%, #f093fb 100%)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        width: '100%', // 確保不超出視窗
        maxWidth: '100vw', // 防止水平滾動
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 193, 7, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          zIndex: 1,
        }
      }}
    >
      {/* 動態背景裝飾 */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.15"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.4,
          zIndex: 2,
          animation: 'float 20s ease-in-out infinite',
          overflow: 'hidden', // 防止超出容器
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-20px) rotate(180deg)' },
          }
        }}
      />
      
      {/* 浮動幾何圖形 */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: 100,
          height: 100,
          background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
          borderRadius: '50%',
          zIndex: 2,
          animation: 'pulse 4s ease-in-out infinite',
          maxWidth: 'calc(100vw - 20px)', // 防止超出視窗
          '@keyframes pulse': {
            '0%, 100%': { transform: 'scale(1)', opacity: 0.7 },
            '50%': { transform: 'scale(1.2)', opacity: 0.3 },
          }
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '15%',
          width: 60,
          height: 60,
          background: 'linear-gradient(45deg, rgba(255, 107, 53, 0.2), rgba(255, 193, 7, 0.1))',
          borderRadius: '20%',
          zIndex: 2,
          animation: 'rotate 8s linear infinite',
          maxWidth: 'calc(100vw - 20px)', // 防止超出視窗
          '@keyframes rotate': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          }
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              textAlign: 'center',
              color: 'white',
              py: 8,
            }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: isMobile ? '2.5rem' : '4rem',
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(45deg, #FFD700, #FFA500, #FF6B35)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
              }}
            >
              {t('homepage.hero.title', '中衛中心')}
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: isMobile ? '1.5rem' : '2.5rem',
                fontWeight: 600,
                mb: 3,
                color: '#E8F4FD',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {t('homepage.hero.subtitle', '前瞻服務部')}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 6,
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
                color: '#F0F8FF',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                fontWeight: 400,
              }}
            >
              {t('homepage.hero.description', '推動產業跨域轉型，以農業、健康照護、原民產業與永續發展為核心，協助企業數位轉型與ESG永續經營')}
            </Typography>
            
            {/* 按鈕容器 */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
                mt: 2,
              }}
            >
              {/* 主要 CTA 按鈕 */}
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(45deg, #FF6B35, #F7931E, #FFD700)',
                  color: 'white',
                  border: 'none',
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  borderRadius: '50px',
                  boxShadow: '0 8px 25px rgba(255, 107, 53, 0.4)',
                  textTransform: 'none',
                  minWidth: isMobile ? '280px' : 'auto',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FF8C42, #FFA726, #FFEB3B)',
                    transform: 'translateY(-3px) scale(1.05)',
                    boxShadow: '0 12px 35px rgba(255, 107, 53, 0.6)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onClick={() => {
                  document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('homepage.hero.explore-button', '🚀 立即探索服務')}
              </Button>
              
              {/* 次要按鈕 */}
              <Button
                variant="outlined"
                size="large"
                sx={{
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.6)',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: '25px',
                  textTransform: 'none',
                  minWidth: isMobile ? '280px' : 'auto',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid white',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
                onClick={() => {
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('homepage.hero.contact-button', '📞 聯絡我們')}
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HeroSection;
