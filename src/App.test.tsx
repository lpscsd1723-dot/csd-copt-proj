import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock i18next for testing
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: string) => fallback || key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'zh-TW',
      resolvedLanguage: 'zh-TW'
    }
  })
}));

// Mock all components to avoid complex rendering issues
jest.mock('./components/Navigation', () => {
  return function MockNavigation() {
    return <div data-testid="navigation">中衛中心 - 前瞻服務部</div>;
  };
});

jest.mock('./components/HeroSection', () => {
  return function MockHeroSection() {
    return <div data-testid="hero">Hero Section</div>;
  };
});

jest.mock('./components/CenterHistory', () => {
  return function MockCenterHistory() {
    return <div data-testid="center-history">Center History</div>;
  };
});

jest.mock('./components/DepartmentIntro', () => {
  return function MockDepartmentIntro() {
    return <div data-testid="department-intro">Department Intro</div>;
  };
});

jest.mock('./components/EnhancedServicesSection', () => {
  return function MockEnhancedServicesSection() {
    return <div data-testid="services">Services</div>;
  };
});

jest.mock('./components/InsightsSection', () => {
  return function MockInsightsSection() {
    return <div data-testid="insights">Insights</div>;
  };
});

jest.mock('./components/ContactSection', () => {
  return function MockContactSection() {
    return <div data-testid="contact">Contact</div>;
  };
});

import App from './App';

test('renders CSD website', () => {
  render(<App />);
  // 測試是否渲染了中衛中心相關內容
  const brandElement = screen.getByText(/中衛中心/i);
  expect(brandElement).toBeInTheDocument();
});
