# Obsidian Sync Test Guide

## 🧪 การทดสอบ Sync Script จาก Obsidian Vault

คู่มือนี้จะช่วยคุณทดสอบการ sync เนื้อหาจาก Obsidian Vault ไปยัง Docusaurus

---

## 📋 Prerequisites

### 1. ตรวจสอบ Obsidian Vault Path

**Default Path**: `D:\Obsidian\Knowledge-Fabric-Vault`

**โครงสร้างที่ต้องการ**:
```
Knowledge-Fabric-Vault/
└── 90_Academy/
    ├── main-portal/          # Main portal docs
    ├── course-n8n/           # Course n8n docs
    ├── course-power-bi/       # Course Power BI docs
    ├── course-ms-sql/        # Course MS SQL docs
    └── _assets/               # Shared assets (images, etc.)
```

### 2. ตรวจสอบ Sync Script

**Location**: `scripts/sync-vault.js`

**Configuration**:
- Vault Root: `D:\Obsidian\Knowledge-Fabric-Vault` (default)
- หรือใช้ environment variable: `OBSIDIAN_VAULT`

---

## 🚀 การทดสอบ

### Test 1: One-Time Sync

ทดสอบการ sync ครั้งเดียว

```bash
# จาก root directory
pnpm run sync
```

**สิ่งที่ต้องตรวจสอบ**:
- [ ] Script รันได้โดยไม่มี error
- [ ] แสดง log ของแต่ละ course ที่ sync
- [ ] ไฟล์ถูก copy ไปยัง `docs/`, `docs-n8n/`, `docs-power-bi/`, `docs-ms-sql/`
- [ ] Assets ถูก copy ไปยัง `static/assets/`

**Expected Output**:
```
🚀 Starting sync from Obsidian Vault to Docusaurus site...

Vault: D:\Obsidian\Knowledge-Fabric-Vault
Repo: D:\dev\github\DataFabric-Academy\DataFabric-Academy.github.io

📦 Syncing main-portal...
  ✓ Content: main-portal → docs
  ✓ Assets synced
  ✅ main-portal sync complete

📦 Syncing course-n8n...
  ✓ Content: course-n8n → docs-n8n
  ✅ course-n8n sync complete

...

✨ All content synced successfully!
```

---

### Test 2: Watch Mode

ทดสอบ watch mode (auto-sync เมื่อไฟล์เปลี่ยน)

```bash
# เปิด terminal ใหม่
pnpm run sync:watch
```

**สิ่งที่ต้องตรวจสอบ**:
- [ ] Script เริ่ม watch mode
- [ ] แสดง "Watch mode enabled"
- [ ] แสดงจำนวน paths ที่ watch

**ทดสอบการเปลี่ยนแปลง**:
1. เปิด Obsidian Vault
2. แก้ไขไฟล์ใน `90_Academy/main-portal/` หรือ course folders
3. บันทึกไฟล์
4. ตรวจสอบว่า sync script detect การเปลี่ยนแปลงและ sync อัตโนมัติ

**Expected Output**:
```
👀 Watch mode enabled - watching for file changes...

Watching 5 paths...

📝 File changed: intro.md
📦 Syncing main-portal...
  ✓ Content: main-portal → docs
  ✅ main-portal sync complete
```

**หยุด Watch Mode**: กด `Ctrl+C`

---

### Test 3: Custom Vault Path

ทดสอบ sync จาก Vault path อื่น (ถ้ามี)

```bash
# Windows PowerShell
$env:OBSIDIAN_VAULT="D:\Other\Vault\Path"
pnpm run sync

# หรือ Linux/Mac
OBSIDIAN_VAULT="/path/to/vault" pnpm run sync
```

**สิ่งที่ต้องตรวจสอบ**:
- [ ] Script ใช้ custom path ที่กำหนด
- [ ] Sync ทำงานได้ถูกต้อง

---

### Test 4: Error Handling

ทดสอบ error handling เมื่อ path ไม่ถูกต้อง

```bash
# ตั้งค่า path ที่ไม่มีอยู่
$env:OBSIDIAN_VAULT="D:\NonExistent\Path"
pnpm run sync
```

**Expected Behavior**:
- [ ] แสดง warning สำหรับ path ที่ไม่มี
- [ ] Script ไม่ crash
- [ ] แสดง error message ที่ชัดเจน

**Expected Output**:
```
⚠️  Source path does not exist: D:\NonExistent\Path\90_Academy\main-portal
  ⚠️  Content source not found: D:\NonExistent\Path\90_Academy\main-portal
```

---

## ✅ Verification Checklist

### หลัง Sync สำเร็จ

#### 1. ตรวจสอบไฟล์ที่ถูก Sync

```bash
# ตรวจสอบว่าไฟล์ถูก copy
ls docs/
ls docs-n8n/
ls docs-power-bi/
ls docs-ms-sql/
ls static/assets/
```

**สิ่งที่ต้องตรวจสอบ**:
- [ ] ไฟล์ Markdown (.md) ถูก copy
- [ ] Images และ assets ถูก copy
- [ ] โครงสร้างโฟลเดอร์ถูกต้อง

#### 2. ตรวจสอบ Content

**ตรวจสอบใน Docusaurus**:
- [ ] เปิด `docs/intro.md` และตรวจสอบเนื้อหา
- [ ] ตรวจสอบว่า links ทำงานได้
- [ ] ตรวจสอบว่า images แสดงได้

