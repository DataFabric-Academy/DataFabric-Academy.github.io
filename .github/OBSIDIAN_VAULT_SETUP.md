# คู่มือตั้งค่า Automatic Sync จาก Obsidian Vault

คู่มือนี้จะอธิบายการตั้งค่า workflow ใน Obsidian Vault repository เพื่อให้ส่ง `repository_dispatch` event ไปยังทุก Portal อัตโนมัติเมื่อมีการ push

## 📋 สิ่งที่ต้องทำ

### 1. สร้าง Workflow File ใน Obsidian Vault

1. ไปที่ repository: **`DataFabric-Academy/obsidian-vault`**
2. สร้าง directory: `.github/workflows/` (ถ้ายังไม่มี)
3. สร้างไฟล์: `.github/workflows/trigger-sync.yml`
4. Copy เนื้อหาทั้งหมดจาก `main-portal/.github/workflows/OBSIDIAN_VAULT_WORKFLOW.yml` ไปวาง

### 2. ตั้งค่า Secret ใน Obsidian Vault Repository

1. ไปที่ **`DataFabric-Academy/obsidian-vault`** → **Settings** → **Secrets and variables** → **Actions**
2. คลิก **New repository secret**
3. เพิ่ม Secret:
   - **Name**: `OBSIDIAN_SYNC_TOKEN`
   - **Value**: ใช้ PAT token เดียวกันกับที่ตั้งค่าใน Main Portal และ Course Portals

**หมายเหตุ**: PAT token ต้องมี permissions:
- `repo` (full control) - สำหรับ access repositories ใน Organization
- `workflow` - สำหรับ trigger workflows

### 3. ตรวจสอบว่า Secret ตั้งค่าในทุก Portal แล้ว

สำหรับแต่ละ Portal repository (ถ้ายังไม่มี):
- Main Portal (`DataFabric-Academy.github.io`)
- SQL Server Course (`course-ms-sql`)
- Power BI Course (`course-power-bi`)
- n8n Course (`course-n8n`)

ตั้งค่า Secret: `OBSIDIAN_SYNC_TOKEN` ในแต่ละ repository

## 🔄 การทำงาน

### Flow Diagram

```
1. Push ไปยัง Obsidian Vault
   ↓
2. trigger-sync.yml (obsidian-vault) ทำงาน
   ↓
3. ส่ง repository_dispatch events
   ├─→ Main Portal (obsidian-sync.yml)
   ├─→ SQL Server Course (obsidian-sync.yml)
   ├─→ Power BI Course (obsidian-sync.yml)
   └─→ n8n Course (obsidian-sync.yml)
   ↓
4. แต่ละ Portal sync content
   ↓
5. Deploy workflows trigger
   ↓
6. Websites Updated
```

### Trigger Conditions

Workflow จะทำงานเมื่อมีการ push ไปยัง `main` branch และมีการแก้ไข:
- `**.md` - Markdown files
- `assets/**` - Image และ asset files
- `.obsidian/**` - Obsidian configuration files

## ✅ ตรวจสอบการตั้งค่า

### Checklist

#### Obsidian Vault Repository
- [ ] มีไฟล์ `.github/workflows/trigger-sync.yml`
- [ ] Copy เนื้อหาจาก `OBSIDIAN_VAULT_WORKFLOW.yml`
- [ ] ตั้งค่า Secret `OBSIDIAN_SYNC_TOKEN`

#### Portal Repositories
- [x] Main Portal: มี workflow `obsidian-sync.yml`
- [x] SQL Server Course: มี workflow `obsidian-sync.yml`
- [x] Power BI Course: มี workflow `obsidian-sync.yml`
- [x] n8n Course: มี workflow `obsidian-sync.yml`
- [ ] ทุก portal: ตั้งค่า Secret `OBSIDIAN_SYNC_TOKEN`

## 🧪 ทดสอบการทำงาน

### 1. ทดสอบ Manual Trigger

1. ไปที่ Obsidian Vault → **Actions** → **Trigger All Portals Sync**
2. คลิก **Run workflow**
3. ตรวจสอบว่า workflow ทำงานสำเร็จ
4. ตรวจสอบ workflows ในทุก Portal ว่าได้รับ `repository_dispatch` event

### 2. ทดสอบ Automatic Trigger

1. Push ไฟล์ markdown หรือ image ไปยัง Obsidian Vault
2. ตรวจสอบ workflow ใน Obsidian Vault: **Trigger All Portals Sync**
3. ตรวจสอบ workflows ในทุก Portal: **Sync from Obsidian Vault**

## 🔍 Troubleshooting

### Error: Permission denied
- ตรวจสอบว่า PAT token มี permissions ที่ถูกต้อง
- ตรวจสอบว่า token ถูกตั้งค่าใน Secrets แล้ว

### Error: Repository not found
- ตรวจสอบว่า repository name ถูกต้อง
- ตรวจสอบว่า PAT token มี access ไปยัง Organization repositories

### Workflow ไม่ทำงาน
- ตรวจสอบว่า workflow file อยู่ใน `.github/workflows/` directory
- ตรวจสอบว่า YAML syntax ถูกต้อง
- ตรวจสอบว่า path filters ตรงกับไฟล์ที่ push

### Portals ไม่ได้รับ event
- ตรวจสอบว่า Secret `OBSIDIAN_SYNC_TOKEN` ตั้งค่าใน Obsidian Vault แล้ว
- ตรวจสอบว่า workflows ใน Portals มี `repository_dispatch` trigger
- ตรวจสอบ logs ใน Obsidian Vault workflow

## 📚 เอกสารเพิ่มเติม

- [SETUP_OBSIDIAN_SYNC_TOKEN.md](./SETUP_OBSIDIAN_SYNC_TOKEN.md) - คู่มือตั้งค่า PAT Token
- [OBSIDIAN_VAULT_WORKFLOW.yml](./workflows/OBSIDIAN_VAULT_WORKFLOW.yml) - Workflow template
- [README.md](./workflows/README.md) - GitHub Actions workflows documentation

---

**สรุป**: หลังจากตั้งค่า workflow ใน Obsidian Vault และ Secrets ในทุก Portal แล้ว ระบบจะทำงานอัตโนมัติเมื่อมีการ push ไปยัง Obsidian Vault
