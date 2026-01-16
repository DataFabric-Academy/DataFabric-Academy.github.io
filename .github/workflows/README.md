# GitHub Actions Workflows

## Overview

Repository นี้ใช้ GitHub Actions สำหรับ automation ของ Docusaurus site:

- **Orchestration Layer**: GitHub Actions
- **Presentation Layer**: Docusaurus (This Repo)

## Workflows

### `deploy.yml` - Deploy to GitHub Pages

**Purpose**: Build และ deploy Docusaurus site ไปยัง GitHub Pages

**Triggers**:
- Push to `main` branch (เฉพาะเมื่อมีการแก้ไขในไฟล์ที่เกี่ยวข้อง หรือ workflow file)
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

## Organization-based Architecture

Repositories ทั้งหมดอยู่ใน **DataFabric-Academy** Organization:

- `DataFabric-Academy/DataFabric-Academy.github.io` - Main Portal (Docusaurus)
- `DataFabric-Academy/obsidian-vault` - Obsidian Vault (Private)
- `DataFabric-Academy/course-ms-sql` - SQL Server Course
- `DataFabric-Academy/course-power-bi` - Power BI Course
- `DataFabric-Academy/course-n8n` - n8n Course

## Troubleshooting

### Error: Build failed
- ตรวจสอบว่า dependencies ถูก install เรียบร้อยแล้ว
- ตรวจสอบ logs สำหรับ error details

### Error: Deployment failed
- ตรวจสอบว่า permissions ถูกตั้งค่าถูกต้อง
- ตรวจสอบว่า build artifact ถูกสร้างสำเร็จ

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docusaurus Deployment Guide](https://docusaurus.io/docs/deployment)