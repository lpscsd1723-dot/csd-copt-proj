import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Agriculture as AgricultureIcon,
  HealthAndSafety as HealthIcon,
  Public as PublicIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ServicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedService, setExpandedService] = useState<string | false>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();
  
  // 動態獲取服務資料
  const services = {
    agriculture: {
      'tech-agriculture': {
        title: t('homepage.services.agriculture.tech-agriculture.title', '科技農企業'),
        summary: t('homepage.services.agriculture.tech-agriculture.summary', '科技農企業服務摘要'),
        'case-study': {
          title: t('homepage.services.agriculture.tech-agriculture.case-study.title', '案例研究'),
          company: t('homepage.services.agriculture.tech-agriculture.case-study.company', '範例公司'),
          features: t('homepage.services.agriculture.tech-agriculture.case-study.features', { returnObjects: true }) as string[] || []
        },
        results: {
          title: t('homepage.services.agriculture.tech-agriculture.results.title', '服務成果'),
          categories: t('homepage.services.agriculture.tech-agriculture.results.categories', { returnObjects: true }) as any[] || []
        },
        'application-process': {
          title: t('homepage.services.agriculture.tech-agriculture.application-process.title', '申請流程'),
          steps: t('homepage.services.agriculture.tech-agriculture.application-process.steps', { returnObjects: true }) as any[] || []
        }
      },
      'rural-industry': {
        title: t('homepage.services.agriculture.rural-industry.title', '農村產業'),
        summary: t('homepage.services.agriculture.rural-industry.summary', '農村產業服務摘要'),
        results: {
          title: t('homepage.services.agriculture.rural-industry.results.title', '服務成果'),
          achievements: t('homepage.services.agriculture.rural-industry.results.achievements', { returnObjects: true }) as string[] || []
        }
      },
      traceability: {
        title: t('homepage.services.agriculture.traceability.title', '農產品溯源'),
        summary: t('homepage.services.agriculture.traceability.summary', '農產品溯源服務摘要'),
        results: {
          title: t('homepage.services.agriculture.traceability.results.title', '服務成果'),
          achievements: t('homepage.services.agriculture.traceability.results.achievements', { returnObjects: true }) as string[] || []
        },
        'application-process': {
          title: t('homepage.services.agriculture.traceability.application-process.title', '申請流程'),
          steps: t('homepage.services.agriculture.traceability.application-process.steps', { returnObjects: true }) as string[] || []
        }
      }
    },
    healthcare: {
      'long-term-care': {
        title: t('homepage.services.healthcare.long-term-care.title', '長期照顧'),
        summary: t('homepage.services.healthcare.long-term-care.summary', '長期照顧服務摘要'),
        results: {
          title: t('homepage.services.healthcare.long-term-care.results.title', '服務成果'),
          achievements: t('homepage.services.healthcare.long-term-care.results.achievements', { returnObjects: true }) as string[] || []
        }
      },
      'healthcare-services': {
        title: t('homepage.services.healthcare.healthcare-services.title', '健康照護服務'),
        summary: t('homepage.services.healthcare.healthcare-services.summary', '健康照護服務摘要'),
        results: {
          title: t('homepage.services.healthcare.healthcare-services.results.title', '服務成果'),
          summary: t('homepage.services.healthcare.healthcare-services.results.summary', '成果摘要'),
          statistics: t('homepage.services.healthcare.healthcare-services.results.statistics', { returnObjects: true }) as string[] || []
        }
      },
      'sports-tech': {
        title: t('homepage.services.healthcare.sports-tech.title', '運動科技'),
        summary: t('homepage.services.healthcare.sports-tech.summary', '運動科技服務摘要'),
        results: {
          title: t('homepage.services.healthcare.sports-tech.results.title', '服務成果'),
          categories: t('homepage.services.healthcare.sports-tech.results.categories', { returnObjects: true }) as any[] || []
        }
      }
    },
    indigenous: {
      title: t('homepage.services.indigenous.title', '原民通路與產業'),
      summary: t('homepage.services.indigenous.summary', '原民通路與產業服務摘要'),
      'case-study': {
        title: t('homepage.services.indigenous.case-study.title', '案例研究'),
        summary: t('homepage.services.indigenous.case-study.summary', '案例摘要'),
        features: t('homepage.services.indigenous.case-study.features', { returnObjects: true }) as string[] || []
      },
      'application-process': {
        title: t('homepage.services.indigenous.application-process.title', '申請流程'),
        steps: t('homepage.services.indigenous.application-process.steps', { returnObjects: true }) as any[] || []
      }
    },
    title: t('homepage.services.title', '服務項目')
  };

  const serviceTabs = [
    { label: t('homepage.services.agriculture.title', '農業經營與創新轉型'), icon: <AgricultureIcon />, color: '#4caf50' },
    { label: t('homepage.services.healthcare.title', '健康照護'), icon: <HealthIcon />, color: '#2196f3' },
    { label: t('homepage.services.indigenous.title', '原民通路與產業'), icon: <PublicIcon />, color: '#ff9800' },
    { label: t('homepage.services.sustainability.title', '前瞻永續'), icon: <TrendingUpIcon />, color: '#9c27b0' },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleServiceExpand = (service: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedService(isExpanded ? service : false);
  };

  const renderAgricultureServices = () => (
    <Box>
      {/* 科技農企業 */}
      <Accordion
        expanded={expandedService === 'tech-agriculture'}
        onChange={handleServiceExpand('tech-agriculture')}
        sx={{ mb: 3, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {services.agriculture['tech-agriculture'].title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            {services.agriculture['tech-agriculture'].summary}
          </Typography>
          
          {/* 案例 */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {services.agriculture['tech-agriculture']['case-study'].title}
            </Typography>
            <Card sx={{ backgroundColor: 'rgba(76, 175, 80, 0.1)', p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                {services.agriculture['tech-agriculture']['case-study'].company}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {t('homepage.services.agriculture.tech-agriculture.case-study.features', '特色：')}
              </Typography>
              <List dense>
                {services.agriculture['tech-agriculture']['case-study'].features.map((feature, index) => (
                  <ListItem key={index} sx={{ py: 0 }}>
                    <ListItemText primary={`• ${feature}`} />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Box>

          {/* 成果 */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {services.agriculture['tech-agriculture'].results.title}
            </Typography>
            {services.agriculture['tech-agriculture'].results.categories.map((category, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {category.title}
                </Typography>
                <List dense>
                  {category.items.map((item: string, itemIndex: number) => (
                    <ListItem key={itemIndex} sx={{ py: 0 }}>
                      <ListItemText primary={`• ${item}`} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </Box>

          {/* 申請流程 */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {services.agriculture['tech-agriculture']['application-process'].title}
            </Typography>
            {services.agriculture['tech-agriculture']['application-process'].steps.map((step, index) => (
              <Card key={index} sx={{ mb: 2, p: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {step.title}
                </Typography>
                {step.process && Array.isArray(step.process) && (
                  <List dense>
                    {step.process.map((processItem: string, processIndex: number) => (
                      <ListItem key={processIndex} sx={{ py: 0 }}>
                        <ListItemText primary={`${processIndex + 1}. ${processItem}`} />
                      </ListItem>
                    ))}
                  </List>
                )}
                {step.target && (
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                    對象：{step.target}
                  </Typography>
                )}
                {step.content && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    內容：{step.content}
                  </Typography>
                )}
                {step.purpose && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    目的：{step.purpose}
                  </Typography>
                )}
              </Card>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* 農村產業 */}
      <Accordion
        expanded={expandedService === 'rural-industry'}
        onChange={handleServiceExpand('rural-industry')}
        sx={{ mb: 3, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {services.agriculture['rural-industry'].title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            {services.agriculture['rural-industry'].summary}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {services.agriculture['rural-industry'].results.title}
            </Typography>
            <List dense>
              {services.agriculture['rural-industry'].results.achievements.map((achievement, index) => (
                <ListItem key={index} sx={{ py: 0 }}>
                  <ListItemText primary={`• ${achievement}`} />
                </ListItem>
              ))}
            </List>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* 產銷履歷 */}
      <Accordion
        expanded={expandedService === 'traceability'}
        onChange={handleServiceExpand('traceability')}
        sx={{ mb: 3, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {services.agriculture.traceability.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            {services.agriculture.traceability.summary}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {services.agriculture.traceability.results.title}
            </Typography>
            <List dense>
              {services.agriculture.traceability.results.achievements.map((achievement, index) => (
                <ListItem key={index} sx={{ py: 0 }}>
                  <ListItemText primary={`• ${achievement}`} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {services.agriculture.traceability['application-process'].title}
            </Typography>
            <List dense>
              {services.agriculture.traceability['application-process'].steps.map((step, index) => (
                <ListItem key={index} sx={{ py: 0 }}>
                  <ListItemText primary={`${index + 1}. ${step}`} />
                </ListItem>
              ))}
            </List>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );

  const renderHealthServices = () => (
    <Box>
      {/* 長期照顧 */}
      <Accordion
        expanded={expandedService === 'long-term-care'}
        onChange={handleServiceExpand('long-term-care')}
        sx={{ mb: 3, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {services.healthcare['long-term-care'].title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            {services.healthcare['long-term-care'].summary}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {services.healthcare['long-term-care'].results.title}
            </Typography>
            <List dense>
              {services.healthcare['long-term-care'].results.achievements.map((achievement, index) => (
                <ListItem key={index} sx={{ py: 0 }}>
                  <ListItemText primary={`• ${achievement}`} />
                </ListItem>
              ))}
            </List>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* 健康照護 */}
      <Accordion
        expanded={expandedService === 'healthcare-services'}
        onChange={handleServiceExpand('healthcare-services')}
        sx={{ mb: 3, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {services.healthcare['healthcare-services'].title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            {services.healthcare['healthcare-services'].summary}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {services.healthcare['healthcare-services'].results.title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {services.healthcare['healthcare-services'].results.summary}
            </Typography>
            <List dense>
              {services.healthcare['healthcare-services'].results.statistics.map((stat, index) => (
                <ListItem key={index} sx={{ py: 0 }}>
                  <ListItemText primary={`• ${stat}`} />
                </ListItem>
              ))}
            </List>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* 運動科技 */}
      <Accordion
        expanded={expandedService === 'sports-tech'}
        onChange={handleServiceExpand('sports-tech')}
        sx={{ mb: 3, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {services.healthcare['sports-tech'].title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            {services.healthcare['sports-tech'].summary}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {services.healthcare['sports-tech'].results.title}
            </Typography>
            {services.healthcare['sports-tech'].results.categories.map((category, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {category.title}
                </Typography>
                <List dense>
                  {category.items.map((item: string, itemIndex: number) => (
                    <ListItem key={itemIndex} sx={{ py: 0 }}>
                      <ListItemText primary={`• ${item}`} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );

  const renderIndigenousServices = () => (
    <Box>
      <Accordion
        expanded={expandedService === 'indigenous'}
        onChange={handleServiceExpand('indigenous')}
        sx={{ mb: 3, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {services.indigenous.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            {services.indigenous.summary}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {services.indigenous['case-study'].title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {services.indigenous['case-study'].summary}
            </Typography>
            <List dense>
              {services.indigenous['case-study'].features.map((feature, index) => (
                <ListItem key={index} sx={{ py: 0 }}>
                  <ListItemText primary={`• ${feature}`} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {services.indigenous['application-process'].title}
            </Typography>
            {services.indigenous['application-process'].steps.map((step, index) => (
              <Card key={index} sx={{ mb: 2, p: 2, backgroundColor: 'rgba(255, 193, 7, 0.1)' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {step.title}
                </Typography>
                {step.note && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {step.note}
                  </Typography>
                )}
                {step.requirements && (
                  <List dense>
                    {step.requirements.map((req: string, reqIndex: number) => (
                      <ListItem key={reqIndex} sx={{ py: 0 }}>
                        <ListItemText primary={`• ${req}`} />
                      </ListItem>
                    ))}
                  </List>
                )}
                {step.process && (
                  <List dense>
                    {step.process.map((processItem: string, processIndex: number) => (
                      <ListItem key={processIndex} sx={{ py: 0 }}>
                        <ListItemText primary={`• ${processItem}`} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Card>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );

  return (
    <Box
      id="services"
      sx={{
        py: 8,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
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
              color: 'white',
              fontWeight: 700,
              mb: 3,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              textAlign: 'center',
            }}
          >
            {services.title}
          </Typography>
          <Box
            sx={{
              width: 120,
              height: 4,
              background: 'linear-gradient(90deg, transparent, #ffd700, transparent)',
              mx: 'auto',
              borderRadius: 2,
              mb: 6,
            }}
          />

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            scrollButtons="auto"
            sx={{
              mb: 4,
              mx: -3,
              '& .MuiTabs-root': {
                minHeight: 80,
              },
                '& .MuiTab-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 600,
                  minHeight: 80,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  flex: 1,
                  px: 0,
                  py: 2,
                  minWidth: 0,
                  '& .MuiTab-wrapper': {
                    width: '100%',
                    justifyContent: 'center',
                    gap: 1,
                  },
                  '&:hover': {
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    '& .MuiSvgIcon-root': {
                      transform: 'scale(1.2)',
                      transition: 'transform 0.3s ease',
                    },
                  },
                  '&.Mui-selected': {
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
                    '& .MuiSvgIcon-root': {
                      transform: 'scale(1.3)',
                      filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                    },
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: 'transparent',
                  height: 0,
                },
                '& .MuiTabs-flexContainer': {
                  gap: 0,
                  width: '100%',
                },
              }}
            >
              {serviceTabs.map((tab, index) => (
                <Tab
                  key={index}
                  label={tab.label}
                  icon={tab.icon}
                  iconPosition="start"
                  sx={{ 
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: 1,
                    '& .MuiSvgIcon-root': {
                      transition: 'all 0.3s ease',
                      color: activeTab === index ? tab.color : 'inherit',
                    },
                  }}
                />
              ))}
            </Tabs>

          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: 2, p: 3 }}>
            {activeTab === 0 && renderAgricultureServices()}
            {activeTab === 1 && renderHealthServices()}
            {activeTab === 2 && renderIndigenousServices()}
            {activeTab === 3 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                  前瞻永續服務內容開發中...
                </Typography>
              </Box>
            )}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ServicesSection;
