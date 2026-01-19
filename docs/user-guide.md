# คู่มือการใช้งานฉบับสมบูรณ์ - DataFabric Academy

คู่มือฉบับสมบูรณ์สำหรับการใช้งาน DataFabric Academy Documentation Site

---

## 📋 สารบัญ

1. [ภาพรวม](#ภาพรวม)
2. [การติดตั้ง](#การติดตั้ง)
3. [Daily Routine](#daily-routine)
4. [Development Workflow](#development-workflow)
5. [การจัดการเนื้อหาใน Obsidian](#การจัดการเนื้อหาใน-obsidian)
6. [การ Deploy](#การ-deploy)
7. [Troubleshooting](#troubleshooting)
8. [Quick Reference](#quick-reference)

---

## 🎯 ภาพรวม

### สถานะ: ✅ พร้อมใช้งาน

DataFabric Academy เป็นเว็บไซต์ documentation ที่สร้างด้วย Docusaurus พร้อมระบบ sync จาก Obsidian Vault

### Architecture

```
Obsidian Vault → Sync Script → Docusaurus → GitHub Actions → GitHub Pages
```

### URLs

- **Production**: https://DataFabric-Academy.github.io
- **Custom Domain**: https://datafabric.academy

### Course Structure

- **Main Portal**: `docs/` → `/`
- **Course n8n**: `docs-n8n/` → `/course-n8n`
- **Course Power BI**: `docs-power-bi/` → `/course-power-bi`
- **Course MS SQL**: `docs-ms-sql/` → `/course-ms-sql`

---

## 🚀 การติดตั้ง

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0
- **Git**
- **Obsidian** (สำหรับจัดการเนื้อหา)

### Installation Steps

```bash
# 1. Clone repository
git clone https://github.com/DataFabric-Academy/DataFabric-Academy.github.io.git
cd DataFabric-Academy.github.io

# 2. Install dependencies
pnpm install

# 3. ตรวจสอบ Obsidian Vault Path
# Default: D:\Obsidian\Knowledge-Fabric-Vault
# หรือตั้งค่า environment variable:
# $env:OBSIDIAN_VAULT="D:\Your\Vault\Path"
```

### ตรวจสอบการติดตั้ง

```bash
# ทดสอบ sync script
pnpm run sync

# ทดสอบ build
pnpm run build

# ทดสอบ dev server
pnpm run start
```

---

## 📅 Daily Routine

### 🌅 เช้า (เริ่มงาน)

#### 1. เปิด Terminal และ Sync Content

```bash
# Terminal 1: Sync Watch Mode
cd d:\dev\github\DataFabric-Academy\DataFabric-Academy.github.io
pnpm run sync:watch
```

**ผลลัพธ์**:
```
👀 Watch mode enabled - watching for file changes...
Watching 5 paths...
Press Ctrl+C to stop watching.
```

#### 2. เปิด Dev Server

```bash
# Terminal 2: Dev Server
cd d:\dev\github\DataFabric-Academy\DataFabric-Academy.github.io
pnpm run start
```

**ผลลัพธ์**:
```
[INFO] Starting the development server...
[SUCCESS] Docusaurus website is running at: http://localhost:3000/
```

#### 3. เปิด Browser

- ไปที่: **http://localhost:3000/**
- เปิด Obsidian Vault: `D:\Obsidian\Knowledge-Fabric-Vault`

---

### 📝 ระหว่างวัน (ทำงาน)

#### Workflow: แก้ไขเนื้อหา

1. **แก้ไขใน Obsidian**
   - เปิดไฟล์ใน `90_Academy/main-portal/` หรือ course folders
   - แก้ไขเนื้อหา
   - บันทึกไฟล์ (Save)

2. **Auto-Sync**
   - Terminal 1 จะแสดง:
     ```
     📝 File changed: intro.md
     📦 Syncing main-portal...
       ✓ Content: main-portal → docs
       ✅ main-portal sync complete
     ```

3. **Auto-Reload**
   - Terminal 2 (Dev Server) จะ auto-reload
   - Browser จะ refresh อัตโนมัติ
   - ดูผลลัพธ์ทันที! ✨

#### Workflow: เพิ่มรูปภาพ

1. **ใน Obsidian**
   - Drag & drop รูปภาพลงใน Markdown file
   - Obsidian จะบันทึกที่ `attachments/` folder อัตโนมัติ
   - ใช้ Wiki Link: `![[image.jpg]]`

2. **Sync**
   - Sync script จะแปลง `![[image.jpg]]` → `![image](/assets/{course-name}/image.jpg)`
   - Copy รูปภาพไปยัง `static/assets/{course-name}/`

3. **ตรวจสอบ**
   - ดูผลลัพธ์ที่ http://localhost:3000/
   - ตรวจสอบว่ารูปภาพแสดงถูกต้อง

---

### 🌆 เย็น (ก่อนเลิกงาน)

#### 1. Sync ครั้งสุดท้าย

```bash
# ใน Terminal 1 (ถ้ายังรันอยู่)
# กด Ctrl+C เพื่อหยุด watch mode

# Sync ครั้งสุดท้าย
pnpm run sync
```

#### 2. ตรวจสอบ Build

```bash
# Build เพื่อตรวจสอบว่าไม่มี error
pnpm run build
```

**ตรวจสอบ**:
- [ ] Build สำเร็จ
- [ ] ไม่มี broken links
- [ ] ไม่มี error messages

#### 3. Commit และ Push

```bash
# ตรวจสอบการเปลี่ยนแปลง
git status

# เพิ่มไฟล์ที่เปลี่ยนแปลง
git add .

# Commit
git commit -m "docs: update content - [วันที่]"

# Push
git push origin master
```

#### 4. ตรวจสอบ Deployment

- ไปที่: https://github.com/DataFabric-Academy/DataFabric-Academy.github.io/actions
- ตรวจสอบว่า GitHub Actions workflow ทำงาน
- รอ 2-5 นาที
- ตรวจสอบเว็บไซต์: https://DataFabric-Academy.github.io

---

### 📋 Daily Checklist

**เช้า**:
- [ ] เปิด sync watch mode
- [ ] เปิด dev server
- [ ] เปิด browser (http://localhost:3000/)

**ระหว่างวัน**:
- [ ] แก้ไขเนื้อหาใน Obsidian
- [ ] ตรวจสอบผลลัพธ์ที่ browser
- [ ] Sync attachments (ถ้ามี)

**เย็น**:
- [ ] Sync ครั้งสุดท้าย
- [ ] Build และตรวจสอบ
- [ ] Commit และ push
- [ ] ตรวจสอบ deployment

---

## 🔄 Development Workflow

### Setup สำหรับ Development

#### Terminal 1: Sync Watch Mode

```bash
pnpm run sync:watch
```

**หน้าที่**:
- Watch การเปลี่ยนแปลงใน Obsidian Vault
- Auto-sync ไฟล์ไปยัง `docs/`, `docs-n8n/`, etc.
- **ไม่รัน web server**

#### Terminal 2: Dev Server

```bash
pnpm run start
```

**หน้าที่**:
- รัน Docusaurus development server
- เปิดเว็บไซต์ที่ **http://localhost:3000/**
- Hot reload เมื่อไฟล์ใน docs folders เปลี่ยน

### Workflow Patterns

#### Pattern 1: Development with Obsidian (แนะนำ)

**Setup**:
- Terminal 1: `pnpm run sync:watch`
- Terminal 2: `pnpm run start`
- Browser: http://localhost:3000/

**Workflow**:
1. แก้ไขใน Obsidian → Save
2. Sync script auto-sync
3. Dev server auto-reload
4. Browser auto-refresh
5. ดูผลลัพธ์ทันที! ✨

#### Pattern 2: One-Time Sync

**Setup**:
```bash
# Sync ครั้งเดียว
pnpm run sync

# รัน dev server
pnpm run start
```

**Workflow**:
1. Sync ครั้งเดียว
2. รัน dev server
3. แก้ไขใน Obsidian
4. Sync ใหม่เมื่อต้องการ: `pnpm run sync` (ใน terminal ใหม่)

#### Pattern 3: Direct Edit (ไม่แนะนำ)

**Setup**:
```bash
# ไม่ต้องรัน sync script
pnpm run start
```

**Workflow**:
1. แก้ไขไฟล์ใน `docs/`, `docs-n8n/`, etc. โดยตรง
2. Dev server auto-reload
3. Browser auto-refresh

**หมายเหตุ**: การแก้ไขนี้จะถูก overwrite เมื่อ sync จาก Obsidian อีกครั้ง

---

## 📝 การจัดการเนื้อหาใน Obsidian

### โครงสร้าง Vault

```
Knowledge-Fabric-Vault/
└── 90_Academy/
    ├── main-portal/          # Main portal docs
    │   ├── intro.md
    │   ├── page.md
    │   └── attachments/      # Course-specific attachments
    │       └── image.png
    ├── course-n8n/           # Course n8n docs
    │   ├── intro.md
    │   └── attachments/
    ├── course-power-bi/       # Course Power BI docs
    │   ├── intro.md
    │   └── attachments/
    ├── course-ms-sql/        # Course MS SQL docs
    │   ├── intro.md
    │   └── attachments/
    └── _assets/              # Shared assets (images, etc.)
        └── logo.png
```

### การตั้งค่า Obsidian

#### 1. Attachment Settings

**Settings** → **Files & Links**:
- **Default location for new attachments**: "In subfolder under current folder"
- **Subfolder name**: "attachments"

**ผลลัพธ์**:
- รูปภาพจะถูกบันทึกที่ `{course}/attachments/` อัตโนมัติ

#### 2. การใช้ Wiki Links

**รูปภาพ**:
```markdown
![[asus.jpg]]
![[image.jpg|Alt Text]]
```

**หลัง Sync**:
- `![[asus.jpg]]` → `![asus](/assets/{course-name}/asus.jpg)`
- `![[image.jpg|Alt Text]]` → `![Alt Text](/assets/{course-name}/image.jpg)`

**Internal Links**:
```markdown
[[Another Page]]
[[Another Page|Display Text]]
```

---

### การ Sync Content

#### One-Time Sync

```bash
pnpm run sync
```

**Output**:
```
🚀 Starting sync from Obsidian Vault to Docusaurus site...

📦 Syncing main-portal...
  ✓ Content: main-portal → docs
  ✓ Attachments: attachments → assets/main-portal
  ✅ main-portal sync complete

📦 Syncing course-n8n...
  ✓ Content: course-n8n → docs-n8n
  ✅ course-n8n sync complete

✨ All content synced successfully!
```

#### Watch Mode (Auto-Sync)

```bash
pnpm run sync:watch
```

**Features**:
- Watch การเปลี่ยนแปลงใน Vault
- Auto-sync เมื่อไฟล์เปลี่ยน
- แสดง log ของการ sync

**หยุด Watch Mode**: กด `Ctrl+C`

---

### การจัดการ Attachments

#### 1. เพิ่มรูปภาพ

**ใน Obsidian**:
1. Drag & drop รูปภาพลงใน Markdown file
2. Obsidian จะบันทึกที่ `attachments/` folder
3. ใช้ Wiki Link: `![[image.jpg]]`

**หลัง Sync**:
- รูปภาพถูก copy ไปยัง `static/assets/{course-name}/`
- Wiki Link ถูกแปลงเป็น Markdown image syntax

#### 2. Path Reference

**ใน Obsidian**:
```markdown
![Image](attachments/image.png)
```

**ใน Docusaurus** (หลัง sync):
```markdown
![Image](/assets/main-portal/image.png)
```

**แนะนำ**: ใช้ absolute path `/assets/{course-name}/image.png`

---

## 🚀 การ Deploy

### Quick Deploy

```bash
# 1. Sync content
pnpm run sync

# 2. Build (optional, GitHub Actions จะ build อัตโนมัติ)
pnpm run build

# 3. Commit และ push
git add .
git commit -m "docs: update content"
git push origin master
```

### GitHub Actions Workflow

**Trigger**: Push to `master` branch

**Process**:
1. Checkout code
2. Setup Node.js และ pnpm
3. Install dependencies
4. Build site
5. Deploy to GitHub Pages

**Duration**: 2-5 นาที

**ตรวจสอบ**:
- https://github.com/DataFabric-Academy/DataFabric-Academy.github.io/actions
- https://DataFabric-Academy.github.io

---

## 🔍 Troubleshooting

### Problem: Dev Server ไม่ Reload

**Symptoms**: แก้ไขใน Obsidian แต่ browser ไม่ refresh

**Solutions**:
1. ตรวจสอบว่า sync script ทำงาน (Terminal 1)
2. ตรวจสอบว่า dev server ทำงาน (Terminal 2)
3. ตรวจสอบว่าไฟล์ถูก sync ไปยัง docs folders
4. ลอง refresh browser manually (F5)

---

### Problem: Sync Script ไม่ Detect การเปลี่ยนแปลง

**Symptoms**: แก้ไขใน Obsidian แต่ sync script ไม่ sync

**Solutions**:
1. ตรวจสอบว่าไฟล์ถูกบันทึก (Save) จริงๆ
2. ตรวจสอบว่า path ที่ watch ถูกต้อง
3. ลอง restart sync script
4. ตรวจสอบว่าไม่มี permission issues

---

### Problem: Port 3000 ถูกใช้แล้ว

**Symptoms**: `Error: Port 3000 is already in use`

**Solutions**:
1. หา process ที่ใช้ port 3000:
   ```bash
   # Windows
   netstat -ano | findstr :3000
   ```
2. Kill process หรือใช้ port อื่น:
   ```bash
   pnpm run start -- --port 3001
   ```

---

### Problem: รูปภาพไม่แสดง

**Symptoms**: รูปภาพไม่แสดงใน Docusaurus

**Solutions**:
1. ตรวจสอบว่าไฟล์ถูก sync ไปยัง `static/assets/{course-name}/`
2. ตรวจสอบ path ใน Markdown:
   - ใช้ `/assets/{course-name}/image.png` (absolute path)
3. Sync ใหม่:
   ```bash
   pnpm run sync
   ```

---

### Problem: Wiki Links ไม่ถูกแปลง

**Symptoms**: `![[image.jpg]]` ยังแสดงเป็น text

**Solutions**:
1. ตรวจสอบว่า sync script รันเวอร์ชันล่าสุด
2. Sync ใหม่:
   ```bash
   pnpm run sync
   ```
3. ตรวจสอบว่าไฟล์ Markdown ถูก sync

---

### Problem: Build Failed

**Symptoms**: GitHub Actions build failed

**Solutions**:
1. ตรวจสอบ broken links:
   ```bash
   pnpm run build
   ```
2. ตรวจสอบ syntax errors ใน Markdown
3. ตรวจสอบว่าไม่มี broken image paths
4. ดู error logs ใน GitHub Actions

---

## 📚 Quick Reference

### Commands

```bash
# Sync
pnpm run sync              # One-time sync
pnpm run sync:watch        # Watch mode (auto-sync)

# Development
pnpm run start             # Dev server
pnpm run build             # Build for production
pnpm run serve             # Serve build locally

# Git
git add .                  # Add all changes
git commit -m "message"    # Commit
git push origin master     # Push to GitHub
```

### File Locations

**Obsidian Vault**:
```
D:\Obsidian\Knowledge-Fabric-Vault\90_Academy\
├── main-portal/      → sync to → docs/
├── course-n8n/       → sync to → docs-n8n/
├── course-power-bi/  → sync to → docs-power-bi/
├── course-ms-sql/    → sync to → docs-ms-sql/
└── _assets/          → sync to → static/assets/
```

**Docusaurus**:
```
DataFabric-Academy.github.io/
├── docs/             ← synced from main-portal
├── docs-n8n/         ← synced from course-n8n
├── docs-power-bi/    ← synced from course-power-bi
├── docs-ms-sql/      ← synced from course-ms-sql
└── static/assets/    ← synced from _assets
```

### URLs

- **Local Dev**: http://localhost:3000/
- **Production**: https://DataFabric-Academy.github.io
- **Custom Domain**: https://datafabric.academy

### Course Routes

- **Main Portal**: https://DataFabric-Academy.github.io/
- **Course n8n**: https://DataFabric-Academy.github.io/course-n8n/
- **Course Power BI**: https://DataFabric-Academy.github.io/course-power-bi/
- **Course MS SQL**: https://DataFabric-Academy.github.io/course-ms-sql/

---

## 🔗 Related Documentation

- [Deployment Guide](deployment.md) - Detailed deployment instructions
- [Development Workflow](development-workflow.md) - Dev setup details
- [Obsidian Sync Test](obsidian-sync-test.md) - Sync testing guide
- [Obsidian Attachments Setup](obsidian-attachments-setup.md) - Attachments guide
- [Troubleshooting](troubleshooting.md) - Common issues
- [Project Summary](../PROJECT_SUMMARY.md) - Project overview

---

**Last Updated**: 2026-01-19  
**Version**: 1.0.0
