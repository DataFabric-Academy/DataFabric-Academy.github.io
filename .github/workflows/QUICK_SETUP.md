# 🚀 Quick Setup Guide: Automatic Sync สำหรับทุก Portal

## ✅ สิ่งที่ทำเสร็จแล้ว

- ✅ Main Portal: มี workflow `obsidian-sync.yml` พร้อมใช้งาน
- ✅ SQL Server Course: มี workflow `obsidian-sync.yml` พร้อมใช้งาน
- ✅ Power BI Course: มี workflow `obsidian-sync.yml` พร้อมใช้งาน
- ✅ n8n Course: มี workflow `obsidian-sync.yml` พร้อมใช้งาน

## 🔧 ขั้นตอนสุดท้ายที่ต้องทำ

### 1. ตั้งค่า Obsidian Vault Repository

#### 1.1 สร้าง Workflow File

1. ไปที่ repository: `DataFabric-Academy/obsidian-vault`
2. สร้างไฟล์: `.github/workflows/trigger-sync.yml`
3. Copy เนื้อหาจาก: `main-portal/.github/workflows/OBSIDIAN_VAULT_TRIGGER.yml`

#### 1.2 ตั้งค่า Secret

1. ไปที่ `DataFabric-Academy/obsidian-vault` → **Settings** → **Secrets** → **Actions**
2. เพิ่ม Secret:
   - **Name**: `OBSIDIAN_SYNC_TOKEN`
   - **Value**: ใช้ PAT token เดียวกันกับที่ตั้งค่าใน Main Portal

### 2. ตั้งค่า Secret ในทุก Portal (ถ้ายังไม่มี)

สำหรับแต่ละ Portal repository:

1. ไปที่ Portal repository → **Settings** → **Secrets** → **Actions**
2. เพิ่ม Secret:
   - **Name**: `OBSIDIAN_SYNC_TOKEN`
   - **Value**: ใช้ PAT token เดียวกัน

**Portals ที่ต้องตั้งค่า:**
- ✅ Main Portal (`DataFabric-Academy.github.io`)
- ⚠️ SQL Server Course (`course-ms-sql`)
- ⚠️ Power BI Course (`course-power-bi`)
- ⚠️ n8n Course (`course-n8n`)

## 🎯 หลังจากตั้งค่าเสร็จ

### การทำงานอัตโนมัติ:

```
1. Push ไปยัง Obsidian Vault
   ↓
2. trigger-sync.yml (obsidian-vault) ทำงาน
   ↓
3. ส่ง repository_dispatch ไปยังทุก Portal
   ├─→ Main Portal
   ├─→ SQL Server Course
   ├─→ Power BI Course
   └─→ n8n Course
   ↓
4. แต่ละ Portal sync content
   ↓
5. Deploy workflows trigger
   ↓
6. Websites Updated
```

## 📋 Checklist

### Obsidian Vault Repository
- [ ] สร้างไฟล์ `.github/workflows/trigger-sync.yml`
- [ ] Copy เนื้อหาจาก `OBSIDIAN_VAULT_TRIGGER.yml`
- [ ] ตั้งค่า Secret `OBSIDIAN_SYNC_TOKEN`

### Main Portal
- [x] มี workflow `obsidian-sync.yml`
- [ ] ตั้งค่า Secret `OBSIDIAN_SYNC_TOKEN` (ถ้ายังไม่มี)

### Course Portals
- [x] course-ms-sql: มี workflow `obsidian-sync.yml`
- [x] course-power-bi: มี workflow `obsidian-sync.yml`
- [x] course-n8n: มี workflow `obsidian-sync.yml`
- [ ] ทุก portal: ตั้งค่า Secret `OBSIDIAN_SYNC_TOKEN`

## 🔍 ตรวจสอบการทำงาน

### ทดสอบ Manual Trigger

1. ไปที่ Main Portal → **Actions** → **Sync from Obsidian Vault**
2. คลิก **Run workflow**
3. ตรวจสอบว่า workflow ทำงานสำเร็จ

### ทดสอบ Automatic Trigger

1. Push ไปยัง Obsidian Vault repository
2. ตรวจสอบ workflow ใน Obsidian Vault: **Trigger All Portals Sync**
3. ตรวจสอบ workflows ในทุก Portal: **Sync from Obsidian Vault**

## 📚 เอกสารเพิ่มเติม

- [SETUP_ALL_PORTALS.md](./SETUP_ALL_PORTALS.md) - คู่มือละเอียด
- [OBSIDIAN_VAULT_SETUP.md](./OBSIDIAN_VAULT_SETUP.md) - คู่มือตั้งค่า Obsidian Vault
- [SETUP_OBSIDIAN_SYNC_TOKEN.md](../SETUP_OBSIDIAN_SYNC_TOKEN.md) - คู่มือตั้งค่า PAT Token

---

**สรุป**: หลังจากตั้งค่า Obsidian Vault workflow และ Secrets ในทุก Portal แล้ว ระบบจะทำงานอัตโนมัติเมื่อมีการ push ไปยัง Obsidian Vault
