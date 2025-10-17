import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  useTheme,
  useMediaQuery,
  Paper,
  IconButton,
  Tooltip,
  Avatar,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Agriculture as AgricultureIcon,
  HealthAndSafety as HealthIcon,
  Public as PublicIcon,
  Timeline as TimelineIcon,
  CheckCircle,
  EmojiEvents,
  Business,
  SmartToy,
} from '@mui/icons-material';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const DepartmentIntro: React.FC = () => {
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);
  const [isAllExpanded, setIsAllExpanded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { t } = useTranslation();

  // 階段圖示對應
  const phaseIcons = [Business, SmartToy];
  const phaseColors = ['#667eea', '#764ba2'];

  const groupIcons = {
    [t('homepage.department-structure.groups.0.title', '農業創新組')]: <AgricultureIcon sx={{ color: '#4caf50' }} />,
    [t('homepage.department-structure.groups.1.title', '健康照護組')]: <HealthIcon sx={{ color: '#2196f3' }} />,
    [t('homepage.department-structure.groups.2.title', '原民產業組')]: <PublicIcon sx={{ color: '#ff9800' }} />,
    [t('homepage.department-structure.groups.3.title', '前瞻永續組')]: <TrendingUpIcon sx={{ color: '#9c27b0' }} />,
  };

  return (
    <Box
      id="department-intro"
      sx={{
        py: { xs: 6, md: 10 },
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* 標題區塊 */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
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
                }}
              >
                {t('homepage.department-intro.title', '部門成立背景與發展歷程')}
              </Typography>
              <Box
                sx={{
                  width: 120,
                  height: 4,
                  background: 'linear-gradient(90deg, transparent, #ffd700, transparent)',
                  mx: 'auto',
                  borderRadius: 2,
                  mb: 4,
                }}
              />
            </motion.div>
          </Box>

          {/* 成立背景 - 頂尖設計師級重新設計 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card
              sx={{
                mb: 8,
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(30px)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.08)',
                borderRadius: 6,
                border: '1px solid rgba(255, 255, 255, 0.3)',
                overflow: 'hidden',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
                  zIndex: 1,
                },
              }}
            >
              {/* 核心摘要區塊 */}
              <Box
                sx={{
                  p: { xs: 4, md: 6 },
                  background: 'linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)',
                  borderBottom: '1px solid rgba(0,0,0,0.05)',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 500,
                      fontSize: '1.3rem',
                      lineHeight: 1.6,
                      textAlign: 'center',
                      maxWidth: '800px',
                      mx: 'auto',
                      mb: 4,
                    }}
                  >
                    {t('homepage.department-intro.establishment.summary', '2015年因應產業跨域轉型需求與政府政策導向，建立前瞻智慧服務專業形象')}
                  </Typography>
                </motion.div>
              </Box>

              {/* 詳細內容區塊 */}
              <Box sx={{ p: { xs: 4, md: 6 } }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 6 }}>
                  {/* 左側：成立背景 */}
                  <Box sx={{ flex: { xs: 1, lg: 2 } }}>
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                          mb: 4,
                          fontSize: '1.3rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                        }}
                      >
                        <TimelineIcon sx={{ fontSize: 22, color: '#667eea' }} />
                        {t('homepage.department-intro.establishment.title', '成立背景')}
                      </Typography>
                      
                      <Box>
                        {(() => {
                          const body = t('homepage.department-intro.establishment.body', { returnObjects: true });
                          return Array.isArray(body) ? body : [];
                        })().map((paragraph: string, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                mb: 3,
                                fontSize: '1.05rem',
                                lineHeight: 1.8,
                                color: theme.palette.text.primary,
                                textAlign: 'justify',
                              }}
                            >
                              {paragraph}
                            </Typography>
                          </motion.div>
                        ))}
                      </Box>
                    </motion.div>
                  </Box>

                  {/* 右側：關鍵特色 */}
                  <Box sx={{ flex: { xs: 1, lg: 1 } }}>
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <Paper
                        sx={{
                          p: 4,
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          borderRadius: 4,
                          position: 'relative',
                          overflow: 'hidden',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: 100,
                            height: 100,
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%',
                            transform: 'translate(30px, -30px)',
                          },
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            mb: 3,
                            fontWeight: 600,
                            fontSize: '1.2rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            position: 'relative',
                            zIndex: 1,
                          }}
                        >
                          <EmojiEvents sx={{ fontSize: 20 }} />
                          {t('homepage.department-intro.establishment.key-features', '關鍵特色')}
                        </Typography>
                        
                        <Box component="ul" sx={{ pl: 0, m: 0, position: 'relative', zIndex: 1 }}>
                          {(() => {
                            const features = t('homepage.department-intro.establishment.features', { returnObjects: true });
                            return Array.isArray(features) ? features : [];
                          })().map((feature: string, index: number) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={isInView ? { opacity: 1, scale: 1 } : {}}
                              transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: 2,
                                  mb: 2.5,
                                  p: 2,
                                  background: 'rgba(255, 255, 255, 0.1)',
                                  borderRadius: 2,
                                  backdropFilter: 'blur(10px)',
                                  border: '1px solid rgba(255, 255, 255, 0.2)',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    transform: 'translateY(-2px)',
                                  },
                                }}
                              >
                                <CheckCircle sx={{ color: '#4ade80', fontSize: 18, mt: 0.2, flexShrink: 0 }} />
                                <Typography
                                  sx={{
                                    fontSize: '0.95rem',
                                    lineHeight: 1.6,
                                    fontWeight: 400,
                                  }}
                                >
                                  {feature}
                                </Typography>
                              </Box>
                            </motion.div>
                          ))}
                        </Box>
                      </Paper>
                    </motion.div>
                  </Box>
                </Box>
              </Box>
            </Card>
          </motion.div>

          {/* 發展歷程 - 全新時間軸設計 */}
          <Box id="department-development">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography
                  variant="h2"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    mb: 3,
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                  }}
                >
                  {t('homepage.department-intro.development.title', '發展歷程')}
                </Typography>
                <Box
                  sx={{
                    width: 120,
                    height: 4,
                    background: 'linear-gradient(90deg, transparent, #ffd700, transparent)',
                    mx: 'auto',
                    borderRadius: 2,
                  }}
                />
              </Box>

              {/* 互動式時間軸 */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: 2,
                  alignItems: 'stretch',
                  position: 'relative',
                }}
              >
                {(() => {
                  const phases = t('homepage.department-intro.development.phases', { returnObjects: true });
                  return Array.isArray(phases) ? phases : [];
                })().map((phase: any, index: number) => {
                  const IconComponent = phaseIcons[index];
                  const isActive = activePhase === index;
                  const isHovered = hoveredPhase === index;
                  const isExpanded = isAllExpanded;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                      style={{ flex: 1, position: 'relative', zIndex: 1, minWidth: 0 }}
                    >
                      <Card
                        sx={{
                          height: '100%',
                          background: isActive || isHovered
                            ? `linear-gradient(135deg, ${phaseColors[index]} 0%, ${phaseColors[index]}dd 100%)`
                            : 'rgba(255, 255, 255, 0.95)',
                          color: isActive || isHovered ? 'white' : 'inherit',
                          cursor: 'pointer',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          transform: isActive || isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                          boxShadow: isActive || isHovered
                            ? '0 20px 40px rgba(0, 0, 0, 0.2)'
                            : '0 8px 16px rgba(0, 0, 0, 0.1)',
                          borderRadius: 3,
                          border: isActive || isHovered ? '2px solid rgba(255, 255, 255, 0.3)' : '2px solid transparent',
                          overflow: 'hidden',
                          position: 'relative',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: isActive || isHovered
                              ? 'linear-gradient(45deg, rgba(255,255,255,0.1), transparent)'
                              : 'none',
                            zIndex: 0,
                          },
                        }}
                        onClick={() => {
                          if (isAllExpanded) {
                            setIsAllExpanded(false);
                            setActivePhase(null);
                          } else {
                            setActivePhase(index);
                            setIsAllExpanded(true);
                          }
                        }}
                        onMouseEnter={() => setHoveredPhase(index)}
                        onMouseLeave={() => setHoveredPhase(null)}
                      >
                        <CardContent sx={{ p: 0, height: '100%', position: 'relative', zIndex: 1 }}>
                          {/* 時間週期色卡 */}
                          <Box
                            sx={{
                              background: isActive || isHovered
                                ? 'rgba(255, 255, 255, 0.2)'
                                : phaseColors[index],
                              p: 2,
                              textAlign: 'center',
                              borderTopLeftRadius: 12,
                              borderTopRightRadius: 12,
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '1rem',
                                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                              }}
                            >
                              {phase.title.match(/（(.*?)）/)?.[1] || ''}
                            </Typography>
                          </Box>

                          {/* 內容區域 */}
                          <Box sx={{ p: 3 }}>
                            {/* 階段圖示與標題 */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                              <Avatar
                                sx={{
                                  background: isActive || isHovered
                                    ? 'rgba(255, 255, 255, 0.2)'
                                    : phaseColors[index],
                                  width: 40,
                                  height: 40,
                                  transition: 'all 0.3s ease',
                                }}
                              >
                                <IconComponent />
                              </Avatar>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 600,
                                  fontSize: '1.1rem',
                                  color: isActive || isHovered ? 'white' : 'inherit',
                                  transition: 'color 0.3s ease',
                                }}
                              >
                                {phase.title.split('（')[0]}
                              </Typography>
                            </Box>

                            {/* 階段描述 */}
                            <Typography
                              variant="body1"
                              sx={{
                                mb: 3,
                                fontSize: '0.95rem',
                                lineHeight: 1.6,
                                opacity: 0.9,
                                color: isActive || isHovered ? 'white' : 'inherit',
                                transition: 'color 0.3s ease',
                              }}
                            >
                              {phase.summary}
                            </Typography>

                            {/* 服務範圍 - 可展開 */}
                            <Box>
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  mb: 2,
                                  fontWeight: 600,
                                  opacity: 0.8,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1,
                                  color: isActive || isHovered ? 'white' : 'inherit',
                                  transition: 'color 0.3s ease',
                                }}
                              >
                                <EmojiEvents sx={{ fontSize: 16 }} />
                                服務範圍
                              </Typography>
                              
                              <AnimatePresence>
                                {isExpanded ? (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                      {phase.scope.map((item: string, itemIndex: number) => (
                                        <motion.div
                                          key={itemIndex}
                                          initial={{ opacity: 0, scale: 0.9 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ duration: 0.2, delay: itemIndex * 0.05 }}
                                        >
                                          <Chip
                                            label={item}
                                            size="small"
                                            sx={{
                                              backgroundColor: isActive || isHovered
                                                ? 'rgba(255, 255, 255, 0.2)'
                                                : 'rgba(102, 126, 234, 0.1)',
                                              color: isActive || isHovered ? 'white' : theme.palette.primary.main,
                                              border: isActive || isHovered
                                                ? '1px solid rgba(255, 255, 255, 0.3)'
                                                : `1px solid ${theme.palette.primary.main}`,
                                              mb: 1,
                                              mr: 0.5,
                                              maxWidth: '100%',
                                              height: 'auto',
                                              '& .MuiChip-label': {
                                                display: 'block',
                                                whiteSpace: 'normal',
                                                wordBreak: 'break-word',
                                                maxWidth: '100%',
                                                padding: '8px 12px',
                                              },
                                            }}
                                          />
                                        </motion.div>
                                      ))}
                                    </Box>
                                  </motion.div>
                                ) : (
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {phase.scope.slice(0, 3).map((item: string, itemIndex: number) => (
                                      <Chip
                                        key={itemIndex}
                                        label={item}
                                        size="small"
                                        sx={{
                                          backgroundColor: isActive || isHovered
                                            ? 'rgba(255, 255, 255, 0.2)'
                                            : 'rgba(102, 126, 234, 0.1)',
                                          color: isActive || isHovered ? 'white' : theme.palette.primary.main,
                                          border: isActive || isHovered
                                            ? '1px solid rgba(255, 255, 255, 0.3)'
                                            : `1px solid ${theme.palette.primary.main}`,
                                          mb: 0.5,
                                          mr: 0.5,
                                          maxWidth: '100%',
                                          '& .MuiChip-label': {
                                            display: 'block',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            maxWidth: '100%',
                                          },
                                        }}
                                      />
                                    ))}
                                    {phase.scope.length > 3 && (
                                      <Typography
                                        sx={{
                                          fontSize: '0.8rem',
                                          opacity: 0.7,
                                          fontStyle: 'italic',
                                          mt: 1,
                                          cursor: 'pointer',
                                          color: isActive || isHovered ? 'white' : 'inherit',
                                          transition: 'color 0.3s ease',
                                          '&:hover': { opacity: 1 },
                                        }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setIsAllExpanded(!isAllExpanded);
                                        }}
                                      >
                                        ...{t('homepage.department-intro.development.view-all-services', '點擊查看全部')} {phase.scope.length} {t('homepage.department-intro.development.services-unit', '項服務')}
                                      </Typography>
                                    )}
                                  </Box>
                                )}
                              </AnimatePresence>
                            </Box>
                          </Box>

                          {/* 互動提示 */}
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 8,
                              right: 8,
                              opacity: isActive || isHovered ? 1 : 0,
                              transition: 'opacity 0.3s ease',
                            }}
                          >
                            <Tooltip title={isExpanded ? t('homepage.department-intro.development.collapse-details', '收起詳情') : t('homepage.department-intro.development.expand-details', '展開詳情')}>
                              <IconButton
                                size="small"
                                sx={{
                                  background: 'rgba(255, 255, 255, 0.2)',
                                  color: 'white',
                                  '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.3)',
                                  },
                                }}
                              >
                                <TimelineIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </Box>
            </motion.div>
          </Box>

          {/* 部門架構 - 優化設計 */}
          <Box id="department-structure" sx={{ mt: 12 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography
                  variant="h2"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    mb: 3,
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                  }}
                >
                  {t('homepage.department-structure.title', '部門架構與業務')}
                </Typography>
                <Box
                  sx={{
                    width: 120,
                    height: 4,
                    background: 'linear-gradient(90deg, transparent, #ffd700, transparent)',
                    mx: 'auto',
                    borderRadius: 2,
                  }}
                />
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
                {[
                  {
                    title: t('homepage.department-structure.groups.0.title', '農業創新組'),
                    members: t('homepage.department-structure.groups.0.members', '啟昌、麗婉、士勳'),
                    summary: t('homepage.department-structure.groups.0.summary', '本團隊致力驅動台灣農業全面轉型，以「智慧化、國際化、永續化」為核心，賦能農企業與農場，從營運優化、科技應用到品牌升級，全面提升競爭力。我們以系統性輔導，貫穿產銷價值鏈，推動供應鏈智慧化、田間數位管理，並引領台灣農業邁向國際市場。同時，深耕產業基礎，透過培育專業人才、推廣農機共享、整合雜糧行銷等關鍵業務，為農業的永續發展奠定基石。')
                  },
                  {
                    title: t('homepage.department-structure.groups.1.title', '健康照護組'),
                    members: t('homepage.department-structure.groups.1.members', '裕焯'),
                    summary: t('homepage.department-structure.groups.1.summary', '促進全民健康與打造智慧照護體系，結合醫療機構、產業與社區推動健康促進、長照服務、智慧醫療與在地健康管理'),
                    achievements: (t('homepage.department-structure.groups.1.achievements', { returnObjects: true }) as string[])
                  },
                  {
                    title: t('homepage.department-structure.groups.2.title', '原民產業組'),
                    members: t('homepage.department-structure.groups.2.members', '奕誠、小孟'),
                    summary: t('homepage.department-structure.groups.2.summary', '協助原民企業建構以文化為核心的永續經營發展模式，並積極朝向承接綠色創新(部落綠色創新專案)及綠色品牌構建(原民企業商品碳盤查)等新計畫案為目標'),
                    "focus-areas": (t('homepage.department-structure.groups.2.focus-areas', { returnObjects: true }) as string[])
                  },
                  {
                    title: t('homepage.department-structure.groups.3.title', '前瞻永續組'),
                    members: t('homepage.department-structure.groups.3.members', 'NANA'),
                    summary: t('homepage.department-structure.groups.3.summary', '因應全球氣候變遷與國際淨零趨勢，協助政府推動永續政策及輔導產企業推動ESG轉型'),
                    goals: (t('homepage.department-structure.groups.3.goals', { returnObjects: true }) as string[])
                  }
                ].map((group: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                          {groupIcons[group.title as keyof typeof groupIcons]}
                          <Typography
                            variant="h6"
                            sx={{
                              ml: 1,
                              fontWeight: 600,
                              color: theme.palette.primary.main,
                            }}
                          >
                            {group.title}
                          </Typography>
                        </Box>
                        
                        {/* 主要陳述 */}
                        <Typography
                          variant="body1"
                          sx={{
                            mb: 3,
                            lineHeight: 1.6,
                            fontSize: '1rem',
                            color: theme.palette.text.primary,
                            fontWeight: 500,
                          }}
                        >
                          {group.summary}
                        </Typography>
                        
                        {/* 重點項目 */}
                        {group['key-points'] && (
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: theme.palette.primary.main }}>
                              重點項目：
                            </Typography>
                            <Box component="ul" sx={{ pl: 0, m: 0 }}>
                              {group['key-points'].map((point: string, pointIndex: number) => (
                                <Box
                                  key={pointIndex}
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    mb: 2,
                                    p: 2,
                                    background: 'rgba(102, 126, 234, 0.05)',
                                    borderRadius: 2,
                                    border: '1px solid rgba(102, 126, 234, 0.1)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                      background: 'rgba(102, 126, 234, 0.08)',
                                      transform: 'translateX(4px)',
                                    },
                                  }}
                                >
                                  <CheckCircle 
                                    sx={{ 
                                      color: theme.palette.primary.main, 
                                      fontSize: 18, 
                                      mt: 0.2, 
                                      mr: 1.5, 
                                      flexShrink: 0 
                                    }} 
                                  />
                                  <Typography
                                    sx={{
                                      fontSize: '0.9rem',
                                      lineHeight: 1.6,
                                      color: theme.palette.text.primary,
                                    }}
                                  >
                                    {point}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default DepartmentIntro;
