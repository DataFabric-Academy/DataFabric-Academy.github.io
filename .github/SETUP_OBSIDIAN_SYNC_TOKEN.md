# คู่มือการตั้งค่า OBSIDIAN_SYNC_TOKEN

คู่มือนี้จะอธิบายขั้นตอนการสร้าง Personal Access Token (PAT) และการเพิ่มเป็น GitHub Secret สำหรับใช้ใน Obsidian Sync Workflow

## 📋 ภาพรวม

`OBSIDIAN_SYNC_TOKEN` เป็น Personal Access Token ที่ใช้สำหรับ:
- ✅ Access repositories ใน Organization (cross-repo operations)
- ✅ Checkout Obsidian Vault repository (Private)
- ✅ Push changes ไปยัง Docusaurus repository
- ✅ Trigger workflows ใน repositories อื่น

## 🔐 ขั้นตอนที่ 1: สร้าง Personal Access Token

### 1.1 ไปที่ GitHub Settings

1. คลิกที่ **Profile Picture** (มุมขวาบน) → **Settings**
2. หรือไปที่: `https://github.com/settings/profile`

### 1.2 ไปที่ Developer Settings

1. ในเมนูด้านซ้าย เลื่อนลงไปหา **Developer settings**
2. คลิก **Developer settings**

### 1.3 สร้าง Fine-grained Personal Access Token

1. คลิก **Personal access tokens** → **Fine-grained tokens**
2. คลิก **Generate new token**

### 1.4 ตั้งค่า Token

#### Token name
```
Obsidian Sync Token
```

#### Expiration
- เลือกระยะเวลาที่เหมาะสม (แนะนำ: **90 days** หรือ **1 year**)
- หรือ **No expiration** (ถ้าต้องการใช้งานระยะยาว)

#### Repository access
- เลือก **Only select repositories**
- เลือก Organization: **DataFabric-Academy**
- หรือเลือก **All repositories** ใน Organization

#### Permissions

**Repository permissions:**
- ✅ **Contents**: `Read and write` (จำเป็นสำหรับ checkout และ push)
- ✅ **Actions**: `Read` (สำหรับ trigger workflows)
- ✅ **Metadata**: `Read` (จำเป็นสำหรับ access repository metadata)

**Account permissions:**
- ไม่ต้องตั้งค่า (เว้นว่างไว้)

### 1.5 Generate และ Copy Token

1. คลิก **Generate token**
2. **สำคัญ**: Copy token ทันที (จะไม่แสดงอีกครั้ง!)
3. เก็บ token ไว้ในที่ปลอดภัย

:::warning ⚠️ ข้อควรระวัง

- Token จะแสดงแค่ครั้งเดียวเท่านั้น
- ถ้าลืม copy ต้องสร้างใหม่
- อย่าแชร์ token กับใคร
- เก็บ token ไว้ในที่ปลอดภัย

:::

## 🔒 ขั้นตอนที่ 2: เพิ่ม Token เป็น GitHub Secret

### 2.1 ไปที่ Repository Settings

1. ไปที่ repository: `DataFabric-Academy/DataFabric-Academy.github.io`
2. คลิก **Settings** (แท็บด้านบน)

### 2.2 ไปที่ Secrets and Variables

1. ในเมนูด้านซ้าย คลิก **Secrets and variables** → **Actions**

### 2.3 เพิ่ม New Repository Secret

1. คลิก **New repository secret**

### 2.4 ตั้งค่า Secret

#### Name
```
OBSIDIAN_SYNC_TOKEN
```

#### Secret
- Paste token ที่ copy มาจากขั้นตอนที่ 1.5

### 2.5 Save Secret

1. คลิก **Add secret**
2. ตรวจสอบว่า secret ถูกเพิ่มแล้วในรายการ

## ✅ ตรวจสอบการตั้งค่า

### วิธีตรวจสอบ

1. ไปที่ **Settings** → **Secrets and variables** → **Actions**
2. ตรวจสอบว่าเห็น `OBSIDIAN_SYNC_TOKEN` ในรายการ
3. (Optional) ทดสอบ workflow โดย manual trigger:
   - ไปที่ **Actions** tab
   - เลือก workflow: **Sync from Obsidian Vault**
   - คลิก **Run workflow** → **Run workflow**

## 🔍 Troubleshooting

### Error: Permission denied

**สาเหตุ**: Token ไม่มี permissions ที่ถูกต้อง

**วิธีแก้**:
1. ตรวจสอบว่า token มี permissions:
   - Contents: Read and write
   - Actions: Read
   - Metadata: Read
2. ตรวจสอบว่า token มี access ไปยัง Organization repositories

### Error: Repository not found

**สาเหตุ**: Token ไม่มี access ไปยัง repository

**วิธีแก้**:
1. ตรวจสอบว่า token ถูกตั้งค่าให้ access Organization: `DataFabric-Academy`
2. ตรวจสอบว่า repository name ถูกต้อง:
   - `DataFabric-Academy/obsidian-vault` (Source)
   - `DataFabric-Academy/DataFabric-Academy.github.io` (Target)

### Error: Secret not found

**สาเหตุ**: Secret ไม่ได้ถูกตั้งค่าใน repository

**วิธีแก้**:
1. ตรวจสอบว่า secret name ถูกต้อง: `OBSIDIAN_SYNC_TOKEN` (case-sensitive)
2. ตรวจสอบว่า secret ถูกตั้งค่าใน repository ที่ถูกต้อง

### Token Expired

**สาเหตุ**: Token หมดอายุ

**วิธีแก้**:
1. สร้าง token ใหม่
2. อัปเดต secret ด้วย token ใหม่

## 📚 ข้อมูลเพิ่มเติม

### Organization-based Setup

ถ้าต้องการให้ token ใช้ได้กับ repositories ทั้งหมดใน Organization:

1. ไปที่ **Organization Settings**
2. **Secrets and variables** → **Actions**
3. เพิ่ม **New organization secret**
4. ตั้งค่าเหมือนกับ repository secret

**ข้อดี**:
- ใช้ token เดียวกันได้กับ repositories ทั้งหมด
- จัดการง่ายขึ้น

### Security Best Practices

1. ✅ ใช้ Fine-grained tokens (ไม่ใช่ Classic tokens)
2. ✅ ตั้ง Expiration date ที่เหมาะสม
3. ✅ ใช้ least privilege principle (ให้ permissions เท่าที่จำเป็น)
4. ✅ หมั่นตรวจสอบและ rotate tokens
5. ✅ อย่า commit token ลงใน code

## 🔗 References

- [GitHub Docs: Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- [GitHub Docs: Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens/fine-grained-personal-access-tokens)
- [GitHub Docs: Encrypted secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Workflow Documentation](./workflows/README.md)

---

**หมายเหตุ**: หลังจากตั้งค่าเสร็จแล้ว workflow `obsidian-sync.yml` จะสามารถใช้งานได้ทันที
