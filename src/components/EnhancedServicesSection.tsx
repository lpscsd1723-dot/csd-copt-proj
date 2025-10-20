import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  Stack,
  Avatar,
  Tabs,
  Tab,
  Grid,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Agriculture as AgricultureIcon,
  HealthAndSafety as HealthIcon,
  Public as PublicIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  Business as BusinessIcon,
  Assessment as AssessmentIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ServiceCardProps {
  title: string;
  summary: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  achievements: string[];
  contact: string;
  phone: string;
  images: string[];
  cases: any[];
  results: any[];
  processes: any[];
  isActive: boolean;
  onClick: () => void;
}

interface ServiceDetailDialogProps {
  open: boolean;
  onClose: () => void;
  service: any;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  summary,
  icon,
  color,
  features,
  achievements,
  contact,
  phone,
  images,
  cases,
  results,
  processes,
  isActive,
  onClick,
}) => {
  const { t } = useTranslation();
  // const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        duration: 0.3,
        ease: "easeOut"
      }}
    >
      <Card
        onClick={onClick}
        sx={{
          height: '100%',
          minHeight: '700px', // 進一步增加高度以適應所有內容
          cursor: 'pointer',
          border: isActive ? `3px solid ${color}` : '1px solid #e0e0e0',
          boxShadow: isActive 
            ? `0 8px 32px ${color}40` 
            : '0 4px 16px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            boxShadow: `0 12px 40px ${color}30`,
            transform: 'translateY(-4px)',
          },
        }}
      >
        {/* 服務圖片 */}
        {images && images.length > 0 && (
          <CardMedia
            component="img"
            height="200"
            image={images[0]}
            alt={title}
            sx={{
              objectFit: 'cover',
              filter: 'brightness(0.9)',
            }}
          />
        )}

        {/* 背景漸層 */}
        {images && images.length > 0 ? (
          <Box
            sx={{
              position: 'absolute',
              top: 200, // 放在圖片下方
              left: 0,
              right: 0,
              height: 60,
              background: `linear-gradient(135deg, ${color}20, ${color}40)`,
              zIndex: 0,
            }}
          />
        ) : (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 120,
              background: `linear-gradient(135deg, ${color}20, ${color}40)`,
              zIndex: 0,
            }}
          />
        )}
        
        {/* 內容 */}
        <CardContent sx={{ position: 'relative', zIndex: 1, p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* 標題與圖示 */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: color,
                width: 48,
                height: 48,
                mr: 2,
                boxShadow: `0 4px 12px ${color}50`,
                flexShrink: 0,
              }}
            >
              {icon}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700, 
                  color: 'text.primary',
                  fontSize: '1rem',
                  lineHeight: 1.3,
                  wordBreak: 'break-word',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  minHeight: '2.6em', // 確保兩行高度
                }}
              >
                {title}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary', 
                  mt: 0.5, 
                  fontSize: '0.875rem',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  minHeight: '2.4em', // 確保兩行高度
                }}
              >
                {summary}
              </Typography>
            </Box>
          </Box>

          {/* 案例預覽 */}
          {cases && cases.length > 0 && (
            <Box sx={{ mb: 2, minHeight: '100px', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                💼 {t('homepage.ui.success-cases', '成功案例')}
              </Typography>
              <Card sx={{ 
                p: 2, 
                bgcolor: `${color}05`, 
                border: `1px solid ${color}20`,
                borderRadius: 2,
                flex: 1,
                display: 'flex',
                alignItems: 'center',
              }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 600, 
                    color: color,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {cases[0].services_item || cases[0].company || cases[0].title}
                </Typography>
              </Card>
            </Box>
          )}

          {/* 特色亮點 */}
          <Box sx={{ mb: 2, minHeight: '100px', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
              🌟 {t('homepage.ui.service-features', '服務特色')}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ flex: 1, alignItems: 'flex-start' }}>
              {(cases && cases.length > 0 ? cases.slice(0, 4).map(c => c.services_item) : features.slice(0, 4)).map((feature, index) => (
                <Chip
                  key={index}
                  label={feature}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: color,
                    color: color,
                    maxWidth: '100%',
                    '& .MuiChip-label': {
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '120px', // 限制標籤最大寬度
                    },
                    '&:hover': {
                      bgcolor: `${color}10`,
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* 成果統計 */}
          <Box sx={{ mb: 2, minHeight: '120px', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
              📊 {t('homepage.ui.service-results', '服務成果')}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary', 
                lineHeight: 1.6, 
                flex: 1, 
                overflow: 'hidden', 
                display: '-webkit-box', 
                WebkitLineClamp: 3, // 增加到3行
                WebkitBoxOrient: 'vertical',
                minHeight: '4.8em', // 確保三行高度
              }}
            >
              {achievements[0]}
            </Typography>
          </Box>

          {/* 聯絡資訊 */}
          <Box sx={{ 
            p: 2, 
            bgcolor: `${color}08`, 
            borderRadius: 2,
            border: `1px solid ${color}20`,
          }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
              💬 {t('homepage.ui.contact-us', '聯絡我們')}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                📞 {phone}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                ✉️ {contact}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// 服務詳情對話框組件
const ServiceDetailDialog: React.FC<ServiceDetailDialogProps> = ({ open, onClose, service }) => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (!service) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={isMobile}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: isMobile ? 0 : 3,
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        pb: 1,
        borderBottom: `2px solid ${service.color}20`,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: service.color, mr: 2 }}>
            {service.icon}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
              {service.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {service.summary}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant={isMobile ? 'fullWidth' : 'standard'}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                minHeight: 48,
              },
            }}
          >
            <Tab 
              icon={<BusinessIcon />} 
              label={t('homepage.ui.success-cases', '成功案例')} 
              iconPosition="start"
            />
            <Tab 
              icon={<AssessmentIcon />} 
              label={t('homepage.ui.service-results', '服務成果')} 
              iconPosition="start"
            />
            <Tab 
              icon={<TimelineIcon />} 
              label={t('homepage.ui.application-process', '申請流程')} 
              iconPosition="start"
            />
          </Tabs>
        </Box>

        <Box sx={{ p: 3 }}>
          {/* 案例分頁 */}
          {activeTab === 0 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 3, color: service.color, fontWeight: 700 }}>
                💼 {t('homepage.ui.case-showcase', '成功案例展示')}
              </Typography>
              <Grid container spacing={3}>
                {service.cases?.map((caseItem: any, index: number) => (
                  <Grid key={index} size={{ xs: 12, md: 6 }}>
                    <Card sx={{ 
                      height: '100%',
                      border: `2px solid ${service.color}20`,
                      '&:hover': {
                        border: `2px solid ${service.color}`,
                        transform: 'translateY(-4px)',
                        boxShadow: `0 8px 24px ${service.color}30`,
                      },
                      transition: 'all 0.3s ease',
                    }}>
                      {caseItem.image && (
                        <CardMedia
                          component="img"
                          height="200"
                          image={caseItem.image}
                          alt={caseItem.title}
                          sx={{ objectFit: 'cover' }}
                        />
                      )}
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: service.color }}>
                          {caseItem.company || caseItem.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontWeight: 600 }}>
                          {caseItem.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                          {caseItem.summary}
                        </Typography>
                        {caseItem.description && (
                          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.6 }}>
                            {caseItem.description}
                          </Typography>
                        )}
                        {caseItem.features && (
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                              🌟 {t('homepage.ui.feature-highlights', '特色亮點：')}
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                              {caseItem.features.map((feature: string, idx: number) => (
                                <Chip
                                  key={idx}
                                  label={feature}
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    borderColor: service.color,
                                    color: service.color,
                                  }}
                                />
                              ))}
                            </Stack>
                          </Box>
                        )}
                        {caseItem.results && (
                          <Box sx={{ 
                            p: 2, 
                            bgcolor: `${service.color}05`, 
                            borderRadius: 2,
                            border: `1px solid ${service.color}20`,
                          }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: service.color }}>
                              📊 {t('homepage.ui.specific-results', '具體成果：')}
                            </Typography>
                            <Stack spacing={0.5}>
                              {caseItem.results.map((result: string, idx: number) => (
                                <Box key={idx} sx={{ display: 'flex', alignItems: 'center' }}>
                                  <CheckCircleIcon sx={{ color: service.color, mr: 1, fontSize: 16 }} />
                                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {result}
                                  </Typography>
                                </Box>
                              ))}
                            </Stack>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* 成果分頁 */}
          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 3, color: service.color, fontWeight: 700 }}>
                📊 {t('homepage.ui.service-results-stats', '服務成果統計')}
              </Typography>
              <Grid container spacing={3}>
                {service.results?.map((result: any, index: number) => (
                  <Grid key={index} size={{ xs: 12, md: 6 }}>
                    <Card sx={{ 
                      p: 3,
                      bgcolor: `${service.color}05`,
                      border: `2px solid ${service.color}20`,
                      borderRadius: 3,
                    }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: service.color }}>
                        {result.title}
                      </Typography>
                      {result.items && (
                        <Stack spacing={1} sx={{ mb: 2 }}>
                          {result.items.map((item: string, idx: number) => (
                            <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <CheckCircleIcon sx={{ color: service.color, mr: 1, mt: 0.5, fontSize: 20 }} />
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {item}
                              </Typography>
                            </Box>
                          ))}
                        </Stack>
                      )}
                      {result.statistics && (
                        <Box sx={{ 
                          p: 2, 
                          bgcolor: 'white', 
                          borderRadius: 2,
                          border: `1px solid ${service.color}30`,
                        }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: service.color }}>
                            📈 {t('homepage.ui.quantitative-indicators', '量化指標：')}
                          </Typography>
                          <Grid container spacing={2}>
                            {result.statistics.map((stat: any, idx: number) => (
                              <Grid key={idx} size={{ xs: 12, sm: 4 }}>
                                <Box sx={{ textAlign: 'center', p: 1 }}>
                                  <Typography variant="h4" sx={{ fontWeight: 700, color: service.color, mb: 0.5 }}>
                                    {stat.value}
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                    {stat.label}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    {stat.unit}
                                  </Typography>
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      )}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* 流程分頁 */}
          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 3, color: service.color, fontWeight: 700 }}>
                🔄 {t('homepage.ui.application-process', '申請流程說明')}
              </Typography>
              <Grid container spacing={3}>
                {service.processes?.map((process: any, index: number) => (
                  <Grid key={index} size={{ xs: 12, md: 6 }}>
                    <Card sx={{ 
                      p: 3,
                      bgcolor: `${service.color}05`,
                      border: `2px solid ${service.color}20`,
                      borderRadius: 3,
                      height: '100%',
                    }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: service.color }}>
                        {process.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        {process.summary || process.note}
                      </Typography>
                      
                      {process.duration && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: service.color, mb: 0.5 }}>
                            ⏱️ {t('homepage.ui.estimated-duration', '預計時程：')}
                          </Typography>
                          <Chip 
                            label={process.duration} 
                            size="small" 
                            sx={{ 
                              bgcolor: service.color, 
                              color: 'white',
                              fontWeight: 600,
                            }} 
                          />
                        </Box>
                      )}

                      {process.requirements && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: service.color, mb: 1 }}>
                            📋 {t('homepage.ui.required-documents', '所需文件：')}
                          </Typography>
                          <Stack spacing={0.5}>
                            {process.requirements.map((req: string, idx: number) => (
                              <Box key={idx} sx={{ display: 'flex', alignItems: 'center' }}>
                                <CheckCircleIcon sx={{ color: service.color, mr: 1, fontSize: 16 }} />
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                  {req}
                                </Typography>
                              </Box>
                            ))}
                          </Stack>
                        </Box>
                      )}

                      {process.process && (
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: service.color, mb: 1 }}>
                            🔄 {t('homepage.ui.process-steps', '流程步驟：')}
                          </Typography>
                          <Stack spacing={1}>
                            {process.process.map((step: string, idx: number) => (
                              <Box key={idx} sx={{ 
                                display: 'flex', 
                                alignItems: 'flex-start', 
                                p: 1.5,
                                bgcolor: 'white',
                                borderRadius: 1,
                                border: `1px solid ${service.color}20`,
                              }}>
                                <Box sx={{ 
                                  width: 24, 
                                  height: 24, 
                                  borderRadius: '50%', 
                                  bgcolor: service.color, 
                                  color: 'white',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mr: 1.5,
                                  mt: 0.5,
                                  fontSize: '0.75rem',
                                  fontWeight: 600,
                                }}>
                                  {idx + 1}
                                </Box>
                                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
                                  {step}
                                </Typography>
                              </Box>
                            ))}
                          </Stack>
                        </Box>
                      )}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: `1px solid ${service.color}20` }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: service.color,
            color: service.color,
            '&:hover': {
              bgcolor: `${service.color}10`,
            },
          }}
        >
{t('homepage.ui.close', '關閉')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const EnhancedServicesSection: React.FC = () => {
  const [activeService, setActiveService] = useState(0);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { t, i18n } = useTranslation();

  // 監聽語言變化，強制重新渲染
  useEffect(() => {
    const handleLanguageChange = () => {
      // 強制重新渲染組件
      setActiveService(prev => prev);
    };

    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  // 服務資料配置
  const serviceData = [
    {
      id: 'agriculture',
      title: t('homepage.services.agriculture.title', '農業經營與創新轉型'),
      summary: t('homepage.services.agriculture.summary', '賦能農企業，整合 AI、數位科技與永續思維，加速農業數位轉型，開創產業新未來'),
      icon: <AgricultureIcon />,
      color: '#4caf50',
      features: [
        t('homepage.services.agriculture.features.0', '科技農企業輔導'),
        t('homepage.services.agriculture.features.1', '農村產業發展'),
        t('homepage.services.agriculture.features.2', '產銷履歷輔導'),
        t('homepage.services.agriculture.features.3', '永續農業轉型')
      ],
      achievements: [
        t('homepage.services.agriculture.achievements.0', '累計輔導農企業超過500家'),
        t('homepage.services.agriculture.achievements.1', '培訓產銷履歷輔導員240人次'),
        t('homepage.services.agriculture.achievements.2', '推動農業碳盤查與低碳化')
      ],
      contact: t('homepage.services.agriculture.contact', '朱經理'),
      phone: t('homepage.services.agriculture.phone', '02-23911368#8842'),
      images: [
        require('../assets/img/services/農村社企與區域產業/1.jpg'),
        require('../assets/img/services/農村社企與區域產業/2.jpg'),
        require('../assets/img/services/農村社企與區域產業/3.jpg'),
      ],
      cases: [
        {
          company: t('homepage.services.agriculture.cases.0.company', '科技農企業輔導'),
          services_item: t('homepage.services.agriculture.cases.0.services_item', '科技農企業輔導'),
          title: t('homepage.services.agriculture.cases.0.title', '產業翻轉 農企整合提高競爭力 '),
          summary: t('homepage.services.agriculture.cases.0.summary', '面對環境變遷與產業升級，團隊協助科技農企業以「數位 × 永續」雙軸轉型，整合產官學研資源，從分級輔導、人才培力、標竿擴散三面向推動轉型。'),
          description: t('homepage.services.agriculture.cases.0.description', '輔導依企業規模與階段，提供專業診斷與業師陪跑，導入數位管理和永續策略，培養自主改善能力。人才培力以 AMMOT+、AMEP+ 進階班為核心，培養中高階整合型人才，注入產業新動能。標竿擴散則透過菁創獎遴選與成果展示，推廣優良實踐案例，促進跨業交流與共學，帶動創新持續擴散，助力農企業穩健邁向永續發展。'),
          features: [
            t('homepage.services.agriculture.cases.0.features.0', '建立碳與能源管理底座'),
            t('homepage.services.agriculture.cases.0.features.1', '生產現場精實改善'),
            t('homepage.services.agriculture.cases.0.features.2', '供應鏈對話更具信任')
          ],
          results: [
            t('homepage.services.agriculture.cases.0.results.0', '推動永續低碳與數位轉型'),
            t('homepage.services.agriculture.cases.0.results.1', '品牌重塑與市場再定位'),
            t('homepage.services.agriculture.cases.0.results.2', '標竿企業創新擴散'),
            t('homepage.services.agriculture.cases.0.results.3', '強化營運體質與人才培育'),
          ],
          image: require('../assets/img/services/農村社企與區域產業/1.jpg')
        },
        {
          company: t('homepage.services.agriculture.cases.1.company', '國產雜糧'),
          services_item: t('homepage.services.agriculture.cases.1.services_item', '國產雜糧'),
          title: t('homepage.services.agriculture.cases.1.title', '鎖定青壯年客群，以創新行銷推廣健康雜糧，提升認同與銷量，促進產業永續。 '),
          summary: t('homepage.services.agriculture.cases.1.summary', '為推廣國產雜糧，團隊攜手高雄知名品牌「不二緻果」舉辦創意烘焙競賽，吸引業界專業人才參與，並將金獎作品「紅藜卡滋」成功商品化於門市及官網販售。'),
          description: t('homepage.services.agriculture.cases.1.description', '活動強化專業對在地食材的認識，透過後續行銷提升產品曝光、銷量與品牌價值。行銷策略聚焦45歲以上健康意識族群，與里仁、Curves等健康品牌合作，進行聯名及通路導入，並透過健康主題活動加深消費者對國產雜糧的信任。全通路行銷結合線上與線下，運用數據分析提升精準度，並協助供應商開發新品，確保產品品質與穩定供應，有效推動國產雜糧市場擴展。'),
          features: [
            t('homepage.services.agriculture.cases.1.features.0', '品牌識別建立'),
            t('homepage.services.agriculture.cases.1.features.1', '數位行銷推廣'),
            t('homepage.services.agriculture.cases.1.features.2', '產銷履歷追蹤')
          ],
          results: [
            t('homepage.services.agriculture.cases.1.results.0', '營業額達1,530萬元'),
            t('homepage.services.agriculture.cases.1.results.1', '紅豆用量突破8公噸'),
            t('homepage.services.agriculture.cases.1.results.2', '行銷健康，拓展樂齡族群'),
            t('homepage.services.agriculture.cases.1.results.3', '收集回饋，助產業永續'),
          ],
          image: require('../assets/img/services/農村社企與區域產業/2.jpg')
        },
        {
          company: t('homepage.services.agriculture.cases.2.company', '農糧類產銷履歷輔導員'),
          services_item: t('homepage.services.agriculture.cases.2.services_item', '農糧類產銷履歷輔導員'),
          title: t('homepage.services.agriculture.cases.2.title', '接軌國際食安，我們培育專業輔導員，落實產銷履歷驗證，並嚴格品管，鞏固制度'),
          summary: t('homepage.services.agriculture.cases.2.summary', '輔導員課程分為線上初階、進階課程與測驗，通過後可獲「實習輔導員」資格，並於一年內完成跟案並考核合格者，取得正式輔導員資格。'),
          description: t('homepage.services.agriculture.cases.2.description', '如以同過培訓的產銷履歷輔導員-林育賢於雲林水林鄉協助經營者解決驗證問題，詳細說明制度核心、法規及TGAP技術，並提供兩次免費現場輔導，協助業者落實「說、寫、做」一致。經專業諮詢與流程指導，申請人已掌握驗證規範，並準備完成申請，顯示輔導成效。'),
          features: [
            t('homepage.services.agriculture.cases.2.features.0', '專業輔導體系'),
            t('homepage.services.agriculture.cases.2.features.1', '強化派案流程'),
            t('homepage.services.agriculture.cases.2.features.2', '擴大驗證面積')
          ],
          results: [
            t('homepage.services.agriculture.cases.2.results.0', '產銷履歷輔導員培訓 240 人次，執行輔導派案 201 案'),
            t('homepage.services.agriculture.cases.2.results.1', '透過「輔導員資訊整合平台」優化派案、紀錄與溝通效率'),
            t('homepage.services.agriculture.cases.2.results.2', '推動輔導員派案作業，強化產銷履歷輔導能量，擴大推廣效益'),
            t('homepage.services.agriculture.cases.2.results.3', '協助農產品經營者認識產銷履歷驗證，擴大產銷履歷驗證面積')
          ],
          image: require('../assets/img/services/農業創新組/農糧類產銷履歷輔導員回訓課程.jpg')
        },
        {
          company: t('homepage.services.agriculture.cases.3.company', '農村社企與地方產業'),
          services_item: t('homepage.services.agriculture.cases.3.services_item', '農村社企與地方產業'),
          title: t('homepage.services.agriculture.cases.3.title', '整合地方DNA，跨域永續加值，共創農村新經濟'),
          summary: t('homepage.services.agriculture.cases.3.summary', '輔導臺灣農村企業與地方產業，推動轉型與加值。'),
          description: t('homepage.services.agriculture.cases.3.description', '跳脫傳統農業生產，轉而強調「跨域整合」、「永續經營（ESG）」與「品牌價值」。案例包括：臺南分署推動的跨縣市「低碳永續旅遊」；南臺灣的「雙黑金計畫」將可可與咖啡透過設計、品牌故事與碳足跡管理，打入精品市場；以及臺東採用「中心－衛星工廠」模式，整合紅烏龍、米製品等產業，共享行銷資源並拓展國際通路。期望能提升地方產業的競爭力，將農產品轉型為兼具文化、設計與永續理念的商品，並藉此促進青年返鄉、活絡社區經濟循環。'),
          features: [
            t('homepage.services.agriculture.cases.3.features.0', '跨區整合推動低碳旅遊'),
            t('homepage.services.agriculture.cases.3.features.1', '在地加值打造精品品牌'),
            t('homepage.services.agriculture.cases.3.features.2', '運用ESG拓展國內外通路')
          ],
          results: [
            t('homepage.services.agriculture.cases.3.results.0', '串聯逾150家業者，活絡跨區經濟'),
            t('homepage.services.agriculture.cases.3.results.1', '輔導女性創業，強化青年返鄉能量'),
            t('homepage.services.agriculture.cases.3.results.2', '拓展國際通路，助業者進軍東南亞'),
            t('homepage.services.agriculture.cases.3.results.3', '連結企業福委會，開拓高端旅遊市場')
          ],
          image: require('../assets/img/services/農業創新組/農村社企與地方產業.webp')
        }
      ],
      results: (() => {
        const resultsData = t('homepage.services.agriculture.results', { returnObjects: true });
        return Array.isArray(resultsData) ? resultsData : [
          {
            title: '分級輔導成果',
            items: [
              '營運體質強化：流程更順、損耗下降、關鍵指標可視化',
              '數位化落地：從表單到系統化（ERP／BI／IoT）',
              '永續精實：以「揭露→減量→中和」帶動節能、減廢、循環再利用'
            ],
            statistics: [
              { label: '輔導企業數', value: '500+', unit: '家' },
              { label: '培訓人次', value: '240', unit: '人次' },
              { label: '碳盤查完成', value: '150', unit: '家' }
            ]
          },
          {
            title: '人才培力成果',
            items: [
              '聚焦實務：策略×智財×數據×永續的模組化學習',
              '即學即用：學員以企業命題完成行動方案',
              '跨域連結：建立人脈與案例交換機制'
            ],
            statistics: [
              { label: '培訓課程', value: '15', unit: '場' },
              { label: '學員人數', value: '300+', unit: '人' },
              { label: '行動方案', value: '50+', unit: '件' }
            ]
          },
          {
            title: '標竿擴散成果',
            items: [
              '標竿可複製：以得獎與入圍案例沉澱「做法＋工具＋指標」',
              '口碑與能見度：專刊、網站與媒體露出',
              '從「專案」到「常態」：把數位與永續變成日常管理'
            ],
            statistics: [
              { label: '菁創獎得主', value: '20', unit: '家' },
              { label: '媒體露出', value: '50+', unit: '次' },
              { label: '專刊發行', value: '3', unit: '期' }
            ]
          }
        ];
      })(),
      processes: (() => {
        const processesData = t('homepage.services.agriculture.processes', { returnObjects: true });
        return Array.isArray(processesData) ? processesData : [
          {
            title: '分級輔導流程',
            summary: '從需求評估到成果追蹤的完整輔導流程',
            process: [
              '線上提出需求 → 填寫基本資料與挑戰',
              '訪視與診斷 → 顧問＋業師進場，聚焦核心課題',
              '提案與審查 → 擬定工項與KPI，確認可行性',
              '執行陪跑 → 導入數位/AI、永續精實與管理機制',
              '成果展示與追蹤 → 成效檢核、擴散分享'
            ],
            duration: '6-12個月',
            requirements: [
              '企業基本資料',
              '現況分析報告',
              '改善目標設定'
            ]
          },
          {
            title: '人才培力流程',
            summary: 'AMMOT+及AMEP+專業人才培訓',
            process: [
              '線上報名 → 填寫報名表與企業背景',
              '資格審查 → 評估學習動機與企業需求',
              '公告錄取 → 通知錄取結果與課程安排',
              '註冊繳費 → 完成報名手續',
              '開課學習 → 模組化課程與實務演練',
              '行動方案 → 以企業命題完成實作',
              '成果發表 → 分享學習成果與應用'
            ],
            duration: '3-6個月',
            requirements: [
              '中高階管理人員',
              '相關工作經驗',
              '企業推薦信'
            ]
          },
          {
            title: '菁創獎申請流程',
            summary: '表揚創新研發與科技應用的優秀農企業',
            process: [
              '報名投件 → 填寫申請表與提交相關文件',
              '書面審查 → 專家評審書面資料',
              '實地複審 → 委員實地訪查或線上審查',
              '決審評選 → 最終評審與排名',
              '頒獎典禮 → 公開表揚與媒體宣傳',
              '專刊製作 → 收錄得獎案例與經驗分享'
            ],
            duration: '4-6個月',
            requirements: [
              '創新技術證明',
              '成果數據',
              '推廣計畫'
            ]
          }
        ];
      })(),
      content: null,
    },
    {
      id: 'healthcare',
      title: t('homepage.services.healthcare.title', '健康照護'),
      summary: t('homepage.services.healthcare.summary', '促進全民健康與打造智慧照護體系，結合醫療機構、產業與社區'),
      icon: <HealthIcon />,
      color: '#2196f3',
      features: [
        t('homepage.services.healthcare.features.0', '長期照顧服務'),
        t('homepage.services.healthcare.features.1', '健康照護評鑑'),
        t('homepage.services.healthcare.features.2', '運動科技應用'),
        t('homepage.services.healthcare.features.3', '智慧醫療整合')
      ],
      achievements: [
        t('homepage.services.healthcare.achievements.0', '辦理健康活動數百場'),
        t('homepage.services.healthcare.achievements.1', '培訓專業人員上千名'),
        t('homepage.services.healthcare.achievements.2', '評鑑護理之家920家次')
      ],
      contact: t('homepage.services.healthcare.contact', '陳經理'),
      phone: t('homepage.services.healthcare.phone', '02-23911368#1189'),
      images: [
        require('../assets/img/services/健康照護-長期照顧/106-107全國性長照業務聯繫會議暨表揚大會.jpg'),
        require('../assets/img/services/健康照護-運動科技/sports-forum-2020.jpg'),
        require('../assets/img/services/健康照護(NANA)/健康照護(NANA)_1.jpg'),
      ],
      cases: [
        {
          company: t('homepage.services.healthcare.cases.0.company', '中化生醫'),
          services_item: t('homepage.services.healthcare.cases.0.services_item', '產業營運模式輔導'),
          title: t('homepage.services.healthcare.cases.0.title', '中化優質居家照顧服務網絡推動發展計畫'),
          summary: t('homepage.services.healthcare.cases.0.summary', '輔導建立優質居家照顧服務網絡，提升長照服務品質與效率'),
          description: t('homepage.services.healthcare.cases.0.description', '協助中化生醫建立完整的居家照顧服務網絡，透過標準化流程、專業培訓與品質監控，提升長照服務的專業水準與服務效率。建立從申請到服務完成的完整流程，確保服務品質的一致性。'),
          features: [
            t('homepage.services.healthcare.cases.0.features.0', '建立服務網絡'),
            t('homepage.services.healthcare.cases.0.features.1', '提升服務品質'),
            t('homepage.services.healthcare.cases.0.features.2', '優化服務效率')
          ],
          results: [
            t('homepage.services.healthcare.cases.0.results.0', '服務覆蓋率提升60%'),
            t('homepage.services.healthcare.cases.0.results.1', '服務滿意度達95%'),
            t('homepage.services.healthcare.cases.0.results.2', '服務效率提升40%')
          ],
          image: require('../assets/img/services/健康照護-長期照顧/106-107全國性長照業務聯繫會議暨表揚大會.jpg')
        },
        {
          company: t('homepage.services.healthcare.cases.1.company', '敏盛醫控'),
          services_item: t('homepage.services.healthcare.cases.1.services_item', '敏盛醫控'),
          title: t('homepage.services.healthcare.cases.1.title', '全天候貼心安養連鎖服務模式'),
          summary: t('homepage.services.healthcare.cases.1.summary', '推動全天候貼心安養連鎖服務模式，提供更完善的長照服務'),
          description: t('homepage.services.healthcare.cases.1.description', '協助敏盛醫控建立全天候的安養服務模式，透過連鎖經營與標準化管理，提供24小時不間斷的照護服務。整合醫療資源與社區服務，建立完整的照護生態系統。'),
          features: [
            t('homepage.services.healthcare.cases.1.features.0', '全天候服務'),
            t('homepage.services.healthcare.cases.1.features.1', '連鎖服務模式'),
            t('homepage.services.healthcare.cases.1.features.2', '貼心安養服務')
          ],
          results: [
            t('homepage.services.healthcare.cases.1.results.0', '服務時間延長至24小時'),
            t('homepage.services.healthcare.cases.1.results.1', '連鎖據點增加至15家'),
            t('homepage.services.healthcare.cases.1.results.2', '服務品質評鑑優等')
          ],
          image: require('../assets/img/services/健康照護-長期照顧/long-term-care-2019.JPG')
        },
        {
          company: t('homepage.services.healthcare.cases.2.company', '運動科技應用'),
          services_item: t('homepage.services.healthcare.cases.2.services_item', '運動科技應用'),
          title: t('homepage.services.healthcare.cases.2.title', '智慧健康管理平台'),
          summary: t('homepage.services.healthcare.cases.2.summary', '結合穿戴裝置與AI分析，建立個人化健康管理系統'),
          description: t('homepage.services.healthcare.cases.2.description', '運用最新的運動科技，包括穿戴裝置、AI骨架分析、步態分析等技術，建立個人化的健康管理平台。透過數據收集與分析，提供精準的健康建議與運動指導。'),
          features: [
            t('homepage.services.healthcare.cases.2.features.0', '穿戴裝置整合'),
            t('homepage.services.healthcare.cases.2.features.1', 'AI健康分析'),
            t('homepage.services.healthcare.cases.2.features.2', '個人化建議')
          ],
          results: [
            t('homepage.services.healthcare.cases.2.results.0', '累計服務13,000人'),
            t('homepage.services.healthcare.cases.2.results.1', '互動人次496,000次'),
            t('homepage.services.healthcare.cases.2.results.2', '健康指標改善率80%')
          ],
          image: require('../assets/img/services/健康照護-運動科技/sports-tech-2024.jpg')
        }
      ],
      results: [
        {
          title: '基礎網絡建構成果',
          items: [
            '完成全國照管中心輔導及實地訪視，全面建立在地服務',
            '專業人力培訓：辦理43場照管專業課程與工作坊，累計培訓約2,000人次以上',
            '管理指標：累計研發與推動照顧服務指標與照管品質與考評指標（各10項）'
          ],
          statistics: [
            { label: '照管中心', value: '22', unit: '縣市' },
            { label: '培訓人次', value: '2,000+', unit: '人' },
            { label: '管理指標', value: '20', unit: '項' }
          ]
        },
        {
          title: '技術應用與服務量化成果',
          items: [
            '技術導入：廣泛運用穿戴裝置、AI骨架及步態分析、以及Line數據平台等技術',
            '聚焦三大健康主題：體位管理、健康體能促進及長者健康促進',
            '服務量能擴大：累計推動14個縣市共50處多元場域導入創新運動科技設備'
          ],
          statistics: [
            { label: '服務縣市', value: '14', unit: '縣市' },
            { label: '服務場域', value: '50', unit: '處' },
            { label: '服務人數', value: '13,000', unit: '人' }
          ]
        },
        {
          title: '護理之家評鑑成果',
          items: [
            '評鑑制度創新：從五大面向128個指標簡化至四大面向14個指標',
            '專業精進：著重全人照護、護理過程邏輯、感染控制等訓練',
            '作業E化：建立護理之家照護管理系統，提升評鑑效率'
          ],
          statistics: [
            { label: '評鑑機構', value: '920', unit: '家次' },
            { label: '評鑑指標', value: '14', unit: '項' },
            { label: '系統建置', value: '100%', unit: '完成率' }
          ]
        }
      ],
      processes: [
        {
          title: '顧問輔導流程',
          summary: '提供資源申請、諮詢服務、訪視診斷、經營輔導、營運模式輔導',
          process: [
            '資源申請協助 → 協助申請政府補助與資源',
            '諮詢服務提供 → 專業顧問提供諮詢服務',
            '訪視診斷執行 → 實地訪視與現況診斷',
            '經營輔導規劃 → 制定改善計畫與輔導方案',
            '營運模式輔導 → 建立可持續的營運模式'
          ],
          duration: '3-12個月',
          requirements: ['機構基本資料', '現況分析報告', '改善需求說明']
        },
        {
          title: '評鑑作業流程',
          summary: '護理之家評鑑制度創新變革',
          process: [
            '評鑑作業啟動 → 公告評鑑時程與標準',
            '衛生局初審 → 地方政府初步審查',
            '評鑑資料線上檢核 → 線上系統資料檢核',
            '評鑑委員實地訪查 → 委員實地評鑑',
            '夜間災害情境模擬演練 → 緊急應變能力測試',
            '成績評定及確認 → 評分與結果確認',
            '製發評鑑合格證書 → 發放合格證書'
          ],
          duration: '6-12個月',
          requirements: ['評鑑申請表', '營運資料', '人員證照']
        },
        {
          title: '運動科技應用流程',
          summary: '推動運動科技在健康照護中的應用',
          process: [
            '需求評估 → 評估場域需求與技術可行性',
            '設備導入 → 安裝運動科技設備',
            '人員培訓 → 培訓操作人員與管理人員',
            '試營運 → 小規模試營運與調整',
            '正式營運 → 全面推廣與服務',
            '成效追蹤 → 持續監控與改善'
          ],
          duration: '3-6個月',
          requirements: ['場域評估', '設備需求', '人員培訓']
        }
      ],
      content: null,
    },
    {
      id: 'indigenous',
      title: t('homepage.services.indigenous.title', '原民經濟永續發展'),
      summary: t('homepage.services.indigenous.summary', '型塑全國最大原民通路品牌LiMA、發展部落產業升級、強化原民合作社經營基礎'),
      icon: <PublicIcon />,
      color: '#ff9800',
      features: [
        t('homepage.services.indigenous.features.0', 'LiMA通路品牌'),
        t('homepage.services.indigenous.features.1', '原民商品推廣'),
        t('homepage.services.indigenous.features.2', '部落產業輔導'),
        t('homepage.services.indigenous.features.3', '文化永續發展')
      ],
      achievements: [
        t('homepage.services.indigenous.achievements.0', '建立全國最大原民通路'),
        t('homepage.services.indigenous.achievements.1', '推動原民企業SDGs'),
        t('homepage.services.indigenous.achievements.2', '強化永續經營能量')
      ],
      contact: t('homepage.services.indigenous.contact', '劉經理'),
      phone: t('homepage.services.indigenous.phone', '02-23911368#1382'),
      images: [
        require('../assets/img/services/原民通路與產業/LiMA照片.jpg'),
        require('../assets/img/services/健康照護(NANA)/健康照護(NANA)_2.jpg'),
        require('../assets/img/services/健康照護(NANA)/健康照護(NANA)_3.jpg'),
      ],
      cases: [
        {
          company: t('homepage.services.indigenous.cases.0.company', 'LiMA原民通路'),
          services_item: t('homepage.services.indigenous.cases.0.services_item', 'LiMA原民通路'),
          title: t('homepage.services.indigenous.cases.0.title', '全台最大原住民族商品通路品牌'),
          summary: t('homepage.services.indigenous.cases.0.summary', '品牌名取自南島語族共通詞彙中的數字「五」，象徵來自各地的原住民族一起牽起彼此的手'),
          description: t('homepage.services.indigenous.cases.0.description', 'LiMA是原住民族委員會成立的通路品牌，致力於推廣原住民族商品與文化。透過線上線下整合的銷售模式，建立完整的商品供應鏈，讓原住民族的優質商品能夠被更多人認識與購買。'),
          features: [
            t('homepage.services.indigenous.cases.0.features.0', '持續厚植原民業者及商品'),
            t('homepage.services.indigenous.cases.0.features.1', '拓展海內外多元市場接觸點'),
            t('homepage.services.indigenous.cases.0.features.2', '推動LiMA原力永續獎活動')
          ],
          results: [
            t('homepage.services.indigenous.cases.0.results.0', '合作業者超過200家'),
            t('homepage.services.indigenous.cases.0.results.1', '商品種類超過1,000種'),
            t('homepage.services.indigenous.cases.0.results.2', '年營業額成長30%')
          ],
          image: require('../assets/img/services/原民通路與產業/LiMA照片.jpg')
        },
        {
          company: t('homepage.services.indigenous.cases.1.company', '部落產業升級'),
          services_item: t('homepage.services.indigenous.cases.1.services_item', '部落產業升級'),
          title: t('homepage.services.indigenous.cases.1.title', '型塑部落產業示範亮點'),
          summary: t('homepage.services.indigenous.cases.1.summary', '透過輔導與管考部落產業升級計畫案，經由訪視、分區工作坊、產業座談會等輔導作為，挖掘具多元發展潛力之區域型產業'),
          description: t('homepage.services.indigenous.cases.1.description', '型塑部落產業示範亮點，整合原民產業之特色農業、部落旅遊產業價值鏈，朝向六級產業化發展，為原民經濟產業邁向永續發展奠基與深耕。'),
          features: [
            t('homepage.services.indigenous.cases.1.features.0', '合作社組織建立'),
            t('homepage.services.indigenous.cases.1.features.1', '文化產業化'),
            t('homepage.services.indigenous.cases.1.features.2', '永續經營模式')
          ],
          results: [
            t('homepage.services.indigenous.cases.1.results.0', '創造6億1,568萬元的產值'),
            t('homepage.services.indigenous.cases.1.results.1', '提供1,313個就業機會'),
            t('homepage.services.indigenous.cases.1.results.2', '輔導族人取得專業證照達566人'),
            t('homepage.services.indigenous.cases.1.results.3', '人才培育8,065人次')
          ],
          image: require('../assets/img/services/原民通路與產業/部落產業合作社.jpg')
        },
        {
          company: t('homepage.services.indigenous.cases.2.company', '原住民族合作社'),
          services_item: t('homepage.services.indigenous.cases.2.services_item', '原住民族合作社'),
          title: t('homepage.services.indigenous.cases.2.title', '強化原合社經營發展基礎'),
          summary: t('homepage.services.indigenous.cases.2.summary', '落實提供原住民族合作社全面諮詢、診斷與輔導服務，包含辦理線上諮詢會議及實地輔導訪視'),
          description: t('homepage.services.indigenous.cases.2.description', '建立與各社場之初步連結與溝通管道，依實際運作情況提出問題診斷與策略建議；辦理合作社研習課程，促進社場間的經驗交流與能力提升；以及規劃行銷展售活動，提高社場產品與服務之曝光度與市場能見度，全面強化合作社的經營發展基礎。'),
          features: [
            t('homepage.services.indigenous.cases.2.features.0', '諮詢診斷與實地輔導'),
            t('homepage.services.indigenous.cases.2.features.1', '研習課程與經驗交流'),
            t('homepage.services.indigenous.cases.2.features.2', '行銷展售與市場拓展')
          ],
          results: [
            t('homepage.services.indigenous.cases.2.results.0', '輔導合作社15家'),
            t('homepage.services.indigenous.cases.2.results.1', '就業機會增加200個'),
            t('homepage.services.indigenous.cases.2.results.2', '文化傳承率提升50%')
          ],
          image: require('../assets/img/services/原民通路與產業/原民商品設計.jpg')
        }
      ],
      results: [
        {
          title: '通路建構成果',
          items: [
            '建立全國最大原民通路',
            '推動原民企業SDGs',
            '強化永續經營能量'
          ],
          statistics: [
            { label: '合作業者', value: '200+', unit: '家' },
            { label: '商品種類', value: '1,000+', unit: '種' },
            { label: '營業額成長', value: '30%', unit: '年成長率' }
          ]
        },
        {
          title: '部落產業輔導成果',
          items: [
            '協助部落建立合作社組織',
            '推動文化產業化發展',
            '建立永續經營模式'
          ],
          statistics: [
            { label: '輔導合作社', value: '15', unit: '家' },
            { label: '就業機會', value: '200+', unit: '個' },
            { label: '文化傳承率', value: '50%', unit: '提升' }
          ]
        },
        {
          title: '文創商品開發成果',
          items: [
            '結合傳統文化與現代設計',
            '提升原民業者設計能力',
            '拓展商品市場通路'
          ],
          statistics: [
            { label: '商品設計', value: '100+', unit: '件' },
            { label: '設計師培訓', value: '50', unit: '人' },
            { label: '銷售成長', value: '40%', unit: '年成長率' }
          ]
        }
      ],
      processes: [
        {
          title: '審查流程',
          summary: '開放報名，一律採紙本郵寄報名作業',
          process: [
            '尚未合作者：須填寫申請表、提交繳交資料進行初審資格',
            '已合作業者：須補件填寫合作同意書後續進行審核'
          ],
          duration: '1-2週',
          requirements: ['申請表', '基本資料', '商品樣品']
        },
        {
          title: '資格審查',
          summary: '收到報名資料後，由工作小組進行資格審查',
          process: [
            '收到報名資料後，由工作小組進行資格審查，符合資格者通過初審',
            '文件不齊者，應於工作小組通知後7日內補件，惟補件資料以一次為限'
          ],
          duration: '1週',
          requirements: ['完整申請資料', '商品品質證明', '原民身份證明']
        },
        {
          title: '商品審查',
          summary: '通過資格查核後，進行商品審查與評估',
          process: [
            '商品品質檢核 → 檢查商品品質與安全性',
            '文化特色評估 → 評估商品的文化價值',
            '市場競爭力分析 → 分析商品市場潛力',
            '審查結果通知 → 通知審查結果與後續作業'
          ],
          duration: '2-3週',
          requirements: ['商品樣品', '品質證明', '文化說明']
        },
        {
          title: '進駐合作',
          summary: '簽訂合作同意書，完成商品上架',
          process: [
            '簽訂進駐合作同意書 → 確認合作條件與權利義務',
            '商品上架作業 → 完成商品資料建檔與上架',
            '系統功能設定 → 設定商品管理與銷售功能',
            '後續營運支援 → 提供營運指導與技術支援'
          ],
          duration: '1-2週',
          requirements: ['合作同意書', '商品資料', '營運計畫']
        }
      ],
      content: null,
    },
    {
      id: 'sustainability',
      title: t('homepage.services.sustainability.title', '前瞻永續'),
      summary: t('homepage.services.sustainability.summary', '因應全球氣候變遷與國際淨零趨勢，協助政府推動永續政策'),
      icon: <TrendingUpIcon />,
      color: '#9c27b0',
      features: [
        t('homepage.services.sustainability.features.0', '農業淨零國際交流'),
        t('homepage.services.sustainability.features.1', '淨零公正轉型')
      ],
      achievements: [
        t('homepage.services.sustainability.achievements.0', '成為企業永續轉型的夥伴'),
        t('homepage.services.sustainability.achievements.1', '建立永續輔導模式'),
        t('homepage.services.sustainability.achievements.2', '推動淨零政策')
      ],
      contact: t('homepage.services.sustainability.contact', '陳經理'),
      phone: t('homepage.services.sustainability.phone', '02-23911368#1189'),
      images: [
        require('../assets/img/services/前瞻永續/前瞻永續組_淨零永續_1.jpg'),
        require('../assets/img/services/前瞻永續/前瞻永續組_淨零永續_2.jpg'),
        require('../assets/img/services/前瞻永續/前瞻永續組_淨零永續_3.png'),
      ],
      cases: [
        {
          company: t('homepage.services.sustainability.cases.0.company', '農業淨零國際交流'),
          services_item: t('homepage.services.sustainability.cases.0.services_item', '農業淨零國際交流'),
          title: t('homepage.services.sustainability.cases.0.title', '提供我國農業場域淨零碳排政策規劃參考'),
          summary: t('homepage.services.sustainability.cases.0.summary', '因應國際2050淨零碳排趨勢，農業產業鏈的各級廠商逐步進行減碳、節能、再利用以及使用潔淨能源等方式，以增加產品之市場競爭優勢。'),
          description: t('homepage.services.sustainability.cases.0.description', '為借鏡日本於實務推動之案例與思考邏輯，加速我國農企業建立低碳清潔能源供應鏈與生態系。辦理「供應鏈減碳」及「地方潔淨能源發展」2主題日本參訪研習團，供我國農企業與公部門人員，瞭解日本農政組織機構、農業清潔能源政策發展與示範場域、農業供應鏈淨零等實際規劃與執行經驗，以作為我國農業場域淨零碳排政策規劃與推動之參考。'),
          features: [
            t('homepage.services.sustainability.cases.0.features.0', 'ESG轉型輔導'),
            t('homepage.services.sustainability.cases.0.features.1', '淨零碳排策略'),
            t('homepage.services.sustainability.cases.0.features.2', '永續管理顧問'),
            t('homepage.services.sustainability.cases.0.features.3', '氣候變遷因應')
          ],
          results: [
            t('homepage.services.sustainability.cases.0.results.0', '辦理農業淨零日本參訪團2場'),
            t('homepage.services.sustainability.cases.0.results.1', '榮獲2025年「台灣農業永續合作夥伴獎」')
          ],
          image: require('../assets/img/services/前瞻永續/前瞻永續_農業淨零國際交流.jpg')
        },
        {
          company: t('homepage.services.sustainability.cases.1.company', '淨零公正轉型'),
          services_item: t('homepage.services.sustainability.cases.1.services_item', '淨零公正轉型'),
          title: t('homepage.services.sustainability.cases.1.title', '確保企業在淨零轉型過程中實現社會公平與勞工權益之保障'),
          summary: t('homepage.services.sustainability.cases.1.summary', '因應我國2022年公布臺灣2050淨零排放路徑及策略，針對台灣淨零排放的政策目標，制定出12項關鍵戰略，逐步實現2050淨零排放之永續社會。'),
          description: t('homepage.services.sustainability.cases.1.description', '推動淨零公正轉型過程中涉及的各產業利害關係人經過充分的溝通後，能因此更了解勞資雙方的需求與挑戰，提出更適合產業現況的建議，作為後續政府在制定相關政策的重要參考。協同NGO組織透過經驗交流，建立以人為本的淨零轉型社會共識、搭建跨領域對話平台，確保產業在轉型過程中實現社會公平與勞工權益的保障。'),
          features: [
            t('homepage.services.sustainability.cases.1.features.0', '智慧管理系統'),
            t('homepage.services.sustainability.cases.1.features.1', '低碳交通方案'),
            t('homepage.services.sustainability.cases.1.features.2', '綠色能源導入'),
            t('homepage.services.sustainability.cases.1.features.3', '數位行銷推廣')
          ],
          results: [
            t('homepage.services.sustainability.cases.1.results.0', '辦理產業關鍵座談及培力活動'),
            t('homepage.services.sustainability.cases.1.results.1', '完成勞動議題框架性檢核研究調查'),
            t('homepage.services.sustainability.cases.1.results.2', '辦理學術交流會與公正轉型博覽會成果'),
            t('homepage.services.sustainability.cases.1.results.3', '辦理勞動幸福與環境友善的關鍵研討會')
          ],
          image: require('../assets/img/services/前瞻永續/前瞻永續_淨零公正轉型.jpg')
        }
      ],
      results: [
        {
          title: '永續輔導成果',
          items: [
            '培養永續管理顧問人才',
            '建立永續輔導模式',
            '推動淨零政策'
          ],
          statistics: [
            { label: '顧問人才', value: '100+', unit: '人' },
            { label: '輔導模式', value: '5', unit: '種' },
            { label: '政策推動', value: '10+', unit: '項' }
          ]
        },
        {
          title: 'ESG轉型成果',
          items: [
            '協助企業建立ESG管理體系',
            '推動供應鏈永續管理',
            '建立永續報告機制'
          ],
          statistics: [
            { label: '輔導企業', value: '200+', unit: '家' },
            { label: 'ESG評級提升', value: '80%', unit: '企業' },
            { label: '永續報告', value: '150+', unit: '份' }
          ]
        },
        {
          title: '淨零政策成果',
          items: [
            '推動淨零碳排政策',
            '建立碳權交易機制',
            '推廣綠色能源'
          ],
          statistics: [
            { label: '碳盤查完成', value: '300+', unit: '家' },
            { label: '碳排減少', value: '25%', unit: '平均' },
            { label: '綠能導入', value: '50+', unit: 'MW' }
          ]
        }
      ],
      processes: [
        {
          title: 'ESG轉型輔導流程',
          summary: '協助企業進行ESG轉型',
          process: [
            'ESG現況評估 → 評估企業ESG現況與挑戰',
            '轉型策略規劃 → 制定ESG轉型策略與目標',
            '執行方案設計 → 設計具體執行方案與時程',
            '成效追蹤檢核 → 持續追蹤轉型成效與調整'
          ],
          duration: '6-18個月',
          requirements: ['企業基本資料', 'ESG現況報告', '轉型目標設定']
        },
        {
          title: '淨零碳排輔導流程',
          summary: '協助企業建立淨零碳排策略',
          process: [
            '碳盤查執行 → 建立企業碳排放基線',
            '減碳策略規劃 → 制定減碳策略與路徑',
            '技術導入 → 導入低碳技術與設備',
            '碳權交易 → 建立碳權交易機制',
            '成效驗證 → 驗證減碳成效與認證'
          ],
          duration: '12-24個月',
          requirements: ['能源使用資料', '生產流程資料', '減碳目標設定']
        },
        {
          title: '永續管理顧問培訓',
          summary: '培養永續管理顧問專業人才',
          process: [
            '基礎課程 → 永續發展基礎理論',
            '實務訓練 → 實際案例操作與演練',
            '專業認證 → 通過專業認證考試',
            '實習輔導 → 實際輔導企業案例',
            '持續進修 → 定期更新專業知識'
          ],
          duration: '6-12個月',
          requirements: ['相關學歷背景', '工作經驗證明', '學習動機說明']
        }
      ],
      content: null, // 前瞻永續內容待開發
    },
  ];

  // 直接顯示所有服務，不分頁
  const currentServices = serviceData;

  const handleServiceClick = (index: number) => {
    setActiveService(index);
    setSelectedService(serviceData[index]);
    setDialogOpen(true);
  };

  // 移除分頁相關函數，因為現在直接顯示所有服務

  // 移除鍵盤導航和觸控手勢支援，因為不再需要分頁

  return (
    <Box
      id="services"
      sx={{
        py: 8,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 背景裝飾 */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
          `,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* 標題區塊 */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 3,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              {t('homepage.services.title', '四大服務專區')}
            </Typography>
            <Box
              sx={{
                width: 120,
                height: 4,
                background: 'linear-gradient(90deg, transparent, #ffd700, transparent)',
                mx: 'auto',
                borderRadius: 2,
                mb: 3,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6,
                px: 2, // 手機版增加內邊距
              }}
            >
              {t('homepage.services.description', '提供全方位的產業輔導服務，從農業創新到健康照護，從原民產業到永續發展')}
            </Typography>
            
          </Box>

          {/* 服務卡片網格 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 3,
                  mb: 4,
                  '@media (max-width: 1400px)': {
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 2,
                  },
                  '@media (max-width: 900px)': {
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 2,
                  },
                  '@media (max-width: 600px)': {
                    gridTemplateColumns: '1fr',
                    gap: 2,
                  },
                }}
              >
                {currentServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1,
                      ease: "easeOut" 
                    }}
                  >
                    <ServiceCard
                      title={service.title}
                      summary={service.summary}
                      icon={service.icon}
                      color={service.color}
                      features={service.features}
                      achievements={service.achievements}
                      contact={service.contact}
                      phone={service.phone}
                      images={service.images}
                      cases={service.cases}
                      results={service.results}
                      processes={service.processes}
                      isActive={activeService === index}
                      onClick={() => handleServiceClick(index)}
                    />
                  </motion.div>
                ))}
              </Box>
            </motion.div>
        </motion.div>
      </Container>

      {/* 服務詳情對話框 */}
      <ServiceDetailDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        service={selectedService}
      />
    </Box>
  );
};

export default EnhancedServicesSection;