#### 3. ทดสอบ Build

```bash
# Build เพื่อตรวจสอบว่าไม่มี error
pnpm run build
```

**สิ่งที่ต้องตรวจสอบ**:
- [ ] Build สำเร็จ
- [ ] ไม่มี broken links
- [ ] Images และ assets โหลดได้

---

## 🔍 Troubleshooting

### Problem: Script ไม่พบ Vault Path

**Symptoms**:
```
⚠️  Source path does not exist: D:\Obsidian\Knowledge-Fabric-Vault\90_Academy\main-portal
```

**Solutions**:
1. ตรวจสอบว่า Vault path ถูกต้อง
2. ใช้ environment variable:
   ```bash
   $env:OBSIDIAN_VAULT="D:\Actual\Vault\Path"
   pnpm run sync
   ```
3. แก้ไข `scripts/sync-vault.js` โดยตรง (ไม่แนะนำ)

---

### Problem: ไฟล์ไม่ถูก Sync

**Symptoms**: ไฟล์ใน Vault ไม่ถูก copy ไปยัง Docusaurus

**Solutions**:
1. ตรวจสอบว่าไฟล์อยู่ในโฟลเดอร์ที่ถูกต้อง
2. ตรวจสอบว่าไฟล์ไม่ถูก ignore (`.obsidian`, `.git`, etc.)
3. ตรวจสอบ permissions ของไฟล์
4. ลอง sync ใหม่

---

### Problem: Assets ไม่ถูก Sync

**Symptoms**: Images ไม่แสดงใน Docusaurus

**Solutions**:
1. ตรวจสอบว่า assets อยู่ใน `_assets/` folder
2. ตรวจสอบว่า assets ถูก copy ไปยัง `static/assets/`
3. ตรวจสอบ path ใน Markdown files:
   - ใช้ `/assets/image.png` (absolute path)
   - หรือ `../assets/image.png` (relative path)

---

### Problem: Watch Mode ไม่ทำงาน

**Symptoms**: Watch mode ไม่ detect การเปลี่ยนแปลง

**Solutions**:
1. ตรวจสอบว่าไฟล์ถูกบันทึก (save) จริงๆ
2. ตรวจสอบว่า path ที่ watch ถูกต้อง
3. ลอง restart watch mode
4. ตรวจสอบว่าไม่มี permission issues

---

## 📝 Best Practices

### 1. Sync ก่อน Commit

```bash
# Always sync before committing
pnpm run sync
git add .
git commit -m "docs: update content"
git push
```

### 2. ใช้ Watch Mode สำหรับ Development

```bash
# Terminal 1: Watch mode
pnpm run sync:watch

# Terminal 2: Dev server
pnpm run start
```

### 3. ตรวจสอบ Build หลัง Sync

```bash
pnpm run sync
pnpm run build  # Verify no errors
```

### 4. ใช้ Git เพื่อ Track Changes

```bash
# ตรวจสอบการเปลี่ยนแปลงหลัง sync
git status
git diff docs/
```

---

## 🎯 Test Scenarios

### Scenario 1: เพิ่มไฟล์ใหม่

1. สร้างไฟล์ใหม่ใน Obsidian Vault: `90_Academy/main-portal/new-page.md`
2. Run sync: `pnpm run sync`
3. ตรวจสอบว่า `docs/new-page.md` ถูกสร้าง
4. Build และทดสอบ: `pnpm run build`

### Scenario 2: แก้ไขไฟล์ที่มีอยู่

1. แก้ไข `90_Academy/main-portal/intro.md` ใน Obsidian
2. Run sync: `pnpm run sync`
3. ตรวจสอบว่า `docs/intro.md` ถูกอัปเดต
4. ตรวจสอบ content ใน Docusaurus

### Scenario 3: เพิ่ม Image

1. เพิ่ม image ไปยัง `90_Academy/_assets/image.png`
2. เพิ่ม reference ใน Markdown: `![Image](/assets/image.png)`
3. Run sync: `pnpm run sync`
4. ตรวจสอบว่า image ถูก copy และแสดงได้

### Scenario 4: ลบไฟล์

1. ลบไฟล์ใน Obsidian Vault
2. Run sync: `pnpm run sync`
3. **หมายเหตุ**: Sync script จะไม่ลบไฟล์ใน Docusaurus อัตโนมัติ
4. ลบไฟล์ใน Docusaurus manually หรือใช้ git

---

## 📊 Expected Results

### Successful Sync

- ✅ All courses synced
- ✅ Assets synced
- ✅ No errors
- ✅ Files in correct locations
- ✅ Build succeeds

### Failed Sync

- ❌ Error messages displayed
- ❌ Some files missing
- ❌ Build fails
- ❌ Broken links or images

---

## 🔗 Related Documentation

- [Deployment Guide](deployment.md) - GitHub Pages deployment
- [Project Summary](https://github.com/DataFabric-Academy/DataFabric-Academy.github.io/blob/master/PROJECT_SUMMARY.md) - Project overview
- [Sync Script](https://github.com/DataFabric-Academy/DataFabric-Academy.github.io/blob/master/scripts/sync-vault.js) - Source code

---

**Last Updated**: 2026-01-19
