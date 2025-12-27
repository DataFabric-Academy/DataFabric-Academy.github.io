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
- ✅ **Image wikilinks conversion** (`![[image.png]]` → `![](./assets/image.png)`)
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

**Image Handling**:
- แปลง `![[image.png]]` เป็น `![](./assets/image.png)`
- Copy images จาก `source-vault/assets/` ไปยัง `target-repo/website/docs/assets/`
- รองรับไฟล์: `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`

## Organization-based Architecture

Repositories ทั้งหมดอยู่ใน **DataFabric-Academy** Organization:

- `DataFabric-Academy/DataFabric-Academy.github.io` - Main Portal (Docusaurus)
- `DataFabric-Academy/obsidian-vault` - Obsidian Vault (Private)
- `DataFabric-Academy/course-ms-sql` - SQL Server Course
- `DataFabric-Academy/course-power-bi` - Power BI Course
- `DataFabric-Academy/course-n8n` - n8n Course

**หมายเหตุ**: แต่ละ Portal มี workflow `obsidian-sync.yml` ของตนเอง และรับผิดชอบ sync เอง

## Troubleshooting

### Error: Permission denied
- ตรวจสอบว่า PAT token มี permissions ที่ถูกต้อง
- ตรวจสอบว่า token ถูกตั้งค่าใน Secrets แล้ว

### Error: Repository not found
- ตรวจสอบว่า repository name ถูกต้อง
- ตรวจสอบว่า PAT token มี access ไปยัง Organization repositories

### Error: Image wikilinks not converted
- ตรวจสอบว่า images ถูก copy ไปยัง `assets/` directory
- ตรวจสอบว่า path ใน markdown ถูกต้อง (`./assets/image.png`)

### Error: obsidian-export not found
- Workflow จะพยายาม install ผ่าน cargo ก่อน
- ถ้าไม่สำเร็จ จะ download pre-built binary
- ตรวจสอบ logs สำหรับ error details

## References

- [Knowledge Fabric Documentation](../website/docs/intro.md)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [obsidian-export Documentation](https://github.com/zoni/obsidian-export)
- [Docusaurus Deployment Guide](https://docusaurus.io/docs/deployment)
- [SETUP_OBSIDIAN_SYNC_TOKEN.md](../SETUP_OBSIDIAN_SYNC_TOKEN.md) - คู่มือตั้งค่า PAT Token