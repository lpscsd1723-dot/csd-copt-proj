import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Fab,
  Dialog,
  DialogContent,
  TextField,
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Chip,
  IconButton,
  Fade,
} from '@mui/material';
import {
  Search as SearchIcon,
  Close as CloseIcon,
  NavigateNext as NavigateNextIcon,
  StarBorder as StarBorderIcon,
} from '@mui/icons-material';
import voiceCommandsConfig from '../assets/voice_commands.json';

interface TextSearchNavigatorProps {
  onNavigate: (href: string, serviceId?: string, tabIndex?: number) => void;
}

interface SearchResult {
  id: string;
  name: string;
  href: string;
  serviceId?: string;
  tabIndex?: number;
  action?: string;
  matchType: 'exact' | 'fuzzy';
  score: number;
  matchedKeywords: string[];
}

const TextSearchNavigator: React.FC<TextSearchNavigatorProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const { i18n } = useTranslation();

  // 搜尋匹配邏輯
  const performSearch = useCallback((text: string) => {
    if (!text.trim()) {
      setSearchResults([]);
      return;
    }

    const currentLang = i18n.language || 'zh';
    const results: SearchResult[] = [];
    const searchLower = text.toLowerCase();

    // 搜尋頁面
    voiceCommandsConfig.pages.forEach((page: any) => {
      const keywords = page.keywords[currentLang];
      if (!keywords) return;

      const pageName = page.name[currentLang];
      
      // 檢查精確匹配
      const exactMatch = keywords.exact?.some((keyword: string) => 
        searchLower.includes(keyword.toLowerCase()) || 
        keyword.toLowerCase().includes(searchLower)
      );

      if (exactMatch) {
        results.push({
          id: page.id,
          name: pageName,
          href: page.href,
          serviceId: page.serviceId,
          tabIndex: page.tabIndex,
          action: page.action,
          matchType: 'exact',
          score: 100,
          matchedKeywords: keywords.exact.filter((k: string) => 
            searchLower.includes(k.toLowerCase()) || k.toLowerCase().includes(searchLower)
          ),
        });
        return;
      }

      // 檢查模糊匹配
      const matchedFuzzy = keywords.fuzzy?.filter((keyword: string) => 
        searchLower.includes(keyword.toLowerCase()) || 
        keyword.toLowerCase().includes(searchLower)
      ) || [];

      const minMatch = keywords.minMatch || 1;
      if (matchedFuzzy.length >= minMatch) {
        const score = (matchedFuzzy.length / keywords.fuzzy.length) * 100;
        results.push({
          id: page.id,
          name: pageName,
          href: page.href,
          serviceId: page.serviceId,
          tabIndex: page.tabIndex,
          action: page.action,
          matchType: 'fuzzy',
          score: Math.round(score),
          matchedKeywords: matchedFuzzy,
        });
      }
    });

    // 按分數排序
    results.sort((a, b) => {
      if (a.matchType === 'exact' && b.matchType !== 'exact') return -1;
      if (a.matchType !== 'exact' && b.matchType === 'exact') return 1;
      return b.score - a.score;
    });

    setSearchResults(results);
  }, [i18n.language]);

  // 監聽搜尋文字變化
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchText);
    }, 300); // 防抖

    return () => clearTimeout(timer);
  }, [searchText, performSearch]);

  // 處理導航
  const handleNavigate = (href: string, serviceId?: string, tabIndex?: number) => {
    onNavigate(href, serviceId, tabIndex);
    setIsOpen(false);
    setSearchText('');
    setSearchResults([]);
  };

  // 鍵盤快捷鍵 (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* 搜尋按鈕 */}
      <Fab
        color="primary"
        aria-label="text search"
        onClick={() => setIsOpen(true)}
        sx={{
          position: 'fixed',
          bottom: { xs: 90, sm: 100 },
          right: { xs: 16, sm: 24 },
          zIndex: 1200,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <SearchIcon />
      </Fab>

      {/* 搜尋對話框 */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: 'hidden',
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          {/* 搜尋輸入框 */}
          <Box
            sx={{
              p: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SearchIcon sx={{ color: 'white' }} />
              <TextField
                autoFocus
                fullWidth
                placeholder={
                  i18n.language === 'zh' 
                    ? '搜尋頁面... (例如: 部門介紹、聯絡我們)'
                    : i18n.language === 'en'
                    ? 'Search pages... (e.g., Department, Contact)'
                    : 'ページを検索... (例: 部門、お問い合わせ)'
                }
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    color: 'white',
                    fontSize: '1.1rem',
                    '& input::placeholder': {
                      color: 'rgba(255, 255, 255, 0.7)',
                      opacity: 1,
                    },
                  },
                }}
              />
              <IconButton
                onClick={() => setIsOpen(false)}
                sx={{ color: 'white' }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            
            {/* 快捷鍵提示 */}
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                mt: 1,
                display: 'block',
              }}
            >
              {i18n.language === 'zh' 
                ? '快捷鍵: Ctrl/⌘ + K'
                : i18n.language === 'en'
                ? 'Shortcut: Ctrl/⌘ + K'
                : 'ショートカット: Ctrl/⌘ + K'
              }
            </Typography>
          </Box>

          {/* 搜尋結果 */}
          <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
            {searchText.trim() === '' ? (
              // 顯示所有可用頁面
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
                  {i18n.language === 'zh' 
                    ? '📍 快速導航'
                    : i18n.language === 'en'
                    ? '📍 Quick Navigation'
                    : '📍 クイックナビゲーション'
                  }
                </Typography>
                <List>
                  {voiceCommandsConfig.pages.map((page: any) => (
                    <ListItemButton
                      key={page.id}
                      onClick={() => handleNavigate(page.href, page.serviceId, page.tabIndex)}
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        '&:hover': {
                          backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        },
                      }}
                    >
                      <ListItemIcon>
                        <StarBorderIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={page.name[i18n.language || 'zh']} />
                      <NavigateNextIcon color="action" />
                    </ListItemButton>
                  ))}
                </List>
              </Box>
            ) : searchResults.length > 0 ? (
              // 顯示搜尋結果
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
                  {i18n.language === 'zh' 
                    ? `找到 ${searchResults.length} 個結果`
                    : i18n.language === 'en'
                    ? `Found ${searchResults.length} results`
                    : `${searchResults.length} 件の結果`
                  }
                </Typography>
                <List>
                  {searchResults.map((result) => (
                    <Fade in key={result.id}>
                      <ListItemButton
                        onClick={() => handleNavigate(result.href, result.serviceId, result.tabIndex)}
                        sx={{
                          borderRadius: 2,
                          mb: 1,
                          border: '1px solid',
                          borderColor: result.matchType === 'exact' 
                            ? 'primary.main' 
                            : 'divider',
                          '&:hover': {
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            borderColor: 'primary.main',
                          },
                        }}
                      >
                        <ListItemIcon>
                          <NavigateNextIcon 
                            color={result.matchType === 'exact' ? 'primary' : 'action'} 
                          />
                        </ListItemIcon>
                        <Box sx={{ flex: 1 }}>
                          <ListItemText 
                            primary={result.name}
                            secondary={
                              <Box sx={{ mt: 0.5 }}>
                                {result.matchedKeywords.slice(0, 3).map((keyword, idx) => (
                                  <Chip
                                    key={idx}
                                    label={keyword}
                                    size="small"
                                    sx={{ 
                                      mr: 0.5, 
                                      mb: 0.5,
                                      height: '20px',
                                      fontSize: '0.7rem',
                                    }}
                                    color={result.matchType === 'exact' ? 'primary' : 'default'}
                                  />
                                ))}
                              </Box>
                            }
                          />
                        </Box>
                        <Chip
                          label={
                            result.matchType === 'exact'
                              ? (i18n.language === 'zh' ? '精確' : i18n.language === 'en' ? 'Exact' : '完全')
                              : `${result.score}%`
                          }
                          size="small"
                          color={result.matchType === 'exact' ? 'primary' : 'default'}
                          sx={{ ml: 1 }}
                        />
                      </ListItemButton>
                    </Fade>
                  ))}
                </List>
              </Box>
            ) : (
              // 無結果
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  {i18n.language === 'zh' 
                    ? '😢 找不到相關頁面'
                    : i18n.language === 'en'
                    ? '😢 No results found'
                    : '😢 結果が見つかりません'
                  }
                </Typography>
                <Typography variant="body2" color="text.disabled">
                  {i18n.language === 'zh' 
                    ? '試試其他關鍵字'
                    : i18n.language === 'en'
                    ? 'Try different keywords'
                    : '別のキーワードをお試しください'
                  }
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TextSearchNavigator;

