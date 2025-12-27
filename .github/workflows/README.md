# GitHub Actions Workflows

## Overview

ระบบ Knowledge Fabric ใช้ GitHub Actions สำหรับ:
1. **Sync Obsidian to Docusaurus** - ซิงค์เนื้อหาจาก Obsidian vault (private repo) มาที่ Docusaurus (public repo)
2. **Deploy to GitHub Pages** - Build และ deploy Docusaurus website

## Workflows

### 1. sync-obsidian.yml

**หน้าที่**: ซิงค์เนื้อหาจาก Obsidian vault repository มาที่ Docusaurus repository

**Trigger**:
- `repository_dispatch` - Trigger จาก Obsidian vault repo เมื่อมีการอัปเดต
- `workflow_dispatch` - Manual trigger จาก GitHub UI

**Prerequisites**:

1. **Personal Access Token (PAT)** สำหรับ access private Obsidian vault repo:
   - ดูคำแนะนำละเอียดใน [SETUP_TOKEN.md](../SETUP_TOKEN.md)
   - สร้าง Fine-grained token ด้วย permissions:
     - `Contents: Read-only` (สำหรับ source repo)
     - `Metadata: Read-only`
   - ตั้งชื่อ token: `OBSIDIAN_VAULT_TOKEN`
   - เพิ่ม token เป็น Secret ใน repository:
     - Settings → Secrets and variables → Actions → New repository secret
     - Name: `OBSIDIAN_VAULT_TOKEN`
     - Value: `<your-token>`

2. **Source Repository**:
   - ต้องมี Obsidian vault อยู่ใน repository
   - Default path: `90_Academy/main-portal`

**Usage**:

#### Manual Trigger:
1. ไปที่ Actions tab ใน GitHub
2. เลือก "Sync Obsidian to Docusaurus"
3. คลิก "Run workflow"
4. ระบุ:
   - Source repo: `DataFabric-Academy/obsidian-vault` (หรือ repo อื่น)
   - Source path: `90_Academy/main-portal`
   - Target path: `website/docs`

#### Automatic Trigger (from Obsidian vault repo):
สร้าง workflow ใน Obsidian vault repo ที่ trigger `repository_dispatch`:

```yaml
name: Trigger Docusaurus Sync

on:
  push:
    branches: [main]
    paths:
      - '90_Academy/main-portal/**'

jobs:
  trigger:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Docusaurus sync
        uses: peter-evans/repository-dispatch@v2
        with:
          token: ${{ secrets.DOCUSAURUS_REPO_TOKEN }}
          repository: DataFabric-Academy/DataFabric-Academy.github.io
          event-type: obsidian-updated
          client-payload: |
            {
              "source_repo": "${{ github.repository }}",
              "source_path": "90_Academy/main-portal",
              "target_path": "website/docs"
            }
```

### 2. deploy.yml

**หน้าที่**: Build และ deploy Docusaurus website ไปยัง GitHub Pages

**Trigger**:
- `push` to `main` branch (เฉพาะเมื่อมีการแก้ไขใน `website/**`)
- `workflow_dispatch` - Manual trigger

**Prerequisites**:
- GitHub Pages ต้องเปิดใช้งานใน repository settings
- ไม่ต้องตั้งค่า secrets เพิ่มเติม (ใช้ GITHUB_TOKEN อัตโนมัติ)

## Troubleshooting

### Error: "OBSIDIAN_VAULT_TOKEN not found"
**Solution**: 
- ตรวจสอบว่าได้สร้าง Secret `OBSIDIAN_VAULT_TOKEN` ใน repository settings แล้ว
- ตรวจสอบว่า token มี permissions ที่ถูกต้อง

### Error: "Repository not found" หรือ "Permission denied"
**Solution**:
- ตรวจสอบว่า Personal Access Token มี permissions สำหรับ access private repo
- ตรวจสอบว่า token ยังไม่หมดอายุ
- ตรวจสอบว่า repository name ถูกต้อง (org/repo format)

### Error: "obsidian-export: command not found"
**Solution**:
- Workflow จะ install obsidian-export อัตโนมัติ
- ถ้ายังมีปัญหา ให้ตรวจสอบ Rust toolchain installation

### Error: "Source path not found"
**Solution**:
- ตรวจสอบว่า path ใน Obsidian vault ถูกต้อง
- ตรวจสอบว่า path มีอยู่จริงใน repository
- ใช้ workflow_dispatch เพื่อระบุ path ที่ถูกต้อง

### Content not syncing
**Solution**:
- ตรวจสอบว่า workflow run สำเร็จ
- ตรวจสอบ logs ใน Actions tab
- ตรวจสอบว่า source path และ target path ถูกต้อง
- ตรวจสอบว่า files ถูก commit และ push แล้ว

## Best Practices

1. **Use [skip ci] in commit messages**:
   - เมื่อ sync content จาก Obsidian ใช้ `[skip ci]` เพื่อป้องกัน infinite loop
   - Deploy workflow จะยังทำงานเมื่อมีการ push

2. **Path filtering**:
   - Deploy workflow ใช้ path filtering เพื่อไม่ให้ deploy ทุกครั้งที่มีการ push
   - Sync workflow ควร trigger deploy workflow หลังจาก sync เสร็จ

3. **Error handling**:
   - ใช้ `continue-on-error: false` สำหรับ critical steps
   - ใช้ `if: steps.changes.outputs.has_changes == 'true'` เพื่อไม่ commit เมื่อไม่มี changes

4. **Security**:
   - ใช้ Fine-grained Personal Access Tokens แทน Classic tokens
   - จำกัด permissions ให้เท่าที่จำเป็น
   - หมั่นตรวจสอบและ rotate tokens

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [obsidian-export Documentation](https://github.com/zoni/obsidian-export)
- [Docusaurus Deployment Guide](https://docusaurus.io/docs/deployment)
- [Personal Access Tokens Guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

