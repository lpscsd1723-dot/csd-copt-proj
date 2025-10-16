# GitHub Pages 自動部署設定

## 已完成的設定

1. ✅ 建立 GitHub Actions workflow (`.github/workflows/deploy.yml`)
2. ✅ 更新 `package.json` 的 `homepage` 設定
3. ✅ 設定自動部署到 GitHub Pages

## 需要在 GitHub 上完成的設定

### 1. 啟用 GitHub Pages
1. 進入你的 repository: `https://github.com/lpscsd1723-dot/csd-copt-proj`
2. 點擊 **Settings** 標籤
3. 左側選單找到 **Pages**
4. 在 **Source** 選擇 **GitHub Actions**

### 2. 推送程式碼
```bash
git add .
git commit -m "Add GitHub Actions for auto deployment"
git push origin main
```

### 3. 檢查部署狀態
- 進入 repository 的 **Actions** 標籤
- 查看 workflow 執行狀態
- 部署成功後，網站會在 `https://lpscsd1723-dot.github.io/csd-copt-proj` 上線

## 自動部署流程

每次推送到 `main` 分支時，GitHub Actions 會：
1. 自動安裝 Node.js 和依賴套件
2. 執行 `npm run build` 建立靜態檔案
3. 自動部署到 GitHub Pages

## 注意事項

- 確保 repository 是 public 或已啟用 GitHub Pages 的 private repository
- 第一次部署可能需要幾分鐘時間
- 如果部署失敗，檢查 Actions 標籤中的錯誤訊息
