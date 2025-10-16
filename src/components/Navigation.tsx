import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemText,
  ListItemButton,
  Collapse,
  Box,
  useTheme,
  useMediaQuery,
  Avatar,
} from '@mui/material';
import faviconLogo from '../assets/img/logo/favicon.png';
import { useTranslation } from 'react-i18next';
import { Select, MenuItem, Divider } from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ExpandLess,
  ExpandMore,
  History as HistoryIcon,
  Timeline as TimelineIcon,
  Business as BusinessIcon,
  ContactMail as ContactIcon,
  AccountTree as StructureIcon,
  Build as BuildIcon,
  Category as ServicesIcon,
} from '@mui/icons-material';

const Navigation: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery('(max-width: 1100px)');
  const { t, i18n } = useTranslation();

  // 調試：檢查語言切換
  useEffect(() => {
    console.log('Current language:', i18n.language);
    console.log('Resolved language:', i18n.resolvedLanguage);
  }, [i18n.language, i18n.resolvedLanguage]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 側邊欄選單（手機版）- 使用完整文字
  const drawerMenuItems = [
    {
      title: t('homepage.nav.center-history', '中心成立背景'),
      href: '#center-history',
      icon: <HistoryIcon />,
    },
    {
      title: t('homepage.nav.center-development', '中心發展歷程'),
      href: '#center-development',
      icon: <TimelineIcon />,
    },
    {
      title: t('homepage.nav.department', '部門介紹'),
      icon: <BusinessIcon />,
      children: [
        { title: t('homepage.nav.department-intro', '成立背景'), href: '#department-intro', icon: <BuildIcon /> },
        { title: t('homepage.nav.department-development', '發展歷程'), href: '#department-development', icon: <TimelineIcon /> },
        { title: t('homepage.nav.department-structure', '部門架構與業務'), href: '#department-structure', icon: <StructureIcon /> },
        { title: t('homepage.nav.services', '四大服務專區'), href: '#services', icon: <ServicesIcon /> },
      ],
    },
    // {
    //   title: t('homepage.nav.insights', '洞察觀點'),
    //   href: '#insights',
    //   icon: <InsightsIcon />,
    // },
    {
      title: t('homepage.nav.contact', '聯絡我們'),
      href: '#contact',
      icon: <ContactIcon />,
    },
  ];

  // 桌面版導航選單 - 根據螢幕大小決定文字
  const menuItems = isSmallScreen ? [
    {
      title: t('homepage.nav.center-history-short', '背景'),
      href: '#center-history',
      icon: <HistoryIcon />,
    },
    {
      title: t('homepage.nav.center-development-short', '歷程'),
      href: '#center-development',
      icon: <TimelineIcon />,
    },
    {
      title: t('homepage.nav.department-short', '部門'),
      icon: <BusinessIcon />,
      children: [
        { title: t('homepage.nav.department-intro', '成立背景'), href: '#department-intro', icon: <BuildIcon /> },
        { title: t('homepage.nav.department-development', '發展歷程'), href: '#department-development', icon: <TimelineIcon /> },
        { title: t('homepage.nav.department-structure', '部門架構與業務'), href: '#department-structure', icon: <StructureIcon /> },
        { title: t('homepage.nav.services', '四大服務專區'), href: '#services', icon: <ServicesIcon /> },
      ],
    },
    // {
    //   title: t('homepage.nav.insights-short', '洞察'),
    //   href: '#insights',
    //   icon: <InsightsIcon />,
    // },
    {
      title: t('homepage.nav.contact-short', '聯絡'),
      href: '#contact',
      icon: <ContactIcon />,
    },
  ] : [
    {
      title: t('homepage.nav.center-history', '中心成立背景'),
      href: '#center-history',
      icon: <HistoryIcon />,
    },
    {
      title: t('homepage.nav.center-development', '中心發展歷程'),
      href: '#center-development',
      icon: <TimelineIcon />,
    },
    {
      title: t('homepage.nav.department', '部門介紹'),
      icon: <BusinessIcon />,
      children: [
        { title: t('homepage.nav.department-intro', '成立背景'), href: '#department-intro', icon: <BuildIcon /> },
        { title: t('homepage.nav.department-development', '發展歷程'), href: '#department-development', icon: <TimelineIcon /> },
        { title: t('homepage.nav.department-structure', '部門架構與業務'), href: '#department-structure', icon: <StructureIcon /> },
        { title: t('homepage.nav.services', '四大服務專區'), href: '#services', icon: <ServicesIcon /> },
      ],
    },
    // {
    //   title: t('homepage.nav.insights', '洞察觀點'),
    //   href: '#insights',
    //   icon: <InsightsIcon />,
    // },
    {
      title: t('homepage.nav.contact', '聯絡我們'),
      href: '#contact',
      icon: <ContactIcon />,
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleExpandClick = (itemTitle: string) => {
    setExpandedItems(prev =>
      prev.includes(itemTitle)
        ? prev.filter(item => item !== itemTitle)
        : [...prev, itemTitle]
    );
  };


  const handleNavClick = (href: string) => {
    // 延遲執行以確保 DOM 更新完成
    setTimeout(() => {
      const element = document.querySelector(href) as HTMLElement;
      if (element) {
        // 獲取導航欄實際高度
        const navElement = document.querySelector('.MuiAppBar-root') as HTMLElement;
        const navHeight = navElement ? navElement.offsetHeight : 80;
        
        // 計算元素位置
        const elementRect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const elementPosition = elementRect.top + scrollTop;
        
        // 根據不同元件類型使用不同的偏移邏輯
        let finalPosition: number;
        
        if (href === '#center-development') {
          // 中心發展歷程：需要更多間距
          finalPosition = Math.max(0, elementPosition - navHeight - 50);
        } else if (href === '#department-structure') {
          // 部門架構：適中間距
          finalPosition = Math.max(0, elementPosition - navHeight - 50);
        } else if (href === '#department-development') {
          // 部門架構：適中間距
          finalPosition = Math.max(0, elementPosition - navHeight - 50);
        } else {
          // 根元件：不扣導航欄高度，只扣偏移量
          finalPosition = Math.max(0, elementPosition - 60);
        }
        
        // 使用 requestAnimationFrame 確保平滑滾動
        requestAnimationFrame(() => {
          window.scrollTo({
            top: finalPosition,
            behavior: 'smooth'
          });
        });
      } else {
        console.warn(`Element with selector "${href}" not found`);
      }
    }, 100);
    
    setMobileOpen(false);
    // 關閉所有展開的子菜單
    setExpandedItems([]);
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar
            src={faviconLogo}
            alt={t('homepage.nav.brand', '中衛中心 - 前瞻服務部')}
            sx={{ 
              width: 32, 
              height: 32
            }}
          />
          <Typography variant="h6">{t('homepage.nav.brand-short', '中衛中心')}</Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {drawerMenuItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.children ? (
              <>
                <ListItemButton 
                  onClick={() => handleExpandClick(item.title)}
                  sx={{
                    '& .MuiListItemIcon-root': {
                      minWidth: 'auto',
                      marginRight: 1,
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 1, minWidth: 'auto' }}>
                    {item.icon}
                  </Box>
                  <ListItemText 
                    primary={item.title} 
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                  {expandedItems.includes(item.title) ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={expandedItems.includes(item.title)} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child, childIndex) => (
                      <ListItemButton
                        key={childIndex}
                        sx={{ 
                          pl: 4,
                          '& .MuiListItemIcon-root': {
                            minWidth: 'auto',
                            marginRight: 1,
                          }
                        }}
                        onClick={() => handleNavClick(child.href)}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 1, minWidth: 'auto' }}>
                          {child.icon}
                        </Box>
                        <ListItemText 
                          primary={child.title} 
                          primaryTypographyProps={{ fontWeight: 'bold' }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItemButton 
                onClick={() => handleNavClick(item.href)}
                sx={{
                  '& .MuiListItemIcon-root': {
                    minWidth: 'auto',
                    marginRight: 1,
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 1, minWidth: 'auto' }}>
                  {item.icon}
                </Box>
                <ListItemText 
                  primary={item.title} 
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
              </ListItemButton>
            )}
          </React.Fragment>
        ))}
      </List>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ p: 2 }}>
        <Select
          size="small"
          value={i18n.language || 'zh'}
          onChange={(e) => {
            const lang = e.target.value as string;
            console.log('Changing language to:', lang);
            i18n.changeLanguage(lang).then(() => {
              console.log('Language changed successfully to:', i18n.language);
              document.documentElement.lang = lang;
            });
          }}
          sx={{
            width: '100%',
            '& .MuiSelect-select': {
              py: 1
            }
          }}
          variant="outlined"
        >
          <MenuItem value="zh">中文</MenuItem>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="ja">日本語</MenuItem>
        </Select>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: theme.zIndex.drawer - 1,
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
            <Avatar
              src={faviconLogo}
              alt={t('homepage.nav.brand', '中衛中心 - 前瞻服務部')}
              sx={{ 
                width: 40, 
                height: 40
              }}
            />
            <Typography 
              variant="h6" 
              component="div"
              sx={{ 
                color: scrolled ? 'text.primary' : 'white',
                transition: 'color 0.3s ease-in-out'
              }}
            >
            {t('homepage.nav.brand', '中衛中心 - 前瞻服務部')}
            </Typography>
          </Box>
          {isMobile ? (
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                color: scrolled ? 'text.primary' : 'white',
                transition: 'color 0.3s ease-in-out'
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
              {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                  {item.children ? (
                    <Box 
                      sx={{ 
                        position: 'relative', 
                        display: 'inline-block',
                        '&:hover .dropdown-menu': {
                          opacity: 1,
                          visibility: 'visible',
                          transform: 'translateY(0)',
                        }
                      }}
                    >
                      <Box
                        sx={{
                          cursor: 'pointer',
                          color: scrolled ? 'text.primary' : 'white',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          px: 1.5,
                          py: 0.8,
                          borderRadius: 1.5,
                          fontWeight: 'bold',
                          fontSize: '0.9rem',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': { 
                            backgroundColor: scrolled ? 'rgba(255, 107, 53, 0.1)' : 'rgba(255,255,255,0.2)',
                            transform: 'translateY(-1px)',
                            boxShadow: scrolled ? '0 4px 12px rgba(255, 107, 53, 0.2)' : '0 4px 12px rgba(255, 255, 255, 0.2)'
                          }
                        }}
                      >
                        {item.icon}
                        <Typography component="span" sx={{ fontWeight: 'bold' }}>
                          {item.title}
                        </Typography>
                        <Box sx={{ ml: 0.5 }}>
                          <ExpandMore />
                        </Box>
                      </Box>
                      <Box
                        className="dropdown-menu"
                        sx={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          backgroundColor: 'white',
                          boxShadow: 3,
                          borderRadius: 1,
                          minWidth: 220,
                          maxWidth: 'calc(100vw - 32px)', // 防止超出視窗
                          zIndex: 1300,
                          border: '1px solid',
                          borderColor: 'grey.300',
                          overflow: 'hidden',
                          opacity: 0,
                          visibility: 'hidden',
                          transform: 'translateY(-10px)',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        {item.children.map((child, childIndex) => (
                          <Box
                            key={childIndex}
                            sx={{
                              px: 2,
                              py: 1.5,
                              cursor: 'pointer',
                              color: 'text.primary',
                              borderBottom: childIndex < item.children.length - 1 ? '1px solid' : 'none',
                              borderColor: 'grey.200',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              '&:hover': { 
                                backgroundColor: 'grey.100',
                                color: 'primary.main'
                              },
                              '&:last-child': {
                                borderBottom: 'none'
                              }
                            }}
                            onClick={() => handleNavClick(child.href)}
                          >
                            {child.icon}
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              {child.title}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        cursor: 'pointer',
                        color: scrolled ? 'text.primary' : 'white',
                        px: 1.5,
                        py: 0.8,
                        borderRadius: 1.5,
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': { 
                          backgroundColor: scrolled ? 'rgba(255, 107, 53, 0.1)' : 'rgba(255,255,255,0.2)',
                          transform: 'translateY(-1px)',
                          boxShadow: scrolled ? '0 4px 12px rgba(255, 107, 53, 0.2)' : '0 4px 12px rgba(255, 255, 255, 0.2)'
                        }
                      }}
                      onClick={() => handleNavClick(item.href)}
                    >
                      {item.icon}
                      <Typography component="span" sx={{ fontWeight: 'bold' }}>
                        {item.title}
                      </Typography>
                    </Box>
                  )}
                </React.Fragment>
              ))}
              <Select
                size="small"
                value={i18n.language || 'zh'}
                onChange={(e) => {
                  const lang = e.target.value as string;
                  console.log('Changing language to:', lang);
                  i18n.changeLanguage(lang).then(() => {
                    console.log('Language changed successfully to:', i18n.language);
                    document.documentElement.lang = lang;
                  });
                }}
                sx={{
                  ml: 1,
                  minWidth: 100,
                  color: scrolled ? 'text.primary' : 'white',
                  '& .MuiSelect-icon': { color: scrolled ? 'text.primary' : 'white' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: scrolled ? 'rgba(0,0,0,0.23)' : 'rgba(255,255,255,0.7)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: scrolled ? 'rgba(0,0,0,0.5)' : 'white' }
                }}
                variant="outlined"
              >
                <MenuItem value="zh">中文</MenuItem>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="ja">日本語</MenuItem>
              </Select>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          zIndex: theme.zIndex.drawer + 10,
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 250,
            zIndex: theme.zIndex.drawer + 10
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navigation;
