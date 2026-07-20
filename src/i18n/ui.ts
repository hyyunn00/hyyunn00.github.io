export const defaultLang = 'zh-TW' as const;
export const locales = ['zh-TW', 'en'] as const;
export type Locale = (typeof locales)[number];

export const ui = {
  'zh-TW': {
    siteTitle: '黃苡恩',
    siteSubtitle: 'I-EN HUANG',
    nav: {
      home: 'HOME',
      homeSub: '首頁',
      work: 'WORK',
      workSub: '作品',
      journal: 'JOURNAL',
      journalSub: '文章',
      about: 'ABOUT',
      aboutSub: '關於',
      contact: 'CONTACT',
      contactSub: '聯絡',
    },
    hero: {
      eyebrow: 'Photography · Visual Notes — 攝影與影像紀錄',
      titleLine1: '用鏡頭校準光，',
      titleLine2: '用資訊校準想法。',
      body: '我是黃苡恩，一半時間拿相機，一半時間讀數據——大學念的是醫學工程裡的資訊組，但真正讓我停下腳步的，始終是取景框裡那道光。這裡記錄我拍的、寫的，還有正在琢磨的事。',
      cta: '看作品',
      ctaSecondary: '閱讀最新文章',
    },
    section: {
      work: '近期作品',
      workEn: 'Selected Work',
      workViewAll: '全部作品',
      journal: '文章',
      journalEn: 'Journal',
      journalViewAll: '全部文章',
      about: '關於',
      aboutEn: 'About',
    },
    about: {
      lede: '我在快門與程式碼之間來回切換，兩者其實都在做同一件事：把模糊的東西，對焦成看得懂的樣子。',
      body1: '目前專注於街拍與人像，偶爾接案。大學念的是醫學工程裡的資訊組，寫程式、跑數據曾是日常；後來發現自己真正停不下來想的，是取景框裡那道光。',
      body2: '這個網站記錄我拍的、寫的，還有正在琢磨的事。歡迎聊合作、聊攝影，或單純想打聲招呼。',
      tags: ['PHOTOGRAPHY', 'BIOMEDICAL INFORMATICS', 'TAIPEI'],
      exhibitionsTitle: '展覽',
      exhibitionsTitleEn: 'Exhibitions',
      experienceTitle: '學經歷',
      experienceTitleEn: 'Education & Experience',
    },
    contact: {
      lede: '想合作、想聊攝影，或單純想打聲招呼，都歡迎寫信給我。',
      formName: '姓名',
      formEmail: 'Email',
      formMessage: '訊息',
      formSubmit: '送出',
      formNote: '表單透過 Formspree 寄送，我會盡快回覆。',
      social: '也可以在這裡找到我',
    },
    footer: {
      rights: '版權所有',
    },
    work: {
      backToAll: '← 回到全部作品',
    },
    journal: {
      backToAll: '← 回到全部文章',
    },
    search: {
      title: '搜尋',
      placeholder: '搜尋作品、文章⋯⋯',
    },
    themeToggle: '切換深色 / 淺色',
    menuToggle: '選單',
  },
  en: {
    siteTitle: 'I-EN HUANG',
    siteSubtitle: '黃苡恩',
    nav: {
      home: 'HOME',
      homeSub: 'Home',
      work: 'WORK',
      workSub: 'Work',
      journal: 'JOURNAL',
      journalSub: 'Journal',
      about: 'ABOUT',
      aboutSub: 'About',
      contact: 'CONTACT',
      contactSub: 'Contact',
    },
    hero: {
      eyebrow: 'Photography · Visual Notes',
      titleLine1: 'Calibrating light with a lens,',
      titleLine2: 'calibrating ideas with data.',
      body: "I'm I-EN HUANG — half my time behind a camera, half in data. I studied informatics within biomedical engineering, but what actually stops me in my tracks is still the light inside a viewfinder. This is where I keep what I shoot, what I write, and what I'm still working out.",
      cta: 'See the work',
      ctaSecondary: 'Read the latest post',
    },
    section: {
      work: 'Selected Work',
      workEn: '近期作品',
      workViewAll: 'All work',
      journal: 'Journal',
      journalEn: '文章',
      journalViewAll: 'All posts',
      about: 'About',
      aboutEn: '關於',
    },
    about: {
      lede: "I move back and forth between the shutter and the terminal. Both jobs are the same job: bringing something blurry into focus.",
      body1: "I mostly shoot street and portrait work these days, and take the occasional commission. I studied informatics within biomedical engineering — writing code and running data used to be daily life — until I realized what I couldn't stop thinking about was the light inside a viewfinder.",
      body2: "This site keeps what I shoot, what I write, and what I'm still working out. Always happy to talk collaboration, photography, or just to say hi.",
      tags: ['PHOTOGRAPHY', 'BIOMEDICAL INFORMATICS', 'TAIPEI'],
      exhibitionsTitle: 'Exhibitions',
      exhibitionsTitleEn: '展覽',
      experienceTitle: 'Education & Experience',
      experienceTitleEn: '學經歷',
    },
    contact: {
      lede: "For collaborations, photography talk, or just to say hi — write to me any time.",
      formName: 'Name',
      formEmail: 'Email',
      formMessage: 'Message',
      formSubmit: 'Send',
      formNote: "This form sends through Formspree — I'll get back to you soon.",
      social: 'Find me here too',
    },
    footer: {
      rights: 'All rights reserved',
    },
    work: {
      backToAll: '← Back to all work',
    },
    journal: {
      backToAll: '← Back to all posts',
    },
    search: {
      title: 'Search',
      placeholder: 'Search work, journal…',
    },
    themeToggle: 'Toggle light / dark',
    menuToggle: 'Menu',
  },
} as const;

export function t(lang: Locale) {
  return ui[lang];
}
