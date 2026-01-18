# GitHub Pages Setup Guide

## 📋 ขั้นตอนการตั้งค่า GitHub Pages

### 1. สร้าง Repository บน GitHub

1. ไปที่ [GitHub](https://github.com/new)
2. สร้าง repository ชื่อ: `DataFabric-Academy.github.io`
   - **สำคัญ**: ชื่อ repository ต้องตรงกับ `username.github.io` หรือ `organization.github.io`
3. เลือก:
   - **Owner**: `DataFabric-Academy` (organization)
   - **Repository name**: `DataFabric-Academy.github.io`
   - **Visibility**: Public (GitHub Pages ฟรีสำหรับ Public repos)
   - **ไม่ต้อง** ติก Initialize with README, .gitignore, หรือ license

### 2. Push Code ขึ้น GitHub

```bash
cd d:\dev\github\DataFabric-Academy\DataFabric-Academy.github.io

# ตรวจสอบ remote (ถ้ายังไม่มี)
git remote -v

# เพิ่ม remote (ถ้ายังไม่มี)
git remote add origin https://github.com/DataFabric-Academy/DataFabric-Academy.github.io.git

# หรือใช้ SSH (ถ้า setup SSH keys แล้ว)
# git remote add origin git@github.com:DataFabric-Academy/DataFabric-Academy.github.io.git

# Push ไปยัง GitHub
git branch -M main
git push -u origin main
```

### 3. ตั้งค่า GitHub Pages (วิธีที่ 1: ใช้ GitHub Actions - แนะนำ)

#### 3.1 ตรวจสอบ GitHub Actions Workflow

GitHub Actions workflow (`.github/workflows/deploy.yml`) ถูกตั้งค่าไว้แล้ว:
- จะ build และ deploy อัตโนมัติเมื่อ push ไปยัง `main` branch
- Deploy ไปยัง `gh-pages` branch อัตโนมัติ

#### 3.2 เปิดใช้งาน GitHub Actions

1. ไปที่ Repository → **Settings** → **Actions** → **General**
2. ตรวจสอบว่า "Workflow permissions" ตั้งเป็น:
   - ✅ **Read and write permissions** (สำหรับ deploy)
   - ✅ ✅ **Allow GitHub Actions to create and approve pull requests**

#### 3.3 เปิดใช้งาน GitHub Pages

1. ไปที่ Repository → **Settings** → **Pages**
2. ตั้งค่า **Source**:
   - **Deploy from a branch**: `gh-pages` (สร้างโดย GitHub Actions)
   - **Branch**: `gh-pages` → `/ (root)`
3. คลิก **Save**

#### 3.4 ตรวจสอบ Custom Domain (ถ้ามี)

ถ้าต้องการใช้ custom domain `datafabric.academy`:

1. ไปที่ Repository → **Settings** → **Pages**
2. ในส่วน **Custom domain**: ใส่ `datafabric.academy`
3. ติก **Enforce HTTPS** (แนะนำ)

**หมายเหตุ**: ต้องตั้งค่า DNS records ที่ DNS provider:
- **Type**: `CNAME`
- **Name**: `@` หรือ `www`
- **Value**: `DataFabric-Academy.github.io`

### 4. ตั้งค่า GitHub Pages (วิธีที่ 2: Deploy จาก Branch)

ถ้าไม่ใช้ GitHub Actions:

1. ไปที่ Repository → **Settings** → **Pages**
2. ตั้งค่า **Source**:
   - **Deploy from a branch**
   - **Branch**: `main` → `/sites/main-portal/build`
3. คลิก **Save**

**ข้อเสีย**: วิธีนี้ deploy ได้แค่ main-portal เท่านั้น

### 5. ตรวจสอบ Deployment

#### ตรวจสอบ GitHub Actions

1. ไปที่ Repository → **Actions** tab
2. ดู workflow run ที่ชื่อ "Build and Deploy Sites"
3. ตรวจสอบว่า build และ deploy สำเร็จ (green checkmark)

#### ตรวจสอบ GitHub Pages

1. ไปที่ Repository → **Settings** → **Pages**
2. ดู URL ของ site: `https://datafabric.academy` (หรือ `https://DataFabric-Academy.github.io`)
3. เปิด URL ใน browser เพื่อตรวจสอบ

---

## 🔧 การตั้งค่าเพิ่มเติม

### Branch Protection (แนะนำ)

เพื่อป้องกันการเปลี่ยนแปลงสำคัญ:

1. ไปที่ Repository → **Settings** → **Branches**
2. เพิ่ม rule สำหรับ `main` branch:
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging

### GitHub Actions Secrets (ถ้าต้องการ)

ถ้ามี secrets หรือ tokens:

1. ไปที่ Repository → **Settings** → **Secrets and variables** → **Actions**
2. คลิก **New repository secret**
3. เพิ่ม secrets ที่ต้องการ

---

## 🚀 Workflow การใช้งาน

### การ Deploy ใหม่

```bash
# 1. แก้ไข content ใน Obsidian Vault
# 2. Sync content
pnpm run sync

# 3. Commit และ push
git add .
git commit -m "Update content from Obsidian Vault"
git push origin main

# 4. GitHub Actions จะ build และ deploy อัตโนมัติ
```

### ตรวจสอบ Deployment Status

1. ไปที่ Repository → **Actions** tab
2. ดู workflow run ล่าสุด
3. ตรวจสอบ logs หากมี error

---

## ⚠️ ปัญหาที่พบบ่อย

### 1. GitHub Pages ไม่แสดง

**แก้ไข**:
- ตรวจสอบว่า GitHub Actions workflow ทำงานสำเร็จ
- ตรวจสอบว่า `gh-pages` branch ถูกสร้างแล้ว
- ตรวจสอบ Settings → Pages → Source ว่าตั้งค่า `gh-pages` branch

### 2. Build ล้มเหลวใน GitHub Actions

**แก้ไข**:
- ตรวจสอบ logs ใน Actions tab
- ตรวจสอบว่า dependencies ติดตั้งครบ (`pnpm install`)
- ตรวจสอบ broken links หรือ errors ใน build

### 3. Custom Domain ไม่ทำงาน

**แก้ไข**:
- ตรวจสอบ DNS settings (CNAME record)
- รอ DNS propagation (อาจใช้เวลา 24-48 ชั่วโมง)
- ตรวจสอบว่า custom domain ถูกใส่ใน GitHub Pages settings

---

## 📚 เอกสารอ้างอิง

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Docusaurus Deployment Guide](https://docusaurus.io/docs/deployment)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

## ✅ Checklist

- [ ] สร้าง repository `DataFabric-Academy.github.io` บน GitHub
- [ ] Push code ไปยัง GitHub
- [ ] เปิดใช้งาน GitHub Actions
- [ ] ตั้งค่า GitHub Pages → Source: `gh-pages` branch
- [ ] ตรวจสอบ deployment ใน Actions tab
- [ ] ทดสอบเปิด website ที่ `https://datafabric.academy`
- [ ] (Optional) ตั้งค่า Custom Domain
