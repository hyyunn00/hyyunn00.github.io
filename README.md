# 黃苡恩 · 個人網站

用 [Astro](https://astro.build) 打造的雙語（繁中／英文）攝影作品網站，部署在 GitHub Pages。

## 上線前，你需要做的兩件事

1. **啟用 GitHub Pages**：到 repo 的 `Settings → Pages`，「Build and deployment」→ Source 選擇 **GitHub Actions**。之後每次把改動 push 到 `main`，網站就會自動重新建置、部署。
2. **設定聯絡表單**：這個網站用免費的 [Formspree](https://formspree.io) 收表單訊息。註冊帳號、建立一個表單後，把拿到的表單 ID 貼到 [src/components/views/ContactPage.astro](src/components/views/ContactPage.astro) 裡的 `FORMSPREE_ID`（目前是 `YOUR_FORM_ID` 佔位字）。

## 怎麼編輯內容

有兩種方式，效果一樣，選一種順手的就好：

- **方式 A：視覺化後台**（像 Behance 專案編輯器那樣，用表單＋區塊清單操作，推薦）
- **方式 B：直接在 GitHub 網頁上改 Markdown 檔案**（不用裝東西，但要自己寫 YAML 格式）

兩種方式改的是同一批檔案，可以交替使用。

### 方式 A：視覺化後台（Decap CMS）

這是跑在你自己電腦上的後台，不需要額外的伺服器或帳號設定：

```sh
npm run dev   # 開一個終端機視窗，啟動網站本機預覽
npm run cms   # 再開一個終端機視窗，啟動後台
```

兩個都跑起來之後，瀏覽器打開 **http://localhost:4321/admin/index.html**（本機開發模式下要打完整的 `index.html`，正式上線後 `/admin/` 就可以直接用）。會直接進入後台，不用輸入帳號密碼（因為是在你自己電腦上跑）。

後台裡可以：
- 新增／編輯「作品」「文章」，中英文版本在同一個畫面左右對照著填
- 在「作品」的「內容區塊 Blocks」裡新增／刪除／拖曳排序區塊，每個區塊可以選：
  - **文字 Text**：一段文字說明
  - **單張照片 Photo**：一張照片 + 說明文字
  - **多張照片／拼貼 Gallery**：一組照片（2 張以上），會排成格狀
  - **嵌入內容 Embed**：貼 YouTube／Vimeo 等的「嵌入用」網址（不是一般分享連結）
- 直接在後台上傳照片，會自動存到 `public/images/uploads/`
- 勾選「作品」的**首頁大圖精選 Featured**／**顯示在首頁「近期作品」Show in homepage grid**，控制首頁要放哪張大圖、下面的格子要放哪幾篇。都不勾的話會自動顯示最新的作品，不會壞掉；大圖跟格子不會重複顯示同一篇。
  - `coverImage` 只用在列表縮圖跟首頁，作品內頁（點進去看到的那頁）不會再顯示一次封面照，只有標題、拍攝資訊跟內容區塊。
- 編輯「關於頁資料」裡的「展覽 Exhibitions」「學經歷 Education & Experience」——這兩個清單會顯示在 About 頁面，一筆一筆列出年份、名稱、地點／備註，新增／刪除／排序都在後台操作

改完的內容會直接寫進本機的檔案（跟你自己用編輯器改檔案一樣），git 還是要照平常的方式 commit / push。

**如果之後想從其他電腦或手機編輯**（不只是自己這台）：需要另外申請一個 GitHub OAuth App，並架設一個小型的 OAuth proxy（例如免費的 Cloudflare Worker）。這是額外的基礎設施，目前沒有設定，需要的話再告訴我。

### 方式 B：直接編輯 Markdown 檔案

內容都是 Markdown 檔案，每篇作品／文章需要**中文版＋英文版各一個檔案**，路徑在 `src/content/work/zh/` 對 `src/content/work/en/`（文章則是 `src/content/journal/`），**檔名要一樣**，網站才知道兩篇是對應翻譯。可以直接在 GitHub 網頁上編輯（開啟檔案 → 鉛筆圖示 → 改內容 → Commit）。

**新增作品**：例如 `my-photo.md`：

```md
---
title: 作品標題
frameNo: "10"
date: 2026-07-01
location: 臺北
settings: f/2.8 · 35mm
cover: a
coverImage: /images/uploads/my-photo-cover.jpg # 選填，有真實照片才需要
blocks:
  - type: text
    body: |
      這裡寫這張照片的故事或想法，可以分好幾段。

      這是第二段。
  - type: photo
    src: /images/uploads/my-photo-1.jpg
    alt: 照片的簡短描述
    caption: 選填的說明文字
  - type: gallery
    images:
      - src: /images/uploads/my-photo-2.jpg
        alt: 照片描述
      - src: /images/uploads/my-photo-3.jpg
        alt: 照片描述
    caption: 選填的說明文字
  - type: embed
    url: https://www.youtube.com/embed/xxxxxxxx
    aspect: '16/9'
---
```

- `frameNo`：顯示在照片左上角的編號，自己遞增就好（"10"、"11"...）
- `cover`：列表頁縮圖還沒有真實照片時顯示的佔位色塊，`a` 到 `f` 六種顏色選一個
- `coverImage`：選填。有填的話，列表頁和首頁會直接顯示這張照片，不用佔位色塊
- `blocks`：內容區塊陣列，依序排列，四種類型可以任意混搭、重複使用（例如兩段文字中間插一張照片）——這正是方式 A 後台在背後編輯的東西，兩種方式改的是同一個欄位

**新增文章**（跟之前一樣，沒有 blocks，就是一般的 Markdown 內文）：

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
- **作品照片**：用後台上傳的話會自動存到 `public/images/uploads/`；手動放檔案的話放哪裡都可以，只要路徑對得上 `src` / `coverImage` 欄位。建議長邊 **1600–2000px** 就足夠網頁使用，不需要放相機原始檔。
- **檔案大小**：建議每張壓縮到 **500KB 以下**，最多不要超過 1–2MB，網站才不會載入太慢。可以用「預覽」App 直接輸出較小的 JPG，或用 [Squoosh](https://squoosh.app)（免費線上工具）壓縮。
- **格式**：JPG 或 WebP 皆可，一般照片用 JPG 就好。
- **GitHub 的硬性上限**：單一檔案超過 100MB 會直接被拒絕上傳，超過 50MB 會跳警告——但這遠超過網站實際需要的大小，正常壓縮過的照片不會碰到這個問題。

### 一鍵壓縮：`scripts/compress-images.py`

不想每張手動用 Squoosh 壓的話，有一支小工具可以把整個資料夾的照片自動壓到指定大小以下（預設 1MB，超過的才會處理，已經夠小的會跳過）：

```sh
pip3 install pillow          # 只需要裝一次
npm run compress-images                          # 處理 public/images/uploads/，壓到 1MB 以下
npm run compress-images -- public/images         # 處理其他資料夾
npm run compress-images -- --max-mb 0.5          # 改成 0.5MB
npm run compress-images -- --dry-run             # 先預覽會怎麼壓，不實際寫檔
```

運作方式：先用畫質 90 試壓成 JPG，太大的話逐步降畫質；還是太大就把長邊縮小重試，直到符合目標大小或降到最小 600px 為止。`.jpg`／`.jpeg` 會保留原檔名覆蓋；`.png`／`.webp` 會轉成 `.jpg`（檔名跟著變，如果該圖片已經被某篇文章的 `src` 欄位引用，記得同步更新路徑）。

## 想改文字、導覽列、頁尾

大部分固定文字（導覽列、按鈕文字、關於頁的自我介紹等）都集中在 [src/i18n/ui.ts](src/i18n/ui.ts) 這一個檔案，中英文對照著寫，改這裡最快。

## 本機開發

```sh
npm install
npm run dev       # 本機預覽：http://localhost:4321
npm run cms       # 啟動視覺化後台（要跟 dev 一起跑）
npm run build     # 建置正式版到 ./dist（也會順便產生搜尋索引）
npm run preview   # 預覽建置後的成果
```

## 專案結構

```text
public/
└── admin/             視覺化後台（Decap CMS）設定：index.html + config.yml
src/
├── content/           作品與文章的 Markdown 內容（zh / en 各一份，檔名需對應）
├── content.config.ts  內容欄位的規則定義（含作品的 blocks 區塊格式）
├── i18n/ui.ts         介面文字（中英對照）
├── layouts/           網站外框（<head>、字型、深淺色主題）
├── components/        導覽列、頁尾、照片框、格狀作品牆、區塊渲染等元件
│   └── views/         每個頁面的實際內容（首頁／作品／文章／關於／聯絡／搜尋）
└── pages/              路由：中文版在根目錄，英文版在 /en/ 底下
```

## 技術重點

- **雙語**：中文為預設語言（網址不加前綴），英文在 `/en/` 底下。
- **作品內容**：區塊式（文字／照片／拼貼／嵌入），定義在 `content.config.ts`，由 `WorkBlocks.astro` 渲染。
- **後台**：[Decap CMS](https://decapcms.org)，本機用 `local backend`（`decap-server`）運作，不需要 OAuth 或額外服務。
- **搜尋**：用 [Pagefind](https://pagefind.app) 在建置時產生靜態搜尋索引，不需要後端伺服器。
- **深／淺色主題**：右上角太陽圖示切換，設定會存在瀏覽器 `localStorage`。
- **部署**：`.github/workflows/deploy.yml`，push 到 `main` 就會自動建置並發布到 GitHub Pages。
