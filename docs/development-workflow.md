# Development Workflow Guide

## 🔄 Workflow Overview

เมื่อพัฒนาเว็บไซต์ Docusaurus พร้อม sync จาก Obsidian Vault คุณต้องรัน 2 processes พร้อมกัน:

1. **Sync Script (Watch Mode)** - Sync ไฟล์จาก Obsidian → Docusaurus
2. **Dev Server** - รัน web server ที่ http://localhost:3000/

---

## 🚀 Quick Start

### Terminal 1: Sync Watch Mode

```bash
pnpm run sync:watch
```

**หน้าที่**:
- Watch การเปลี่ยนแปลงใน Obsidian Vault
- Auto-sync ไฟล์ไปยัง `docs/`, `docs-n8n/`, etc.
- **ไม่รัน web server**

**Output**:
```
👀 Watch mode enabled - watching for file changes...

Watching 5 paths...

Press Ctrl+C to stop watching.
```

---

### Terminal 2: Dev Server

```bash
pnpm run start
```

**หน้าที่**:
- รัน Docusaurus development server
- เปิดเว็บไซต์ที่ **http://localhost:3000/**
- Hot reload เมื่อไฟล์ใน docs folders เปลี่ยน

**Output**:
```
[INFO] Starting the development server...
[SUCCESS] Docusaurus website is running at: http://localhost:3000/
```

---

## 📋 Complete Workflow

### Step 1: เปิด 2 Terminals

**Terminal 1** (Sync):
```bash
cd d:\dev\github\DataFabric-Academy\DataFabric-Academy.github.io
pnpm run sync:watch
```

**Terminal 2** (Dev Server):
```bash
cd d:\dev\github\DataFabric-Academy\DataFabric-Academy.github.io
pnpm run start
```

### Step 2: แก้ไขใน Obsidian

1. เปิด Obsidian Vault: `D:\Obsidian\Knowledge-Fabric-Vault`
2. แก้ไขไฟล์ใน `90_Academy/main-portal/` หรือ course folders
3. บันทึกไฟล์ (Save)

### Step 3: ดูผลลัพธ์

1. **Terminal 1** จะแสดง:
   ```
   📝 File changed: intro.md
   📦 Syncing main-portal...
     ✓ Content: main-portal → docs
     ✅ main-portal sync complete
   ```

2. **Terminal 2** (Dev Server) จะ auto-reload:
   ```
   [webpack] Compiling...
   [webpack] Compiled successfully
   ```

3. **Browser** (http://localhost:3000/) จะ refresh อัตโนมัติ

---

## 🎯 Use Cases

### Use Case 1: Development with Obsidian

**Scenario**: แก้ไขเนื้อหาใน Obsidian และดูผลลัพธ์ทันที

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

---

### Use Case 2: One-Time Sync

**Scenario**: Sync ครั้งเดียวแล้วปิด sync script

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

---

### Use Case 3: Development without Obsidian

**Scenario**: แก้ไขไฟล์ใน Docusaurus โดยตรง (ไม่ผ่าน Obsidian)

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

## ⚠️ Important Notes

### 1. Sync Direction

**Obsidian → Docusaurus** (One-way sync)
- การแก้ไขใน Obsidian จะ sync ไปยัง Docusaurus
- การแก้ไขใน Docusaurus docs folders จะถูก overwrite เมื่อ sync อีกครั้ง

### 2. File Locations

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

### 3. Best Practice

**สำหรับ Development**:
- ใช้ **Watch Mode** + **Dev Server** พร้อมกัน
- แก้ไขใน Obsidian
- ดูผลลัพธ์ที่ http://localhost:3000/

**สำหรับ Production**:
- Sync ครั้งเดียว: `pnpm run sync`
- Build: `pnpm run build`
- Commit และ push

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

## 📊 Comparison Table

| Feature | Sync Watch Mode | Dev Server |
|---------|----------------|------------|
| **Command** | `pnpm run sync:watch` | `pnpm run start` |
| **Purpose** | Sync files from Obsidian | Run web server |
| **URL** | N/A | http://localhost:3000/ |
| **Hot Reload** | No (syncs files) | Yes (reloads browser) |
| **When to use** | Always (when editing in Obsidian) | When viewing website |

---

## 🎯 Recommended Setup

### For Daily Development

**Terminal 1** (Sync):
```bash
pnpm run sync:watch
```

**Terminal 2** (Dev Server):
```bash
pnpm run start
```

**Browser**: http://localhost:3000/

**Workflow**:
1. แก้ไขใน Obsidian
2. Save
3. ดูผลลัพธ์ที่ browser (auto-refresh)

---

## 📚 Related Documentation

- [Obsidian Sync Test Guide](obsidian-sync-test.md) - Detailed sync testing
- [Deployment Guide](deployment.md) - Production deployment
- [Project Summary](https://github.com/DataFabric-Academy/DataFabric-Academy.github.io/blob/master/PROJECT_SUMMARY.md) - Project overview

---

**Last Updated**: 2026-01-19
