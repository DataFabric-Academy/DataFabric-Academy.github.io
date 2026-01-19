# Workflow Test Guide

## 🧪 การทดสอบ Workflow ทั้งระบบ

### Step 1: Commit และ Push

```bash
# ตรวจสอบการเปลี่ยนแปลง
git status

# Commit
git add -A
git commit -m "refactor: optimize codebase"

# Push
git push origin master
```

### Step 2: ตรวจสอบ GitHub Actions

**URL**: https://github.com/DataFabric-Academy/DataFabric-Academy.github.io/actions

**สิ่งที่ต้องตรวจสอบ**:
- [ ] Workflow "Build and Deploy Sites" เริ่มรันทันทีหลัง push
- [ ] Build job สำเร็จ (✅ green checkmark)
- [ ] Deploy job สำเร็จ (✅ green checkmark)
- [ ] ไม่มี error ใน logs

**Timeline**:
- Build: ~2-3 นาที
- Deploy: ~1-2 นาที
- **Total**: ~3-5 นาที

### Step 3: ตรวจสอบ Deployment

**URL**: https://github.com/DataFabric-Academy/DataFabric-Academy.github.io/settings/pages

**สิ่งที่ต้องตรวจสอบ**:
- [ ] มี **Active deployments** แสดงอยู่
- [ ] Status เป็น "Deployed successfully" ✅
- [ ] URL แสดง: `https://DataFabric-Academy.github.io`

### Step 4: ทดสอบเว็บไซต์

**URLs ที่ต้องทดสอบ**:
- [ ] https://DataFabric-Academy.github.io (Main page)
- [ ] https://DataFabric-Academy.github.io/docs/intro (Main docs)
- [ ] https://DataFabric-Academy.github.io/course-n8n/ (Course n8n)
- [ ] https://DataFabric-Academy.github.io/course-power-bi/ (Course Power BI)
- [ ] https://DataFabric-Academy.github.io/course-ms-sql/ (Course MS SQL)
- [ ] https://DataFabric-Academy.github.io/blog (Blog)

**สิ่งที่ต้องตรวจสอบ**:
- [ ] หน้าโหลดได้ (ไม่ 404)
- [ ] Navigation ทำงานได้
- [ ] Sidebar แสดงถูกต้อง
- [ ] Images และ assets โหลดได้
- [ ] Dark/Light mode ทำงานได้

### Step 5: ตรวจสอบการเปลี่ยนแปลง

**สิ่งที่ต้องตรวจสอบ**:
- [ ] Refactored code ทำงานได้ (COURSES array)
- [ ] Sync script ยังทำงานได้
- [ ] Documentation links ถูกต้อง

---

## 🔍 Troubleshooting

### Workflow ไม่รัน

**ตรวจสอบ**:
1. ไฟล์ `.github/workflows/deploy.yml` ถูก push แล้ว
2. Branch เป็น `master` หรือ `main`
3. Workflow permissions ถูกต้อง

**แก้ไข**:
- Manual trigger: Actions → "Build and Deploy Sites" → "Run workflow"

### Build ล้มเหลว

**ตรวจสอบ logs**:
- ดู error message ใน Actions tab
- ตรวจสอบว่า dependencies install สำเร็จ
- ตรวจสอบว่า build command ทำงานได้

**ทดสอบ local**:
```bash
pnpm install
pnpm run build
```

### Deploy ล้มเหลว

**ตรวจสอบ**:
- Environment `github-pages` อนุญาต branch `master`
- Workflow permissions = "Read and write permissions"
- GitHub Pages Source = "GitHub Actions"

### Page ยังไม่อัปเดต

**รอ**: 2-5 นาที หลัง deployment สำเร็จ (GitHub Pages propagation)

**ทดสอบ**:
- Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
- Incognito/Private mode
- ตรวจสอบ browser console (F12)

---

## ✅ Success Criteria

Workflow ทำงานสำเร็จเมื่อ:

1. ✅ GitHub Actions workflow รันและสำเร็จ
2. ✅ Deployment สำเร็จ (Active deployments แสดง)
3. ✅ เว็บไซต์ทุกหน้าเข้าถึงได้
4. ✅ Navigation และ features ทำงานได้
5. ✅ ไม่มี broken links หรือ errors

---

**Last Updated**: 2026-01-19
