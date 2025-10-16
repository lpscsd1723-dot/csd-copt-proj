# 中衛中心 - 前瞻服務部 形象網頁

這是一個基於 React + TypeScript + Material-UI 的一頁式形象網頁，展示中衛中心前瞻服務部的服務內容與發展歷程。

## 🚀 功能特色

### 📱 響應式設計
- 支援手機、平板、桌機等各種裝置
- 自適應佈局與互動體驗

### 🎨 視覺設計
- 現代化漸層背景與動畫效果
- 時間軸滾動漸層效果
- 卡片式內容呈現
- 豐富的圖示與 emoji 搭配

### 🧭 導航功能
- 漢堡選單設計（手機版）
- 錨點導航，點擊直接跳轉到對應區塊
- 部門介紹下拉選單

### 📋 內容區塊
1. **Hero 區塊** - 主視覺與 Slogan
2. **中心成立背景** - 歷史沿革與成立背景
3. **中心發展歷程** - 時間軸展示四個重要發展階段
4. **部門介紹**
   - 部門成立背景與發展歷程（可收合）
   - 部門架構與業務（四大組別）
   - 四大服務專區（Tab 切換）
5. **洞察觀點** - 文章卡片展示
6. **聯絡我們** - 聯絡資訊與線上表單

### 🎯 互動功能
- 滾動觸發動畫
- 表單驗證與提交
- 外部連結跳轉
- 響應式圖片載入

## 🛠 技術棧

- **React 18** - 前端框架
- **TypeScript** - 類型安全
- **Material-UI v5** - UI 元件庫
- **Framer Motion** - 動畫效果
- **Emotion** - CSS-in-JS 樣式

## 📦 安裝與執行

### 環境需求
- Node.js 16+ 
- npm 或 yarn

### 安裝依賴
```bash
npm install
```

### 開發模式
```bash
npm start
```
開啟 http://localhost:3000 查看網頁

### 建置生產版本
```bash
npm run build
```

## 📁 專案結構

```
src/
├── components/           # React 元件
│   ├── Navigation.tsx   # 導航元件
│   ├── HeroSection.tsx   # 主視覺區塊
│   ├── CenterHistory.tsx # 中心歷史
│   ├── DepartmentIntro.tsx # 部門介紹
│   ├── ServicesSection.tsx # 服務專區
│   ├── InsightsSection.tsx # 洞察觀點
│   └── ContactSection.tsx # 聯絡我們
├── i18n/                # 多語言資料
│   └── zh-TW.json       # 繁體中文內容
├── assets/              # 靜態資源
│   └── ref_data/        # 參考資料與圖片
├── App.tsx              # 主應用程式
├── App.css              # 全域樣式
└── index.tsx            # 應用程式入口
```

## 🎨 設計原則

### JSON 驅動的內容架構
- 所有內容來自 `i18n/zh-TW.json`
- 易於維護與更新
- 支援多語言擴展

### 響應式設計策略
- **手機版** (< 768px): 單欄佈局，大按鈕，簡化導航
- **平板版** (768px - 1024px): 雙欄佈局，適中按鈕
- **桌機版** (> 1024px): 多欄佈局，完整動畫效果

### 視覺層次設計
- 用大小、顏色、間距引導注意力
- 適當留白，避免資訊過載
- 漸進式載入，重要內容優先顯示

## 🔧 自訂設定

### 主題色彩
在 `App.tsx` 中修改 Material-UI 主題設定：

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // 主色
    },
    secondary: {
      main: '#dc004e', // 輔色
    },
  },
});
```

### 動畫設定
在元件中使用 Framer Motion 控制動畫：

```typescript
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
```

## 📝 內容更新

### 更新文字內容
直接編輯 `src/i18n/zh-TW.json` 檔案，修改對應的內容即可。

### 更新圖片
將新圖片放入 `src/assets/ref_data/img/` 目錄，並在元件中更新圖片路徑。

### 新增服務項目
在 JSON 檔案的 `services` 區塊中新增服務內容，並在 `ServicesSection.tsx` 中新增對應的渲染邏輯。

## 🚀 部署

### 建置生產版本
```bash
npm run build
```

### 部署到靜態託管
建置完成後，將 `build/` 目錄的內容上傳到任何靜態託管服務（如 Netlify、Vercel、GitHub Pages 等）。

## 📞 聯絡資訊

如有任何問題或建議，請聯絡：
- 中衛中心前瞻服務部
- 電話：02-23911368
- 信箱：info@cws.org.tw

---

**開發完成時間**: 2024年12月
**版本**: 1.0.0