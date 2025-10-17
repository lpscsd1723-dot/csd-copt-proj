import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  useTheme,
  useMediaQuery,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import {
  Business,
  TrendingUp,
  SmartToy,
  Nature,
  Timeline as TimelineIcon,
  CheckCircle,
  Star,
  EmojiEvents,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const CenterHistory: React.FC = () => {
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);
  const [isAllExpanded, setIsAllExpanded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { t } = useTranslation();

  // 階段圖示對應
  const phaseIcons = [Business, TrendingUp, SmartToy, Nature];
  const phaseColors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];

  // 移除自動輪播功能，改為手動控制

  return (
    <Box
      id="center-history"
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
                {t('homepage.center-history.title', '成立背景')}
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

            {/* 核心內容卡片 - 現代極簡設計 */}
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
                    {t('homepage.center-history.establishment.summary')}
                  </Typography>
                </motion.div>
              </Box>

              {/* 詳細內容區塊 */}
              <Box sx={{ p: { xs: 4, md: 6 } }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 6 }}>
                  {/* 左側：歷史脈絡 - 陳述句形式 */}
                  <Box sx={{ flex: 1 }}>
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
                        {t('homepage.center-history.establishment.title', '成立背景')}
                      </Typography>
                      
                      {/* 流暢的陳述句設計 */}
                      <Box>
                        {(() => {
                          const body = t('homepage.center-history.establishment.body', { returnObjects: true });
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

                  {/* 右側：關鍵措施 */}
                  <Box sx={{ flex: 1 }}>
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
                          {t('homepage.center-history.establishment.key-measures', '關鍵措施')}
                        </Typography>
                        
                        <Box component="ul" sx={{ pl: 0, m: 0, position: 'relative', zIndex: 1 }}>
                          {(() => {
                            const bullets = t('homepage.center-history.establishment.bullets', { returnObjects: true });
                            return Array.isArray(bullets) ? bullets : [];
                          })().map((bullet: string, index: number) => (
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
                                  {bullet}
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
          <Box id="center-development">
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
                  {t('homepage.center-history.development.title', '中心發展歷程')}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    maxWidth: '800px',
                    mx: 'auto',
                    lineHeight: 1.6,
                    mb: 4,
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                  }}
                >
                  {t('homepage.center-history.development.summary', '中衛發展中心歷經四個重要發展階段，從垂直整合到水平合作，再到數位轉型與永續發展')}
                </Typography>
                {/* 分隔線條 */}
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
                  const phases = t('homepage.center-history.development.phases', { returnObjects: true });
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
                      style={{ flex: 1, position: 'relative', zIndex: 1 }}
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
                            // 如果已經展開，則收合並清除選中狀態
                            setIsAllExpanded(false);
                            setActivePhase(null);
                          } else {
                            // 如果未展開，則選中該階段並展開
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
                              {phase.period || ''}
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
                                {phase.title}
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

                          {/* 重要專案 - 可展開 */}
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
                              {t('homepage.center-history.establishment.important-projects', '重要專案')}
                            </Typography>
                            
                            <AnimatePresence>
                              {isExpanded ? (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                                    {phase['key-projects'].map((project: string, projectIndex: number) => (
                                      <motion.div
                                        key={projectIndex}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.2, delay: projectIndex * 0.05 }}
                                      >
                                        <Typography
                                          component="li"
                                          sx={{
                                            fontSize: '0.85rem',
                                            mb: 1,
                                            lineHeight: 1.5,
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: 1,
                                            color: isActive || isHovered ? 'white' : 'inherit',
                                            transition: 'color 0.3s ease',
                                          }}
                                        >
                                          <Star sx={{ fontSize: 12, mt: 0.5, opacity: 0.7 }} />
                                          {project}
                                        </Typography>
                                      </motion.div>
                                    ))}
                                  </Box>
                                </motion.div>
                              ) : (
                                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                                  {phase['key-projects'].slice(0, 2).map((project: string, projectIndex: number) => (
                                    <Typography
                                      key={projectIndex}
                                      component="li"
                                      sx={{
                                        fontSize: '0.85rem',
                                        mb: 0.5,
                                        lineHeight: 1.4,
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 1,
                                        color: isActive || isHovered ? 'white' : 'inherit',
                                        transition: 'color 0.3s ease',
                                      }}
                                    >
                                      <Star sx={{ fontSize: 12, mt: 0.5, opacity: 0.7 }} />
                                      {project}
                                    </Typography>
                                  ))}
                                  {phase['key-projects'].length > 2 && (
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
                                      ...{t('homepage.center-history.establishment.view-all-projects', '點擊查看全部')} {phase['key-projects'].length} {t('homepage.center-history.establishment.projects-unit', '項專案')}
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
                            <Tooltip title={isExpanded ? t('homepage.center-history.establishment.collapse-details', '收起詳情') : t('homepage.center-history.establishment.expand-details', '展開詳情')}>
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
        </motion.div>
      </Container>
    </Box>
  );
};

export default CenterHistory;
