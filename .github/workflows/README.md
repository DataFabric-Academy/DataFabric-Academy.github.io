# GitHub Actions Workflows

## Overview

Repository นี้ใช้ GitHub Actions สำหรับ automation ตาม Knowledge Fabric Architecture:

- **Source Layer**: Obsidian Vault (Private Repo)
- **Transformation Layer**: obsidian-export
- **Orchestration Layer**: GitHub Actions
- **Presentation Layer**: Docusaurus (This Repo)

## Workflows

### 1. `deploy.yml` - Deploy to GitHub Pages

**Purpose**: Build และ deploy Docusaurus site ไปยัง GitHub Pages

**Triggers**:
- Push to `main` branch (เฉพาะเมื่อมีการแก้ไขใน `website/` หรือ workflow file)
- Manual trigger จาก GitHub UI

**Features**:
- ✅ Smart path filtering (ทำงานเฉพาะเมื่อมีการเปลี่ยนแปลงที่เกี่ยวข้อง)
- ✅ Node.js 20 caching
- ✅ Build size checking
- ✅ Organization-aware configuration
- ✅ Deployment summary

**Permissions Required**:
- `contents: read`
- `pages: write`
- `id-token: write`

### 2. `obsidian-sync.yml` - Sync from Obsidian Vault

**Purpose**: Sync เนื้อหาจาก Obsidian Vault (Private Repo) มาที่ Docusaurus Repository

**Triggers**:
- `repository_dispatch` event (จาก Obsidian Vault repo)
- Manual trigger จาก GitHub UI

**Features**:
- ✅ Cross-repository checkout
- ✅ obsidian-export integration
- ✅ Automatic content processing
- ✅ Assets synchronization
- ✅ Auto-commit and push
- ✅ Auto-trigger deployment

**Prerequisites**:
1. **Personal Access Token (PAT)** ต้องตั้งค่าใน GitHub Secrets:
   - Name: `OBSIDIAN_SYNC_TOKEN`
   - Permissions required:
     - `repo` (full control) - สำหรับ access repositories ใน Organization
     - `workflow` - สำหรับ trigger workflows

2. **Source Repository**: Obsidian Vault repository ใน Organization
   - Default: `DataFabric-Academy/obsidian-vault`
   - สามารถระบุ custom repository ผ่าน workflow inputs

**Setup Instructions**:

1. สร้าง Personal Access Token:
   ```
   GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens
   ```
   - Name: `Obsidian Sync Token`
   - Expiration: ตามความเหมาะสม
   - Repository access: `DataFabric-Academy` organization
   - Permissions:
     - Contents: Read and write
     - Actions: Read
     - Metadata: Read

2. เพิ่ม Token เป็น Secret:
   ```
   Repository Settings → Secrets and variables → Actions → New repository secret
   ```
   - Name: `OBSIDIAN_SYNC_TOKEN`
   - Value: [Paste your PAT]

3. (Optional) ตั้งค่า Repository Dispatch ใน Obsidian Vault:
   ```yaml
   # ใน Obsidian Vault repo
   on:
     push:
       branches: [main]
   jobs:
     trigger-sync:
       runs-on: ubuntu-latest
       steps:
         - name: Trigger Docusaurus Sync
           uses: peter-evans/repository-dispatch@v2
           with:
             token: ${{ secrets.OBSIDIAN_SYNC_TOKEN }}
             repository: DataFabric-Academy/DataFabric-Academy.github.io
             event-type: obsidian-sync
   ```

## Organization-based Architecture

Repositories ทั้งหมดอยู่ใน **DataFabric-Academy** Organization:

- `DataFabric-Academy/DataFabric-Academy.github.io` - Main Portal (Docusaurus)
- `DataFabric-Academy/obsidian-vault` - Obsidian Vault (Private)
- `DataFabric-Academy/course-ms-sql` - SQL Server Course
- `DataFabric-Academy/course-power-bi` - Power BI Course
- `DataFabric-Academy/course-n8n` - n8n Course

## Troubleshooting

### Error: Permission denied
- ตรวจสอบว่า PAT token มี permissions ที่ถูกต้อง
- ตรวจสอบว่า token ถูกตั้งค่าใน Secrets แล้ว

### Error: Repository not found
- ตรวจสอบว่า repository name ถูกต้อง
- ตรวจสอบว่า PAT token มี access ไปยัง Organization repositories

### Error: obsidian-export not found
- Workflow จะพยายาม install ผ่าน cargo ก่อน
- ถ้าไม่สำเร็จ จะ download pre-built binary
- ตรวจสอบ logs สำหรับ error details

## References

- [Knowledge Fabric Documentation](./docs/intro.md)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [obsidian-export Documentation](https://github.com/zoni/obsidian-export)
- [Docusaurus Deployment Guide](https://docusaurus.io/docs/deployment)
