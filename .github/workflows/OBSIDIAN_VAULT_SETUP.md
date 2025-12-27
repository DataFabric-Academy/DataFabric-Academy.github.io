# คู่มือตั้งค่า Obsidian Vault Repository สำหรับ Auto-Sync

## 📋 สถานะปัจจุบัน

Workflow `obsidian-sync.yml` รองรับ 2 แบบ:

### 1. Manual Trigger (พร้อมใช้งานแล้ว)
- ✅ Trigger จาก GitHub UI: **Actions** → **Sync from Obsidian Vault** → **Run workflow**
- ✅ ใช้ได้ทันที ไม่ต้องตั้งค่าเพิ่มเติม

### 2. Automatic Trigger (ต้องตั้งค่าเพิ่มเติม)
- ⚠️ ต้องสร้าง workflow ใน Obsidian Vault repository
- ⚠️ จะ trigger อัตโนมัติเมื่อมีการ push ใน Obsidian Vault

## 🔄 วิธีทำให้เป็นอัตโนมัติ

### ขั้นตอนที่ 1: สร้าง Workflow ใน Obsidian Vault Repository

1. ไปที่ repository: `DataFabric-Academy/obsidian-vault`
2. สร้างไฟล์: `.github/workflows/trigger-sync.yml`

### ขั้นตอนที่ 2: เพิ่ม Workflow Content

สร้างไฟล์ `.github/workflows/trigger-sync.yml` ใน Obsidian Vault repository:

```yaml
name: Trigger Docusaurus Sync

on:
  push:
    branches:
      - main
    # Trigger เมื่อมีการแก้ไข markdown files หรือ assets
    paths:
      - '**.md'
      - 'assets/**'
      - '.obsidian/**'

permissions:
  contents: read

jobs:
  trigger-sync:
    name: Trigger Main Portal Sync
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Docusaurus Sync Workflow
        uses: peter-evans/repository-dispatch@v2
        with:
          token: ${{ secrets.OBSIDIAN_SYNC_TOKEN }}
          repository: DataFabric-Academy/DataFabric-Academy.github.io
          event-type: obsidian-sync
          client-payload: |
            {
              "source_repo": "obsidian-vault",
              "source_branch": "${{ github.ref_name }}",
              "commit_sha": "${{ github.sha }}",
              "commit_message": "${{ github.event.head_commit.message }}"
            }
```

### ขั้นตอนที่ 3: ตั้งค่า Secret ใน Obsidian Vault Repository

1. ไปที่ `DataFabric-Academy/obsidian-vault` → **Settings** → **Secrets and variables** → **Actions**
2. เพิ่ม Secret:
   - **Name**: `OBSIDIAN_SYNC_TOKEN`
   - **Value**: ใช้ PAT token เดียวกันกับที่ตั้งค่าใน Main Portal

:::info หมายเหตุ

คุณสามารถใช้ PAT token เดียวกันได้กับทั้งสอง repositories เพราะมันมี access ไปยัง Organization

:::

## ✅ หลังจากตั้งค่าเสร็จ

### การทำงานอัตโนมัติ:

1. **Push content ไปยัง Obsidian Vault**
   ```
   git add .
   git commit -m "Update content"
   git push origin main
   ```

2. **Workflow ใน Obsidian Vault จะ trigger**
   - ตรวจสอบการเปลี่ยนแปลง
   - ส่ง repository_dispatch event ไปยัง Main Portal

3. **Workflow ใน Main Portal จะทำงาน**
   - Checkout Obsidian Vault
   - Export ด้วย obsidian-export
   - Copy content ไปยัง Docusaurus
   - Commit และ push
   - Trigger deployment

### Timeline:

```
Obsidian Vault Push
    ↓
Trigger Sync Workflow (obsidian-vault)
    ↓
Repository Dispatch Event
    ↓
Sync Workflow (main-portal)
    ↓
Deploy Workflow (main-portal)
    ↓
Website Updated
```

## 🔍 ตรวจสอบการทำงาน

### ตรวจสอบใน Obsidian Vault Repository:

1. ไปที่ **Actions** tab
2. ดู workflow: **Trigger Docusaurus Sync**
3. ตรวจสอบว่า trigger สำเร็จ

### ตรวจสอบใน Main Portal Repository:

1. ไปที่ **Actions** tab
2. ดู workflow: **Sync from Obsidian Vault**
3. ตรวจสอบ logs และ summary

## 🛠️ Alternative: ใช้ Push Trigger โดยตรง

ถ้าต้องการให้ Main Portal workflow trigger โดยตรงเมื่อมีการ push ใน Obsidian Vault (ไม่ต้องใช้ repository_dispatch):

### ข้อจำกัด:
- ❌ GitHub Actions ไม่สามารถ trigger workflow ใน repository อื่นโดยตรงจาก `push` event
- ✅ ต้องใช้ `repository_dispatch` หรือ `workflow_dispatch`

### วิธีแก้:
- ใช้ `repository_dispatch` (แนะนำ) - ตามขั้นตอนด้านบน
- หรือใช้ GitHub API เพื่อ trigger workflow_dispatch

## 📚 ข้อมูลเพิ่มเติม

- [GitHub Actions: repository_dispatch](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#repository_dispatch)
- [peter-evans/repository-dispatch Action](https://github.com/peter-evans/repository-dispatch)
- [Workflow Documentation](./workflows/README.md)

---

**สรุป**: ตอนนี้ workflow ทำงานแบบ **Manual** แล้ว ถ้าต้องการให้เป็น **Automatic** ต้องสร้าง workflow ใน Obsidian Vault repository ตามขั้นตอนด้านบน
