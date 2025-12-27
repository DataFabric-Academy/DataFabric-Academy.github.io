# คู่มือตั้งค่า Automatic Sync สำหรับทุก Portal

คู่มือนี้จะอธิบายการตั้งค่า automatic sync จาก Obsidian Vault ไปยังทุก Portal (Main Portal และ Course Portals)

## 📋 สถานะปัจจุบัน

- ✅ Main Portal: มี workflow `obsidian-sync.yml` แล้ว
- ⚠️ Course Portals: ยังไม่มี workflow (ต้องสร้าง)

## 🎯 เป้าหมาย

เมื่อมีการ push ไปยัง Obsidian Vault:
1. ✅ Trigger sync ไปยัง Main Portal
2. ✅ Trigger sync ไปยัง SQL Server Course
3. ✅ Trigger sync ไปยัง Power BI Course
4. ✅ Trigger sync ไปยัง n8n Course

## 🔧 ขั้นตอนการตั้งค่า

### ขั้นตอนที่ 1: ตั้งค่า Obsidian Vault Repository

#### 1.1 สร้าง Workflow ใน Obsidian Vault

1. ไปที่ repository: `DataFabric-Academy/obsidian-vault`
2. สร้างไฟล์: `.github/workflows/trigger-sync.yml`
3. Copy เนื้อหาจาก `OBSIDIAN_VAULT_TRIGGER.yml` ใน Main Portal repository

#### 1.2 ตั้งค่า Secret

1. ไปที่ `DataFabric-Academy/obsidian-vault` → **Settings** → **Secrets** → **Actions**
2. เพิ่ม Secret: `OBSIDIAN_SYNC_TOKEN` (ใช้ PAT token เดียวกัน)

### ขั้นตอนที่ 2: ตั้งค่า Main Portal

✅ **พร้อมใช้งานแล้ว** - Main Portal มี workflow `obsidian-sync.yml` แล้ว

### ขั้นตอนที่ 3: ตั้งค่า Course Portals

สำหรับแต่ละ Course Portal (course-ms-sql, course-power-bi, course-n8n):

#### 3.1 สร้าง Workflow Directory

```bash
mkdir -p .github/workflows
```

#### 3.2 สร้าง obsidian-sync.yml

สร้างไฟล์ `.github/workflows/obsidian-sync.yml` โดยใช้ template และแทนที่:

- `{{PORTAL_NAME}}` → ชื่อ portal (เช่น "SQL Server Course")
- `{{REPO_NAME}}` → ชื่อ repository (เช่น "course-ms-sql")

#### 3.3 ตั้งค่า Secret

1. ไปที่ Course Portal repository → **Settings** → **Secrets** → **Actions**
2. เพิ่ม Secret: `OBSIDIAN_SYNC_TOKEN` (ใช้ PAT token เดียวกัน)

## 📝 Template สำหรับ Course Portals

### สำหรับ course-ms-sql

```yaml
# .github/workflows/obsidian-sync.yml
name: Sync from Obsidian Vault

on:
  repository_dispatch:
    types: [obsidian-sync]
  workflow_dispatch:
    inputs:
      source_repo:
        description: 'Source Obsidian Vault Repository'
        required: true
        default: 'obsidian-vault'
        type: string
      source_branch:
        description: 'Source Branch'
        required: false
        default: 'main'
        type: string
      target_path:
        description: 'Target path in docs'
        required: false
        default: 'course-ms-sql/'
        type: string

permissions:
  contents: write
  pull-requests: read
  actions: read

concurrency:
  group: "obsidian-sync-course-ms-sql"
  cancel-in-progress: false

jobs:
  sync-from-obsidian:
    name: Sync from Obsidian Vault
    runs-on: ubuntu-latest
    timeout-minutes: 30
    
    env:
      GITHUB_ORG: DataFabric-Academy
      SOURCE_REPO: ${{ github.event.inputs.source_repo || 'obsidian-vault' }}
      SOURCE_BRANCH: ${{ github.event.inputs.source_branch || 'main' }}
      TARGET_REPO: course-ms-sql
      TARGET_BRANCH: main
      TARGET_PATH: ${{ github.event.inputs.target_path || 'course-ms-sql/' }}
    
    steps:
      # ... (ใช้ steps เดียวกับ Main Portal แต่เปลี่ยน TARGET_REPO และ TARGET_PATH)
```

## 🚀 Quick Setup Script

### สำหรับ Main Portal (พร้อมแล้ว)

```bash
# Main Portal - ไม่ต้องทำอะไร (พร้อมแล้ว)
```

### สำหรับ Course Portals

ใช้ script นี้เพื่อสร้าง workflow ให้ทุก portal:

```bash
# สร้าง workflow สำหรับ course-ms-sql
# (ต้องทำในแต่ละ course repository)
```

## ✅ ตรวจสอบการตั้งค่า

### 1. ตรวจสอบ Obsidian Vault

- [ ] มีไฟล์ `.github/workflows/trigger-sync.yml`
- [ ] มี Secret `OBSIDIAN_SYNC_TOKEN`

### 2. ตรวจสอบ Main Portal

- [x] มีไฟล์ `.github/workflows/obsidian-sync.yml`
- [ ] มี Secret `OBSIDIAN_SYNC_TOKEN`

### 3. ตรวจสอบ Course Portals

- [ ] course-ms-sql: มี `.github/workflows/obsidian-sync.yml`
- [ ] course-power-bi: มี `.github/workflows/obsidian-sync.yml`
- [ ] course-n8n: มี `.github/workflows/obsidian-sync.yml`
- [ ] ทุก portal มี Secret `OBSIDIAN_SYNC_TOKEN`

## 🔄 การทำงานอัตโนมัติ

### Flow Diagram

```
Obsidian Vault Push
    ↓
trigger-sync.yml (obsidian-vault)
    ↓
Repository Dispatch Events
    ├─→ Main Portal (obsidian-sync.yml)
    ├─→ SQL Server Course (obsidian-sync.yml)
    ├─→ Power BI Course (obsidian-sync.yml)
    └─→ n8n Course (obsidian-sync.yml)
    ↓
แต่ละ Portal Sync Content
    ↓
Deploy Workflows Trigger
    ↓
Websites Updated
```

## 📚 ข้อมูลเพิ่มเติม

- [OBSIDIAN_VAULT_SETUP.md](./OBSIDIAN_VAULT_SETUP.md) - คู่มือตั้งค่า Obsidian Vault
- [SETUP_OBSIDIAN_SYNC_TOKEN.md](../SETUP_OBSIDIAN_SYNC_TOKEN.md) - คู่มือตั้งค่า PAT Token
- [obsidian-sync-template.yml](./obsidian-sync-template.yml) - Template สำหรับ workflow

---

**หมายเหตุ**: หลังจากตั้งค่าเสร็จแล้ว การ push ไปยัง Obsidian Vault จะ trigger sync อัตโนมัติไปยังทุก Portal
