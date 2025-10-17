import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  useTheme,
  Chip,
  Avatar,
  Divider,
  Fade,
} from '@mui/material';
import teamImage from '../assets/img/services/05聯絡我們/線上表單.jpg';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
  Business as BusinessIcon,
  CheckCircle as CheckIcon,
  AutoAwesome as SparkleIcon,
  ContactPhone as ContactIcon,
} from '@mui/icons-material';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    serviceCategory: '',
    name: '',
    email: '',
    description: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const theme = useTheme();
  const { t } = useTranslation();
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const serviceCategories = [
    { value: 'agriculture', label: t('homepage.contact.contacts.0.service', '農企業經營與創新轉型'), color: '#4CAF50' },
    { value: 'healthcare', label: t('homepage.contact.contacts.1.service', '健康照護'), color: '#2196F3' },
    { value: 'indigenous', label: t('homepage.contact.contacts.2.service', '原民通路與產業'), color: '#FF9800' },
    { value: 'sustainability', label: t('homepage.contact.contacts.3.service', '公正轉型與永續發展'), color: '#9C27B0' },
  ];


  const handleInputChange = (field: string) => (event: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
    // 清除該欄位的錯誤訊息
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.serviceCategory) {
      newErrors.serviceCategory = t('homepage.contact.online-form.errors.service-category', '請選擇服務類別');
    }
    if (!formData.name.trim()) {
      newErrors.name = t('homepage.contact.online-form.errors.name', '請輸入姓名');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('homepage.contact.online-form.errors.email', '請輸入電子郵件');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('homepage.contact.online-form.errors.email-format', '請輸入有效的電子郵件格式');
    }
    if (!formData.description.trim()) {
      newErrors.description = t('homepage.contact.online-form.errors.description', '請描述您的需求');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // 模擬 API 呼叫
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccess(true);
      setFormData({
        serviceCategory: '',
        name: '',
        email: '',
        description: '',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      id="contact"
      ref={ref}
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
          background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  textShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                {t('homepage.contact.title', '聯絡我們')}
              </Typography>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 400,
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                {t('homepage.contact.subtitle', '讓我們一起創造更美好的未來 🌟')}
              </Typography>
            </motion.div>
          </Box>
        </motion.div>


        {/* Main Content Grid */}
        <Grid container spacing={6} alignItems="stretch">
          {/* Contact Information */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Avatar
                      sx={{
                        width: 50,
                        height: 50,
                        mr: 2,
                        background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                      }}
                    >
                      <ContactIcon />
                    </Avatar>
                    <Typography
                      variant="h4"
                      sx={{
                        color: 'white',
                        fontWeight: 700,
                      }}
                    >
                      {t('homepage.contact.professional-team', '專業團隊')}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 4 }}>
                    {(t('homepage.contact.contacts', { returnObjects: true }) as any[] || []).map((contactItem: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                      >
                        <Card
                          sx={{
                            mb: 2,
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 2,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: 'rgba(255, 255, 255, 0.1)',
                              transform: 'translateX(8px)',
                            },
                          }}
                        >
                          <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Chip
                                label={contactItem.service}
                                size="small"
                                sx={{
                                  backgroundColor: serviceCategories[index]?.color || '#666',
                                  color: 'white',
                                  fontWeight: 600,
                                  mr: 2,
                                }}
                              />
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Avatar
                                sx={{
                                  width: 32,
                                  height: 32,
                                  mr: 2,
                                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                }}
                              >
                                <ContactIcon sx={{ fontSize: '1rem' }} />
                              </Avatar>
                              <Typography
                                variant="h6"
                                sx={{
                                  color: 'white',
                                  fontWeight: 600,
                                }}
                              >
                                {contactItem.contact}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: 4 }}>
                              <PhoneIcon sx={{ mr: 1, fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.8)' }} />
                              <Typography
                                variant="body1"
                                sx={{
                                  color: 'rgba(255, 255, 255, 0.9)',
                                  fontWeight: 500,
                                }}
                              >
                                {contactItem.phone}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </Box>

                  <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', my: 3 }} />

                  <Box sx={{ p: 3, background: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <BusinessIcon sx={{ mr: 2, color: 'rgba(255, 255, 255, 0.8)' }} />
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'white',
                          fontWeight: 600,
                        }}
                      >
                        {t('homepage.contact.headquarters', '中衛中心總部')}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationIcon sx={{ mr: 1, fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.8)' }} />
                      <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                        {t('homepage.contact.address', '台北市大安區信義路三段41號')}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EmailIcon sx={{ mr: 1, fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.8)' }} />
                      <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                        info@cws.org.tw
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                }}
              >
                <CardContent sx={{ p: 5 }}>
                  {/* Team Image Section */}
                  <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.6, delay: 1.4 }}
                    >
                      <Box
                        component="img"
                        src={teamImage}
                        alt="前瞻永續組淨零永續"
                        sx={{
                          width: '100%',
                          maxWidth: '600px',
                          height: 'auto',
                          borderRadius: 3,
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.02)',
                          },
                        }}
                      />
                    </motion.div>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Avatar
                      sx={{
                        width: 50,
                        height: 50,
                        mr: 2,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      }}
                    >
                      <SparkleIcon />
                    </Avatar>
                    <Typography
                      variant="h4"
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 700,
                      }}
                      >
                        {t('homepage.contact.online-form.title', '線上表單（需求/合作/申請）')}
                      </Typography>
                  </Box>

                  <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {/* Service Category */}
                      <Box>
                        <FormControl fullWidth error={!!errors.serviceCategory}>
                          <InputLabel sx={{ fontWeight: 600 }}>{t('homepage.contact.online-form.service-category', '服務類別')} *</InputLabel>
                          <Select
                            value={formData.serviceCategory}
                            onChange={handleInputChange('serviceCategory')}
                            label={`${t('homepage.contact.online-form.service-category', '服務類別')} *`}
                            sx={{
                              '& .MuiSelect-select': {
                                display: 'flex',
                                alignItems: 'center',
                              },
                            }}
                          >
                            {serviceCategories.map((category) => (
                              <MenuItem key={category.value} value={category.value}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Box
                                    sx={{
                                      width: 12,
                                      height: 12,
                                      borderRadius: '50%',
                                      backgroundColor: category.color,
                                      mr: 2,
                                    }}
                                  />
                                  {category.label}
                                </Box>
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.serviceCategory && (
                            <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}>
                              ❌ {errors.serviceCategory}
                            </Typography>
                          )}
                        </FormControl>
                      </Box>

                      {/* Name and Email Row */}
                      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                        <Box sx={{ flex: 1 }}>
                          <TextField
                            fullWidth
                            label={`${t('homepage.contact.online-form.name', '姓名')} *`}
                            value={formData.name}
                            onChange={handleInputChange('name')}
                            error={!!errors.name}
                            helperText={errors.name}
                            required
                            sx={{
                              '& .MuiInputLabel-root': { fontWeight: 600 },
                            }}
                          />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <TextField
                            fullWidth
                            label={`${t('homepage.contact.online-form.email', '電子郵件')} *`}
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange('email')}
                            error={!!errors.email}
                            helperText={errors.email}
                            required
                            sx={{
                              '& .MuiInputLabel-root': { fontWeight: 600 },
                            }}
                          />
                        </Box>
                      </Box>

                      {/* Description */}
                      <Box>
                        <TextField
                          fullWidth
                            label={`${t('homepage.contact.online-form.description', '需求描述')} *`}
                          multiline
                          rows={4}
                          value={formData.description}
                          onChange={handleInputChange('description')}
                          error={!!errors.description}
                          helperText={errors.description}
                          required
                          placeholder={t('homepage.contact.online-form.description', '請詳細描述您的需求或合作意向...')}
                          sx={{
                            '& .MuiInputLabel-root': { fontWeight: 600 },
                          }}
                        />
                      </Box>

                      {/* Submit Button */}
                      <Box sx={{ mt: 2 }}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            disabled={isSubmitting}
                            startIcon={
                              isSubmitting ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                  <SendIcon />
                                </motion.div>
                              ) : (
                                <SendIcon />
                              )
                            }
                            sx={{
                              py: 2,
                              fontSize: '1.1rem',
                              fontWeight: 700,
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              borderRadius: 3,
                              textTransform: 'none',
                              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                                boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
                                transform: 'translateY(-2px)',
                              },
                              '&:disabled': {
                                background: 'rgba(0, 0, 0, 0.12)',
                                color: 'rgba(0, 0, 0, 0.26)',
                              },
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                          >
                            {isSubmitting ? t('homepage.contact.online-form.submitting', '送出中...') : `🚀 ${t('homepage.contact.online-form.submit', '送出表單')}`}
                          </Button>
                        </motion.div>
                      </Box>
                    </Box>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Fade in={showSuccess}>
          <Alert
            onClose={() => setShowSuccess(false)}
            severity="success"
            sx={{
              width: '100%',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
            icon={<CheckIcon />}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                ✅
              </motion.div>
              <Typography sx={{ ml: 1, fontWeight: 600 }}>
                {t('homepage.contact.online-form.success', '表單已成功送出！我們會盡快與您聯繫。')}
              </Typography>
            </Box>
          </Alert>
        </Fade>
      </Snackbar>
    </Box>
  );
};

export default ContactSection;
