# 黃苡恩 · 個人網站

用 [Astro](https://astro.build) 打造的雙語（繁中／英文）攝影作品網站，部署在 GitHub Pages。

## 上線前，你需要做的兩件事

1. **啟用 GitHub Pages**：到 repo 的 `Settings → Pages`，「Build and deployment」→ Source 選擇 **GitHub Actions**。之後每次把改動 push 到 `main`，網站就會自動重新建置、部署。
2. **設定聯絡表單**：這個網站用免費的 [Formspree](https://formspree.io) 收表單訊息。註冊帳號、建立一個表單後，把拿到的表單 ID 貼到 [src/components/views/ContactPage.astro](src/components/views/ContactPage.astro) 裡的 `FORMSPREE_ID`（目前是 `YOUR_FORM_ID` 佔位字）。同一個檔案裡的 `mailto:hello@example.com` 和 Instagram／Behance 連結也要換成你自己的。

## 怎麼新增一篇作品或文章（不用寫程式）

內容都是 Markdown 檔案，每篇作品／文章需要**中文版＋英文版各一個檔案**，檔名要一樣（這樣網站才知道兩篇是對應翻譯）。最簡單的做法：直接在 GitHub 網頁上編輯（開啟檔案 → 鉛筆圖示 → 改內容 → Commit），不需要在電腦上裝任何東西。

**新增作品**：在 `src/content/work/zh/` 和 `src/content/work/en/` 各加一個檔案，例如 `my-photo.md`：

```md
---
title: 作品標題
frameNo: "10"
date: 2026-07-01
location: 臺北
settings: f/2.8 · 35mm
cover: a
---

這裡寫這張照片的故事或想法。
```

- `frameNo`：顯示在照片左上角的編號，自己遞增就好（"10"、"11"...）
- `cover`：目前照片還是佔位色塊，`cover` 選 `a` 到 `f` 六種顏色其中一種。等你有真的照片之後，可以請人幫忙把 `ProofFrame.astro` 和 `WorkGrid.astro` 改成讀取真的圖片檔（放進 `public/photos/` 之類的資料夾）。

**新增文章**：在 `src/content/journal/zh/` 和 `src/content/journal/en/` 各加一個檔案：

```md
---
title: 文章標題
date: 2026-07-01
excerpt: 一兩句話的摘要，會顯示在列表頁。
---

文章內文，可以分段落寫。
```

存檔（commit）之後，GitHub Actions 會自動重新建置並更新網站，通常幾分鐘內就會上線。

## 上傳照片的注意事項

這是純靜態網站，**沒有自動壓縮圖片**的功能——上傳多大的檔案，網站就會原封不動載入多大，所以照片最好自己先處理過再上傳。

- **個人照（About 頁）**：放在 `public/images/portrait.jpg`。顯示框是固定 4:5 比例、用裁切置中的方式填滿，所以照片不用剛好是 4:5，任何比例都可以，系統會自動裁切。建議至少 **800×1000px**（螢幕是 Retina 顯示，太小會模糊）；如果照片主體（例如臉）沒有置中，裁切後可能被切到，需要的話可以再請人調整裁切位置。
- **作品照片**（之後要換掉 `cover` 色塊時）：建議長邊 **1600–2000px** 就足夠網頁使用，不需要放相機原始檔。
- **檔案大小**：建議每張壓縮到 **500KB 以下**，最多不要超過 1–2MB，網站才不會載入太慢。可以用「預覽」App 直接輸出較小的 JPG，或用 [Squoosh](https://squoosh.app)（免費線上工具）壓縮。
- **格式**：JPG 或 WebP 皆可，一般照片用 JPG 就好。
- **GitHub 的硬性上限**：單一檔案超過 100MB 會直接被拒絕上傳，超過 50MB 會跳警告——但這遠超過網站實際需要的大小，正常壓縮過的照片不會碰到這個問題。

## 想改文字、導覽列、頁尾

大部分固定文字（導覽列、按鈕文字、關於頁的自我介紹等）都集中在 [src/i18n/ui.ts](src/i18n/ui.ts) 這一個檔案，中英文對照著寫，改這裡最快。

## 本機開發

```sh
npm install
npm run dev       # 本機預覽：http://localhost:4321
npm run build     # 建置正式版到 ./dist（也會順便產生搜尋索引）
npm run preview   # 預覽建置後的成果
```

## 專案結構

```text
src/
├── content/           作品與文章的 Markdown 內容（zh / en 各一份，檔名需對應）
├── content.config.ts  內容欄位的規則定義
├── i18n/ui.ts         介面文字（中英對照）
├── layouts/           網站外框（<head>、字型、深淺色主題）
├── components/        導覽列、頁尾、照片框、格狀作品牆等元件
│   └── views/         每個頁面的實際內容（首頁／作品／文章／關於／聯絡／搜尋）
└── pages/              路由：中文版在根目錄，英文版在 /en/ 底下
```

## 技術重點

- **雙語**：中文為預設語言（網址不加前綴），英文在 `/en/` 底下。
- **搜尋**：用 [Pagefind](https://pagefind.app) 在建置時產生靜態搜尋索引，不需要後端伺服器。
- **深／淺色主題**：右上角太陽圖示切換，設定會存在瀏覽器 `localStorage`。
- **部署**：`.github/workflows/deploy.yml`，push 到 `main` 就會自動建置並發布到 GitHub Pages。
