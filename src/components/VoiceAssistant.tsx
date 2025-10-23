import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from '@mui/material';
import {
  SmartToy as RobotIcon,
  Mic as MicIcon,
  Close as CloseIcon,
  Help as HelpIcon,
  NavigateNext as NavigateNextIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import voiceCommandsConfig from '../assets/voice_commands.json';

// 定義語音辨識相關的類型
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface VoiceAssistantProps {
  onNavigate: (href: string, serviceId?: string) => void;
}

interface VoiceResult {
  text: string;
  confidence: number;
  keywords: string[];
  matchedId: string | null;
  matchedName: string | null;
  matchType: 'exact' | 'fuzzy' | null;
  score: number;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onNavigate }) => {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState<VoiceResult | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { t, i18n } = useTranslation();

  // 智能匹配語音指令
  const matchVoiceCommand = useCallback((text: string) => {
    const normalizedText = text.toLowerCase();
    const currentLang = i18n.language || 'zh';
    let bestMatch: {
      id: string;
      name: string;
      href?: string;
      languageCode?: string;
      serviceId?: string;
      action?: string;
      score: number;
      matchType: 'exact' | 'fuzzy';
      keywords: string[];
    } | null = null;

    // 檢查頁面匹配（根據當前語言）
    for (const page of voiceCommandsConfig.pages) {
      const pageKeywords = page.keywords[currentLang as 'zh' | 'en' | 'ja'];
      const pageName = typeof page.name === 'string' ? page.name : page.name[currentLang as 'zh' | 'en' | 'ja'];
      
      if (!pageKeywords) continue;

      // 精確匹配
      for (const keyword of pageKeywords.exact) {
        if (normalizedText.includes(keyword.toLowerCase())) {
          const score = 1.0;
          if (!bestMatch || score > bestMatch.score) {
            bestMatch = {
              id: page.id,
              name: pageName,
              href: page.href,
              serviceId: (page as any).serviceId,
              action: (page as any).action,
              score,
              matchType: 'exact',
              keywords: [keyword]
            };
          }
        }
      }

      // 模糊匹配
      const fuzzyMatches: string[] = [];
      for (const keyword of pageKeywords.fuzzy) {
        if (normalizedText.includes(keyword.toLowerCase())) {
          fuzzyMatches.push(keyword);
        }
      }

      // 只要達到最小匹配數就通過
      if (fuzzyMatches.length >= pageKeywords.minMatch) {
        const score = fuzzyMatches.length / pageKeywords.fuzzy.length;
        // 如果還沒有精確匹配，或者是模糊匹配但分數更高
        if (!bestMatch || (bestMatch.matchType === 'fuzzy' && score > bestMatch.score)) {
          bestMatch = {
            id: page.id,
            name: pageName,
            href: page.href,
            serviceId: (page as any).serviceId,
            action: (page as any).action,
            score,
            matchType: 'fuzzy',
            keywords: fuzzyMatches
          };
        }
      }
    }

    // 檢查語言切換（根據當前語言）
    for (const lang of voiceCommandsConfig.languages) {
      const langKeywords = lang.keywords[currentLang as 'zh' | 'en' | 'ja'];
      
      if (!langKeywords) continue;

      // 精確匹配
      for (const keyword of langKeywords.exact) {
        if (normalizedText.includes(keyword.toLowerCase())) {
          const score = 1.0;
          if (!bestMatch || score > bestMatch.score) {
            bestMatch = {
              id: lang.id,
              name: lang.name,
              languageCode: lang.code,
              score,
              matchType: 'exact',
              keywords: [keyword]
            };
          }
        }
      }

      // 模糊匹配
      const fuzzyMatches: string[] = [];
      for (const keyword of langKeywords.fuzzy) {
        if (normalizedText.includes(keyword.toLowerCase())) {
          fuzzyMatches.push(keyword);
        }
      }

      // 只要達到最小匹配數就通過
      if (fuzzyMatches.length >= langKeywords.minMatch) {
        const score = fuzzyMatches.length / langKeywords.fuzzy.length;
        // 如果還沒有精確匹配，或者是模糊匹配但分數更高
        if (!bestMatch || (bestMatch.matchType === 'fuzzy' && score > bestMatch.score)) {
          bestMatch = {
            id: lang.id,
            name: lang.name,
            languageCode: lang.code,
            score,
            matchType: 'fuzzy',
            keywords: fuzzyMatches
          };
        }
      }
    }

    return bestMatch;
  }, [i18n.language]);

  // 處理語音輸入
  const processVoiceInput = useCallback((text: string) => {
    const match = matchVoiceCommand(text);

    const result: VoiceResult = {
      text,
      confidence: match ? match.score : 0,
      keywords: match ? match.keywords : [],
      matchedId: match ? match.id : null,
      matchedName: match ? match.name : null,
      matchType: match ? match.matchType : null,
      score: match ? match.score : 0
    };

    setResult(result);

    // 如果有匹配，執行對應動作
    if (match) {
      if (match.languageCode) {
        // 語言切換
        i18n.changeLanguage(match.languageCode);
        setTimeout(() => {
          setTranscript('');
          setResult(null);
          // 語言切換後，重新啟動語音辨識引擎
          if (recognition && isActive) {
            recognition.stop();
            setTimeout(() => {
              if (recognition) {
                try {
                  recognition.start();
                } catch (e) {
                  console.log('重新啟動語音辨識時發生錯誤:', e);
                }
              }
            }, 500);
          }
        }, 2000);
      } else if (match.href) {
        // 頁面跳轉，如果有 serviceId 則一併傳遞
        onNavigate(match.href, match.serviceId);
        setTimeout(() => {
          setTranscript('');
          setResult(null);
        }, 1500);
      }
    } else {
      // 辨識失敗，顯示幫助彈窗（停止監聽）
      setTimeout(() => {
        setShowHelp(true);
        setIsActive(false);
      }, 1500);
    }
  }, [matchVoiceCommand, onNavigate, i18n, recognition, isActive]);

  // 初始化語音辨識
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true; // 改為持續監聽
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = i18n.language === 'zh' ? 'zh-TW' : i18n.language === 'ja' ? 'ja-JP' : 'en-US';

      let currentTranscript = '';
      let finalTranscriptTimeout: NodeJS.Timeout | null = null;

      recognitionInstance.onstart = () => {
        setTranscript('');
        setResult(null);
        currentTranscript = '';
      };

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        currentTranscript = finalTranscript || interimTranscript;
        setTranscript(currentTranscript);

        // 當有最終辨識結果時，延遲處理以確保完整句子
        if (finalTranscript) {
          if (finalTranscriptTimeout) {
            clearTimeout(finalTranscriptTimeout);
          }
          finalTranscriptTimeout = setTimeout(() => {
            if (currentTranscript) {
              processVoiceInput(currentTranscript);
              currentTranscript = '';
              setTranscript('');
            }
          }, 1000); // 1秒後處理
        }
      };

      recognitionInstance.onend = () => {
        // 如果還在活動狀態，自動重啟
        if (isActive) {
          setTimeout(() => {
            try {
              recognitionInstance.start();
            } catch (error) {
              console.log('重啟語音辨識失敗:', error);
            }
          }, 100);
        }
      };

      recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('語音辨識錯誤:', event.error);
        
        // 某些錯誤不需要停止
        if (event.error === 'no-speech' || event.error === 'audio-capture') {
          // 繼續監聽
          return;
        }
        
        if (event.error !== 'aborted') {
          setResult({
            text: currentTranscript,
            confidence: 0,
            keywords: [],
            matchedId: null,
            matchedName: null,
            matchType: null,
            score: 0
          });
        }
      };

      setRecognition(recognitionInstance);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language, isActive]);

  // 開始/停止語音辨識
  const toggleListening = () => {
    if (!recognition) return;
    
    if (isActive) {
      // 停止監聽
      setIsActive(false);
      setTranscript('');
      setResult(null);
      recognition.stop();
    } else {
      // 開始監聽
      setIsActive(true);
      setTranscript('');
      setResult(null);
      try {
        recognition.start();
      } catch (error) {
        console.log('啟動語音辨識失敗:', error);
      }
    }
  };

  // 浮動動畫效果
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 獲取可用頁面清單
  const getAvailablePages = () => {
    return [
      { title: t('homepage.nav.center-history', '中心成立背景'), href: '#center-history' },
      { title: t('homepage.nav.center-development', '中心發展歷程'), href: '#center-development' },
      { title: t('homepage.nav.department-intro', '成立背景'), href: '#department-intro' },
      { title: t('homepage.nav.department-development', '發展歷程'), href: '#department-development' },
      { title: t('homepage.nav.department-structure', '部門架構與業務'), href: '#department-structure' },
      { title: t('homepage.nav.services', '四大服務專區'), href: '#services' },
      { title: t('homepage.nav.contact', '聯絡我們'), href: '#contact' },
    ];
  };

  return (
    <>
      {/* 語音辨識字幕 */}
      {isActive && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 100,
            right: 24,
            zIndex: 1000,
            maxWidth: 320,
            animation: 'fadeInUp 0.3s ease-out',
            '@keyframes fadeInUp': {
              from: {
                opacity: 0,
                transform: 'translateY(20px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: 3,
              p: 2,
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
              position: 'relative',
            }}
          >
            {result ? (
              <Box>
                {result.matchedId ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon sx={{ color: '#4caf50' }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        ✨ {t('homepage.voice-assistant.recognized')}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.9 }}>
                        {result.matchedName} ({result.matchType === 'exact' ? t('homepage.voice-assistant.match-exact') : `${t('homepage.voice-assistant.match-fuzzy')} ${Math.round(result.score * 100)}%`})
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ErrorIcon sx={{ color: '#ff9800' }} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        ⚠️ {t('homepage.voice-assistant.no-match')}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.9 }}>
                        "{transcript}"
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CircularProgress size={24} sx={{ color: 'white' }} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    🎤 {t('homepage.voice-assistant.listening')}
                  </Typography>
                  {transcript && (
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      "{transcript}"
                    </Typography>
                  )}
                </Box>
                <IconButton
                  size="small"
                  onClick={toggleListening}
                  sx={{
                    color: 'white',
                    ml: 'auto',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.2)',
                    }
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>
      )}

      {/* 浮動按鈕 */}
      <Fab
        color="primary"
        aria-label={t('homepage.voice-assistant.aria-label')}
        onClick={toggleListening}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          transform: isAnimating ? 'translateY(-8px)' : 'translateY(0)',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          background: isActive 
            ? 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)'
            : 'linear-gradient(45deg, #FF6B35 30%, #F7931E 90%)',
          '&:hover': {
            background: isActive
              ? 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)'
              : 'linear-gradient(45deg, #FF6B35 30%, #F7931E 90%)',
            transform: 'scale(1.1)',
          },
          boxShadow: isActive
            ? '0 8px 32px rgba(102, 126, 234, 0.4)'
            : '0 8px 32px rgba(255, 107, 53, 0.3)',
        }}
      >
        {isActive ? <MicIcon sx={{ fontSize: 28 }} /> : <RobotIcon sx={{ fontSize: 28 }} />}
      </Fab>

      {/* 幫助彈窗 */}
      <Dialog
        open={showHelp}
        onClose={() => {
          setShowHelp(false);
          setTranscript('');
          setResult(null);
        }}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '80vh',
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          bgcolor: 'warning.main',
          color: 'white'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HelpIcon />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {t('homepage.voice-assistant.help-title')}
            </Typography>
          </Box>
          <IconButton onClick={() => {
            setShowHelp(false);
            setTranscript('');
            setResult(null);
          }} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Typography variant="body1" sx={{ mb: 3, mt: 3, color: 'text.secondary' }}>
            {t('homepage.voice-assistant.help-description')} - {t('homepage.voice-assistant.help-you-said')}: 「{transcript}」
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
            📍 {t('homepage.voice-assistant.help-available-pages')}
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            {getAvailablePages().map((page, index) => (
              <ListItemButton 
                key={index}
                onClick={() => {
                  onNavigate(page.href);
                  setShowHelp(false);
                  setTranscript('');
                  setResult(null);
                }}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  '&:hover': {
                    bgcolor: 'primary.light',
                    color: 'white',
                  }
                }}
              >
                <ListItemIcon>
                  <NavigateNextIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={page.title}
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
              </ListItemButton>
            ))}
          </Box>

          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: 'primary.main' }}>
              🌐 {t('homepage.voice-assistant.help-language-switch')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {[
                { code: 'zh', name: t('homepage.nav.language-zh', '中文') },
                { code: 'en', name: t('homepage.nav.language-en', 'English') },
                { code: 'ja', name: t('homepage.nav.language-ja', '日本語') }
              ].map((lang) => (
                <Chip 
                  key={lang.code}
                  label={lang.name} 
                  color="primary" 
                  variant="outlined" 
                />
              ))}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => {
              setShowHelp(false);
              setTranscript('');
              setResult(null);
            }}
            variant="contained"
            sx={{ fontWeight: 'bold' }}
          >
            {t('homepage.voice-assistant.help-close')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VoiceAssistant;
