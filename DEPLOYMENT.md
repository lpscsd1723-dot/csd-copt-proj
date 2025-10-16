# 🚀 部署指南

## GitHub Actions 自動部署

### 1. GitHub Pages 部署 (推薦)

**最簡單的部署方式，完全免費**

1. 推送程式碼到 GitHub
2. 在 GitHub 專案設定中啟用 Pages：
   - 前往 Settings → Pages
   - Source 選擇 "GitHub Actions"
3. 每次推送到 main/master 分支就會自動部署

**網址格式：** `https://你的用戶名.github.io/專案名稱`

### 2. Netlify 部署

**需要設定環境變數：**

1. 在 Netlify 建立新專案
2. 在 GitHub 專案設定中添加 Secrets：
   - `NETLIFY_AUTH_TOKEN`: 從 Netlify 帳號設定取得
   - `NETLIFY_SITE_ID`: 從 Netlify 專案設定取得

### 3. Vercel 部署

**需要設定環境變數：**

1. 在 Vercel 建立新專案
2. 在 GitHub 專案設定中添加 Secrets：
   - `VERCEL_TOKEN`: 從 Vercel 帳號設定取得
   - `ORG_ID`: 從 Vercel 專案設定取得
   - `PROJECT_ID`: 從 Vercel 專案設定取得

## 手動部署

如果不想使用 GitHub Actions，可以手動部署：

```bash
# 1. 建置專案
npm run build

# 2. 部署到 GitHub Pages
npx gh-pages -d build

# 3. 或使用現有的部署腳本
./deploy.sh
```

## 環境變數設定

### GitHub Secrets 設定步驟：

1. 前往 GitHub 專案頁面
2. 點擊 Settings → Secrets and variables → Actions
3. 點擊 "New repository secret"
4. 添加需要的環境變數

### 必要的 Secrets：

**GitHub Pages (預設已包含)：**
- 不需要額外設定

**Netlify：**
- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

**Vercel：**
- `VERCEL_TOKEN`
- `ORG_ID`
- `PROJECT_ID`

## 部署流程

1. **推送到 main/master 分支** → 自動觸發部署
2. **手動觸發** → 在 Actions 頁面點擊 "Run workflow"
3. **Pull Request** → 自動建置和測試，但不部署

## 故障排除

### 常見問題：

1. **建置失敗**
   - 檢查 `package.json` 中的 scripts
   - 確認所有依賴都已安裝

2. **部署失敗**
   - 檢查 GitHub Pages 設定
   - 確認 Secrets 設定正確

3. **網址無法訪問**
   - 等待 5-10 分鐘讓 DNS 更新
   - 檢查 GitHub Pages 設定中的網址

### 檢查部署狀態：

1. 前往 GitHub 專案的 Actions 頁面
2. 查看最新的 workflow 執行結果
3. 點擊失敗的步驟查看詳細錯誤訊息
