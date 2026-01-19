# GitHub Pages Troubleshooting Guide

## ⚙️ Workflow Permissions Settings

### คำถาม: Choose the default permissions granted to the GITHUB_TOKEN?

**คำตอบ: เลือก "Read and write permissions"**

#### ตัวเลือกที่ควรเลือก:

**✅ Read and write permissions** (แนะนำ)
- ให้สิทธิ์ `GITHUB_TOKEN` ในการ read และ write repository
- จำเป็นสำหรับการ deploy ไปยัง `gh-pages` branch
- เหมาะสำหรับ workflow ที่ต้อง push ไฟล์

**❌ Read repository contents and packages permissions** (ไม่แนะนำ)
- ให้สิทธิ์เพียงอ่าน repository
- ไม่สามารถ push ไปยัง branch ได้
- จะทำให้ GitHub Pages deploy ไม่ทำงาน

**⚠️ Use workflow permissions** (ใช้ตาม workflow)
- ใช้ permissions ที่กำหนดใน workflow file
- เรามีกำหนด `permissions:` ใน workflow อยู่แล้ว แต่ถ้า Organization restrict ไว้ อาจไม่ทำงาน

---

## 🔧 การตั้งค่า

### Repository Level (ถ้าเลือกได้)

1. ไปที่: `Settings → Actions → General → Workflow permissions`
2. เลือก: **"Read and write permissions"**
3. คลิก: **Save**

### Organization Level (ถ้า Repository เป็นสีเทา)

1. ไปที่: `Organization Settings → Actions → General → Workflow permissions`
   - URL: `https://github.com/organizations/DataFabric-Academy/settings/actions`
2. ตั้งค่า: **"Read and write permissions"** หรือ
3. ตั้งค่า: **"Let Actions create and approve pull requests"** + เปิด **"Allow GitHub Actions to create and approve pull requests"**
4. คลิก: **Save**
5. กลับไปตั้งค่า Repository อีกครั้ง

---

## ✅ ตรวจสอบ Permissions ใน Workflow

ไฟล์ `.github/workflows/deploy.yml` มีการกำหนด permissions แล้ว:

```yaml
permissions:
  contents: write      # สำหรับ push ไปยัง gh-pages branch
  pages: write         # สำหรับ deploy ไปยัง GitHub Pages
  id-token: write      # สำหรับ authentication
```

หาก Organization ไม่อนุญาต การกำหนดนี้ใน workflow อาจไม่ทำงาน

---

## 📋 Checklist

- [ ] Organization Settings → Actions → Workflow permissions ตั้งค่าแล้ว
- [ ] Repository Settings → Actions → General → Workflow permissions = "Read and write permissions"
- [ ] GitHub Pages Settings → Source = "GitHub Actions"
- [ ] Workflow file มี `permissions:` กำหนดไว้แล้ว
- [ ] Actions tab แสดงว่า workflow deploy สำเร็จ
- [ ] `gh-pages` branch ถูกสร้างแล้ว
