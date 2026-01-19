# Obsidian Attachments Setup Guide

## 📸 การตั้งค่า Attachments ใน Obsidian

คู่มือนี้จะแนะนำการตั้งค่า Obsidian ให้รูปภาพไปลงโฟลเดอร์ `attachments` และวิธีใช้งานกับ Docusaurus

---

## ⚙️ Obsidian Settings

### ตั้งค่า Default Location for New Attachments

1. ไปที่ **Settings** → **Files & Links**
2. **Default location for new attachments**: เลือก **"In subfolder under current folder"**
3. **Subfolder name**: ตั้งเป็น **"attachments"**

**ผลลัพธ์**:
- เมื่อเพิ่มรูปภาพใน `90_Academy/main-portal/page.md`
- รูปภาพจะถูกบันทึกที่ `90_Academy/main-portal/attachments/image.png`

---

## 🔄 Sync Script Behavior

Sync script จะทำงานดังนี้:

### 1. Sync Content Files
- Copy ไฟล์ Markdown (.md) จาก `90_Academy/{course}/` → `docs-{course}/`
- **ไม่ copy** โฟลเดอร์ `attachments` (จะ sync แยก)

### 2. Sync Attachments
- Copy จาก `90_Academy/{course}/attachments/` → `static/assets/{course-name}/`
- ตัวอย่าง:
  - `90_Academy/main-portal/attachments/image.png` → `static/assets/main-portal/image.png`
  - `90_Academy/course-n8n/attachments/diagram.png` → `static/assets/course-n8n/diagram.png`

### 3. Sync Shared Assets
- Copy จาก `90_Academy/_assets/` → `static/assets/` (shared across all courses)

---

## 📝 การใช้งานใน Markdown

### Option 1: ใช้ Absolute Path (แนะนำ)

```markdown
![Image Description](/assets/main-portal/image.png)
![Diagram](/assets/course-n8n/diagram.png)
```

**ข้อดี**:
- ใช้ได้ทุกที่ในเว็บไซต์
- Path ชัดเจน
- ไม่ต้องแก้เมื่อย้ายไฟล์

### Option 2: ใช้ Relative Path

```markdown
![Image Description](../assets/main-portal/image.png)
```

**ข้อดี**:
- ใช้ได้เมื่ออยู่ใน docs folder เดียวกัน

**ข้อเสีย**:
- ต้องแก้ path เมื่อย้ายไฟล์
- อาจ broken เมื่อใช้ใน context อื่น

---

## 🎯 Best Practices

### 1. ตั้งชื่อไฟล์ให้ชัดเจน

**ดี**:
```
attachments/power-bi-dax-formula-diagram.png
attachments/sql-server-architecture.png
```

**ไม่ดี**:
```
attachments/image1.png
attachments/photo.jpg
```

### 2. ใช้ Path ที่ถูกต้อง

**ใน Obsidian**:
- รูปภาพอยู่ใน: `90_Academy/main-portal/attachments/image.png`
- Markdown reference: `![Image](attachments/image.png)`

**ใน Docusaurus** (หลัง sync):
- รูปภาพอยู่ใน: `static/assets/main-portal/image.png`
- Markdown reference: `![Image](/assets/main-portal/image.png)`

### 3. ตรวจสอบหลัง Sync

```bash
# ตรวจสอบว่า attachments ถูก sync
ls static/assets/main-portal/
ls static/assets/course-n8n/
```

---

## 🔍 Troubleshooting

### Problem: รูปภาพไม่แสดงใน Docusaurus

**ตรวจสอบ**:
1. ไฟล์ถูก sync ไปยัง `static/assets/{course-name}/` หรือไม่
2. Path ใน Markdown ถูกต้องหรือไม่
3. ใช้ `/assets/{course-name}/image.png` (absolute path)

**แก้ไข**:
```bash
# Sync ใหม่
pnpm run sync

# ตรวจสอบไฟล์
ls static/assets/main-portal/
```

---

### Problem: รูปภาพซ้ำซ้อน

**สาเหตุ**: Sync script อาจ copy attachments หลายครั้ง

**แก้ไข**:
```bash
# Clear และ sync ใหม่
pnpm run sync
```

---

### Problem: Path ไม่ถูกต้อง

**ใน Obsidian**: `![Image](attachments/image.png)`
**ใน Docusaurus**: ต้องเป็น `![Image](/assets/main-portal/image.png)`

**วิธีแก้**:
- ใช้ absolute path: `/assets/{course-name}/image.png`
- หรือแก้ path ใน Markdown หลัง sync

---

## 📊 Structure Overview

### Obsidian Vault Structure
```
90_Academy/
├── main-portal/
│   ├── page.md
│   └── attachments/
│       └── image.png
├── course-n8n/
│   ├── lesson.md
│   └── attachments/
│       └── diagram.png
└── _assets/
    └── shared-logo.png
```

### Docusaurus Structure (หลัง sync)
```
DataFabric-Academy.github.io/
├── docs/
│   └── page.md
├── docs-n8n/
│   └── lesson.md
└── static/
    └── assets/
        ├── main-portal/
        │   └── image.png
        ├── course-n8n/
        │   └── diagram.png
        └── shared-logo.png
```

---

## 🚀 Quick Reference

### Obsidian Settings
- **Default location**: "In subfolder under current folder"
- **Subfolder name**: "attachments"

### Markdown Path
- **ใน Obsidian**: `![Image](attachments/image.png)`
- **ใน Docusaurus**: `![Image](/assets/{course-name}/image.png)`

### Sync Command
```bash
pnpm run sync
# หรือ
pnpm run sync:watch
```

---

## 🔗 Related Documentation

- [Obsidian Sync Test Guide](obsidian-sync-test.md) - Sync testing
- [Development Workflow](development-workflow.md) - Dev setup
- [Troubleshooting](troubleshooting.md) - Common issues

---

**Last Updated**: 2026-01-19
