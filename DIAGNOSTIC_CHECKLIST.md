# GitHub Pages Diagnostic Checklist

## 🔍 ตรวจสอบทีละขั้นตอน

### 1️⃣ GitHub Actions Workflow

**URL**: https://github.com/DataFabric-Academy/DataFabric-Academy.github.io/actions

- [ ] ดู workflow "Build and Deploy Sites" รันล่าสุด
- [ ] ตรวจสอบว่ามี **green checkmark** ✅ (สำเร็จ)
- [ ] คลิกเข้าไปดู logs
- [ ] ตรวจสอบว่า step "Deploy to GitHub Pages" สำเร็จ
- [ ] ดูใน logs ว่ามีข้อความ `Deploying to gh-pages branch...` หรือไม่

**ถ้า workflow ล้มเหลว:**
- ดู error message ใน logs
- ตรวจสอบว่า build สำเร็จหรือไม่
- ตรวจสอบว่า permissions ถูกต้อง

---

### 2️⃣ GitHub Pages Settings

**URL**: https://github.com/DataFabric-Academy/DataFabric-Academy.github.io/settings/pages

- [ ] ไปที่ **Settings** → **Pages**
- [ ] ในส่วน **Build and deployment** → **Source**
  - **ต้องเลือก**: `GitHub Actions` ✅
  - **ไม่ใช่**: `Deploy from a branch` ❌
- [ ] ตรวจสอบว่ามี **Active deployments** แสดงอยู่
- [ ] ดู URL ที่แสดง: `https://DataFabric-Academy.github.io`

**ถ้า Source ไม่ใช่ GitHub Actions:**
- เปลี่ยนเป็น "GitHub Actions"
- คลิก "Save"
- รอ 2-5 นาที

---

### 3️⃣ gh-pages Branch

**URL**: https://github.com/DataFabric-Academy/DataFabric-Academy.github.io/branches

- [ ] ตรวจสอบว่ามี branch ชื่อ `gh-pages`
- [ ] คลิกเข้าไปดู `gh-pages` branch
- [ ] ตรวจสอบว่ามีไฟล์ `index.html` ใน root
- [ ] ตรวจสอบว่ามีโฟลเดอร์ `assets/`, `blog/`, `course-*/` อยู่

**ถ้าไม่มี gh-pages branch:**
- Workflow ยังไม่ deploy สำเร็จ
- กลับไปตรวจสอบ step 1 (GitHub Actions)

---

### 4️⃣ Workflow Permissions

**URL**: https://github.com/DataFabric-Academy/DataFabric-Academy.github.io/settings/actions

- [ ] ไปที่ **Settings** → **Actions** → **General**
- [ ] ในส่วน **Workflow permissions**
  - ตรวจสอบว่า **"Read and write permissions"** ถูกเลือก ✅
  - ถ้าเป็นสีเทา → ต้องแก้ที่ Organization Settings ก่อน

**Organization Settings:**
- [ ] ไปที่: https://github.com/organizations/DataFabric-Academy/settings/actions
- [ ] ตั้งค่า **Workflow permissions** = "Read and write permissions"
- [ ] Save
- [ ] กลับมาตั้งค่า Repository อีกครั้ง

---

### 5️⃣ URLs ที่ควรทดสอบ

- [ ] https://DataFabric-Academy.github.io (GitHub Pages URL)
- [ ] https://datafabric.academy (ถ้าตั้ง custom domain แล้ว)

**ถ้ายัง 404:**
- รอ 2-5 นาที หลัง workflow deploy สำเร็จ
- ลอง hard refresh (Ctrl+Shift+R หรือ Cmd+Shift+R)
- ลองเปิดใน Incognito/Private mode
- ตรวจสอบ browser console (F12) ว่ามี error อะไร

---

## 🛠️ Quick Fixes

### ถ้า Workflow ไม่รัน:
```bash
# Manual trigger workflow
# ไปที่ Actions tab → "Build and Deploy Sites" → "Run workflow"
```

### ถ้า gh-pages branch ไม่ถูกสร้าง:
1. ตรวจสอบ workflow logs ว่ามี error หรือไม่
2. ตรวจสอบ permissions
3. ลอง push ใหม่ไปที่ master branch

### ถ้า Settings → Pages เป็นสีเทา:
- ต้องมีสิทธิ์ admin ใน repository
- หรือให้ผู้ที่มีสิทธิ์ช่วยตั้งค่า

---

## 📞 Next Steps

ถ้าทุกอย่างถูกต้องแล้ว แต่ยัง 404:

1. รออีก 5-10 นาที (GitHub Pages อาจใช้เวลา propagate)
2. ตรวจสอบว่าไม่มี custom domain conflicts
3. ลองสร้าง issue ใน repository เพื่อติดตาม
