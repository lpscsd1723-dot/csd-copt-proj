import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const InsightsSection: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  // 模擬洞察觀點文章資料
  const insightArticles = [
    {
      id: 1,
      title: t('homepage.insights.articles.0.title', '農業數位轉型趨勢分析'),
      description: t('homepage.insights.articles.0.description', '探討AI、IoT技術在農業領域的應用現況與未來發展'),
      image: '/api/placeholder/400/250',
      category: t('homepage.insights.articles.0.category', '產業趨勢'),
      readTime: t('homepage.insights.articles.0.read-time', '5 分鐘'),
      externalLink: 'https://example.com/article1',
    },
    {
      id: 2,
      title: t('homepage.insights.articles.1.title', '健康照護產業的智慧化發展'),
      description: t('homepage.insights.articles.1.description', '分析長照2.0政策下的數位健康服務創新模式'),
      image: '/api/placeholder/400/250',
      category: t('homepage.insights.articles.1.category', '專題研究'),
      readTime: t('homepage.insights.articles.1.read-time', '8 分鐘'),
      externalLink: 'https://example.com/article2',
    },
    {
      id: 3,
      title: t('homepage.insights.articles.2.title', '原民產業永續經營策略'),
      description: t('homepage.insights.articles.2.description', '從文化傳承到商業價值的原民產業發展路徑'),
      image: '/api/placeholder/400/250',
      category: t('homepage.insights.articles.2.category', '產業趨勢'),
      readTime: t('homepage.insights.articles.2.read-time', '6 分鐘'),
      externalLink: 'https://example.com/article3',
    },
    {
      id: 4,
      title: t('homepage.insights.articles.3.title', 'ESG永續發展的企業實踐'),
      description: t('homepage.insights.articles.3.description', '企業如何透過ESG策略實現永續經營與社會責任'),
      image: '/api/placeholder/400/250',
      category: t('homepage.insights.articles.3.category', '專題研究'),
      readTime: t('homepage.insights.articles.3.read-time', '10 分鐘'),
      externalLink: 'https://example.com/article4',
    },
  ];

  const handleArticleClick = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <Box
      id="insights"
      sx={{
        py: 8,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: theme.palette.primary.main,
              fontWeight: 600,
            }}
          >
            {t('homepage.insights.title', '洞察觀點')}
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }, gap: 4 }}>
            {insightArticles.map((article, index) => (
              <Box key={article.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                    onClick={() => handleArticleClick(article.externalLink)}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={article.image}
                      alt={article.title}
                      sx={{
                        objectFit: 'cover',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      }}
                    />
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: 'white',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            fontWeight: 600,
                          }}
                        >
                          {article.category}
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                          {article.readTime}
                        </Typography>
                      </Box>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          mb: 2,
                          fontWeight: 600,
                          lineHeight: 1.4,
                          color: theme.palette.text.primary,
                        }}
                      >
                        {article.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          lineHeight: 1.6,
                          mb: 2,
                        }}
                      >
                        {article.description}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                          fontSize: '0.9rem',
                        }}
                      >
                        {t('homepage.insights.read-more', '閱讀更多 →')}
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Box>
            ))}
          </Box>

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                mb: 2,
              }}
            >
              {t('homepage.insights.more-insights', '更多洞察觀點與研究報告')}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              {t('homepage.insights.description', '我們持續關注產業趨勢，提供深度的分析報告與前瞻觀點，協助企業掌握市場脈動與發展機會。')}
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default InsightsSection;
