#!/bin/bash

# 中衛中心前瞻服務部網頁部署腳本

echo "🚀 開始建置中衛中心前瞻服務部網頁..."

# 安裝依賴
echo "📦 安裝依賴套件..."
npm install

# 建置生產版本
echo "🔨 建置生產版本..."
npm run build

# 檢查建置結果
if [ -d "build" ]; then
    echo "✅ 建置成功！"
    echo "📁 建置檔案位於 build/ 目錄"
    echo "🌐 可以將 build/ 目錄內容部署到任何靜態託管服務"
    echo ""
    echo "部署選項："
    echo "1. Netlify: 直接拖拽 build/ 目錄到 Netlify"
    echo "2. Vercel: 使用 vercel 命令或連接 GitHub"
    echo "3. GitHub Pages: 上傳到 gh-pages 分支"
    echo "4. 其他靜態託管: 上傳 build/ 目錄內容"
else
    echo "❌ 建置失敗，請檢查錯誤訊息"
    exit 1
fi

echo "🎉 部署準備完成！"
