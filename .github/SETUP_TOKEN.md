# คู่มือการสร้าง Personal Access Token สำหรับ Obsidian Sync

## ภาพรวม

Personal Access Token (PAT) ใช้สำหรับให้ GitHub Actions สามารถเข้าถึง Obsidian vault repository (private repo) เพื่อซิงค์เนื้อหามายัง Docusaurus repository

## ขั้นตอนการสร้าง Token

### ขั้นตอนที่ 1: เข้าสู่ GitHub Settings

1. ไปที่ GitHub.com และล็อกอิน
2. คลิกที่ **Profile picture** (มุมขวาบน)
3. เลือก **Settings**

### ขั้นตอนที่ 2: ไปที่ Developer Settings

1. ในเมนูด้านซ้าย ให้เลื่อนลงไปหา **Developer settings**
2. คลิก **Developer settings**

### ขั้นตอนที่ 3: สร้าง Fine-grained Personal Access Token

1. ในเมนูด้านซ้าย เลือก **Fine-grained tokens**
2. คลิก **Generate new token**
3. ระบุข้อมูล:

   **Token name**: 
   ```
   OBSIDIAN_VAULT_TOKEN
   ```
   
   **Description** (optional):
   ```
   Token for syncing Obsidian vault content to Docusaurus repository
   ```
   
   **Expiration**:
   - เลือก **90 days** หรือ **Custom** (แนะนำ: 1 year สำหรับ production)
   - **หมายเหตุ**: Token หมดอายุต้องสร้างใหม่

### ขั้นตอนที่ 4: กำหนด Permissions

#### Repository Access
- เลือก **Only select repositories**
- เลือก Obsidian vault repository (เช่น `DataFabric-Academy/obsidian-vault`)

#### Repository Permissions

**Contents**:
- เลือก **Read-only** ✅
  - ใช้สำหรับอ่านเนื้อหาใน Obsidian vault repository

**Metadata**:
- เลือก **Read-only** ✅
  - ใช้สำหรับอ่าน metadata ของ repository

**หมายเหตุ**: ไม่ต้องให้ permissions อื่น ๆ เพราะใช้แค่ read-only

### ขั้นตอนที่ 5: สร้าง Token

1. คลิก **Generate token** (สีเขียว)
2. **สำคัญ**: คัดลอก token ทันที (จะแสดงแค่ครั้งเดียว!)
   - Token จะมีรูปแบบ: `github_pat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
3. เก็บ token ไว้ในที่ปลอดภัย (เช่น password manager)

:::warning ⚠️ คำเตือน

**Token จะแสดงแค่ครั้งเดียวเท่านั้น!** 
- ถ้าปิดหน้าต่างนี้ไป จะไม่สามารถดู token ได้อีก
- ต้องสร้าง token ใหม่ถ้าลืมคัดลอก

:::

## ขั้นตอนที่ 6: เพิ่ม Token เป็น Secret ใน Repository

### สำหรับ Docusaurus Repository (DataFabric-Academy.github.io)

1. ไปที่ repository: `https://github.com/DataFabric-Academy/DataFabric-Academy.github.io`
2. คลิก **Settings** (แท็บด้านบน)
3. ในเมนูด้านซ้าย เลือก **Secrets and variables** → **Actions**
4. คลิก **New repository secret**
5. ระบุข้อมูล:

   **Name**: 
   ```
   OBSIDIAN_VAULT_TOKEN
   ```
   (ต้องตรงกับชื่อใน workflow file)
   
   **Secret**: 
   ```
   <paste-your-token-here>
   ```
   (วาง token ที่คัดลอกมา)
   
6. คลิก **Add secret**

:::success ✅ เสร็จสิ้น

Token ถูกเพิ่มเป็น Secret แล้ว! 
- GitHub Actions จะสามารถใช้ token นี้ผ่าน `${{ secrets.OBSIDIAN_VAULT_TOKEN }}`
- Token จะไม่แสดงใน logs (GitHub จะซ่อนอัตโนมัติ)

:::

## ตรวจสอบการตั้งค่า

### วิธีทดสอบ

1. ไปที่ **Actions** tab ใน repository
2. เลือก workflow **"Sync Obsidian to Docusaurus"**
3. คลิก **Run workflow** → **Run workflow**
4. ตรวจสอบว่า workflow run สำเร็จ:
   - ✅ ไม่มี error เรื่อง "OBSIDIAN_VAULT_TOKEN not found"
   - ✅ ไม่มี error เรื่อง "Permission denied"
   - ✅ สามารถ checkout source repository ได้

### ถ้ามี Error

#### Error: "OBSIDIAN_VAULT_TOKEN not found"
- **Solution**: ตรวจสอบว่า Secret ถูกสร้างใน repository settings แล้ว
- ตรวจสอบว่า Name ตรงกับ `OBSIDIAN_VAULT_TOKEN` (case-sensitive)

#### Error: "Permission denied" หรือ "Repository not found"
- **Solution**: 
  - ตรวจสอบว่า token มี permissions สำหรับ repository ที่ถูกต้อง
  - ตรวจสอบว่า repository name ถูกต้อง (org/repo format)
  - ตรวจสอบว่า token ยังไม่หมดอายุ

#### Error: "Token expired"
- **Solution**: สร้าง token ใหม่และอัปเดต Secret

## Best Practices

### Security

1. **ใช้ Fine-grained tokens** แทน Classic tokens
   - จำกัด permissions ให้เท่าที่จำเป็น
   - จำกัด scope ให้เฉพาะ repository ที่ต้องการ

2. **หมั่นตรวจสอบและ rotate tokens**
   - ตั้ง expiration date ที่เหมาะสม
   - สร้าง token ใหม่ก่อนหมดอายุ

3. **อย่า commit token ลงใน code**
   - ใช้ GitHub Secrets เท่านั้น
   - Token จะไม่แสดงใน logs อัตโนมัติ

4. **จำกัด repository access**
   - ใช้ "Only select repositories" แทน "All repositories"

### Maintenance

1. **ตั้ง reminder** สำหรับ token expiration
2. **Document token purpose** ใน description
3. **Review permissions** เป็นระยะ

## Troubleshooting

### Token ไม่ทำงาน

1. ตรวจสอบว่า token ยังไม่หมดอายุ
2. ตรวจสอบว่า permissions ถูกต้อง
3. ตรวจสอบว่า repository access ถูกต้อง
4. ลองสร้าง token ใหม่

### ต้องการเปลี่ยน Token

1. สร้าง token ใหม่ตามขั้นตอนข้างต้น
2. ไปที่ Settings → Secrets and variables → Actions
3. คลิก **Update** ที่ `OBSIDIAN_VAULT_TOKEN`
4. วาง token ใหม่
5. คลิก **Update secret**

### ต้องการลบ Token

1. ไปที่ Settings → Secrets and variables → Actions
2. คลิก **Delete** ที่ `OBSIDIAN_VAULT_TOKEN`
3. ยืนยันการลบ

**หมายเหตุ**: หลังจากลบ token แล้ว workflow จะไม่สามารถ sync ได้จนกว่าจะสร้าง token ใหม่

## References

- [GitHub Docs: Managing Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- [GitHub Docs: Fine-grained Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens/fine-grained-personal-access-tokens)
- [GitHub Docs: Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

