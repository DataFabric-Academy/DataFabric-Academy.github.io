# 🌐 i18n Structure Guide - Data Fabric Academy

คู่มือการจัดการเนื้อหาหลายภาษา (Internationalization) สำหรับ Docusaurus

## 📋 โครงสร้างปัจจุบัน

### การตั้งค่าใน `docusaurus.config.ts`

```typescript
i18n: {
  defaultLocale: 'th',      // ภาษาเริ่มต้น: ไทย
  locales: ['th', 'en'],     // รองรับ 2 ภาษา: ไทย และ อังกฤษ
}
```

### โครงสร้างโฟลเดอร์

```
website/
├── docs/                    # เนื้อหาภาษาไทย (defaultLocale)
│   ├── intro.md
│   ├── tutorial-basics/
│   └── tutorial-extras/
│
├── i18n/                    # เนื้อหาภาษาอื่นๆ (จะสร้างเมื่อต้องการ)
│   └── en/                  # เนื้อหาภาษาอังกฤษ
│       ├── docusaurus-theme-classic/
│       │   └── nav.json     # แปล navigation
│       └── code.json        # แปล code block labels
│
└── blog/                    # Blog posts (ใช้ frontmatter สำหรับ i18n)
    └── 2025-12-10-xxx/
        └── index.md
```

## 🎯 หลักการทำงาน

### 1. Default Locale (ภาษาไทย)

- **ไฟล์ใน `docs/`** จะถูกมองว่าเป็นภาษาไทยทันที
- **URL**: `https://datafabric.academy/intro` (ไม่มี prefix `/th`)
- **ไม่ต้องสร้างโฟลเดอร์ `i18n/th/`**

### 2. ภาษาอื่นๆ (ภาษาอังกฤษ)

- **สร้างโฟลเดอร์ `i18n/en/`** เมื่อต้องการแปลเนื้อหา
- **URL**: `https://datafabric.academy/en/intro` (มี prefix `/en`)
- **Docusaurus จะสร้าง build สำหรับแต่ละภาษาแยกกัน**

## 📝 วิธีเพิ่มเนื้อหาภาษาอังกฤษ

### ขั้นตอนที่ 1: สร้างโครงสร้างโฟลเดอร์

```bash
website/
└── i18n/
    └── en/
        ├── docusaurus-theme-classic/
        │   └── nav.json          # แปล navigation items
        └── code.json             # แปล code block labels (optional)
```

### ขั้นตอนที่ 2: คัดลอกและแปลไฟล์ docs

```bash
# ตัวอย่าง: แปล intro.md
website/
├── docs/
│   └── intro.md                 # ภาษาไทย (default)
└── i18n/
    └── en/
        └── docusaurus-theme-classic/
            └── docs/
                └── intro.md      # ภาษาอังกฤษ
```

### ขั้นตอนที่ 3: แปล Navigation

สร้างไฟล์ `i18n/en/docusaurus-theme-classic/nav.json`:

```json
{
  "title": {
    "message": "Data Fabric Academy",
    "description": "The title in the navbar"
  },
  "item.label.Curriculum": {
    "message": "Curriculum",
    "description": "Navbar item with label Curriculum"
  },
  "item.label.Tech Blog": {
    "message": "Tech Blog",
    "description": "Navbar item with label Tech Blog"
  }
}
```

### ขั้นตอนที่ 4: Build และ Deploy

Docusaurus จะสร้าง build สำหรับทั้งสองภาษาอัตโนมัติ:
- `/` - ภาษาไทย (default)
- `/en/` - ภาษาอังกฤษ

## 🔄 การจัดการเนื้อหา

### หลักการสำคัญ

1. **Default Locale (th)**: เก็บใน `docs/` โดยตรง
2. **Other Locales (en)**: เก็บใน `i18n/{locale}/docusaurus-theme-classic/docs/`
3. **ไม่ต้องรื้อโครงสร้างเดิม**: เพียงแค่เพิ่มโฟลเดอร์ `i18n/` เมื่อต้องการ

### ตัวอย่างโครงสร้างเมื่อมีทั้ง 2 ภาษา

```
website/
├── docs/                              # ภาษาไทย (default)
│   ├── intro.md
│   ├── tutorial-basics/
│   │   ├── create-a-document.md
│   │   └── ...
│   └── tutorial-extras/
│       └── ...
│
└── i18n/
    └── en/
        └── docusaurus-theme-classic/
            ├── nav.json               # แปล navigation
            ├── code.json              # แปล code labels (optional)
            └── docs/                  # เนื้อหาภาษาอังกฤษ
                ├── intro.md
                ├── tutorial-basics/
                │   ├── create-a-document.md
                │   └── ...
                └── tutorial-extras/
                    └── ...
```

## 📚 Blog Posts และ i18n

สำหรับ Blog posts สามารถใช้ frontmatter เพื่อระบุภาษา:

```markdown
---
slug: my-post
title: My Post Title
authors: [author]
tags: [tag1, tag2]
locale: th  # หรือ en
---
```

หรือสร้าง blog post แยกสำหรับแต่ละภาษา:

```
blog/
├── 2025-01-15-my-post-th/
│   └── index.md          # ภาษาไทย
└── 2025-01-15-my-post-en/
    └── index.md          # ภาษาอังกฤษ
```

## 🛠️ คำสั่งที่มีประโยชน์

### สร้างไฟล์แปลอัตโนมัติ

```bash
npm run write-translations
```

คำสั่งนี้จะสแกนโค้ดและสร้างไฟล์ `i18n/en/docusaurus-theme-classic/` พร้อม keys ที่ต้องแปล

### Build สำหรับทุกภาษา

```bash
npm run build
```

Docusaurus จะ build สำหรับทุกภาษาที่ระบุใน `locales` อัตโนมัติ

## ✅ Checklist สำหรับเพิ่มภาษาใหม่

- [ ] ตั้งค่า `locales` ใน `docusaurus.config.ts`
- [ ] สร้างโฟลเดอร์ `i18n/{locale}/`
- [ ] สร้าง `i18n/{locale}/docusaurus-theme-classic/nav.json`
- [ ] คัดลอกและแปลไฟล์จาก `docs/` ไปยัง `i18n/{locale}/docusaurus-theme-classic/docs/`
- [ ] แปล navigation items
- [ ] ทดสอบ build: `npm run build`
- [ ] ตรวจสอบ URL: `/{locale}/...`

## 📖 เอกสารเพิ่มเติม

- [Docusaurus i18n Documentation](https://docusaurus.io/docs/i18n/introduction)
- [Docusaurus i18n Tutorial](https://docusaurus.io/docs/i18n/tutorial)

---

**หมายเหตุ**: โครงสร้างปัจจุบันใช้ภาษาไทยเป็น default locale ไฟล์ใน `docs/` จะถูกมองว่าเป็นภาษาไทยทันที โดยไม่ต้องสร้างโฟลเดอร์ `i18n/th/`

