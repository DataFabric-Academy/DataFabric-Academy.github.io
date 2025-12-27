---
slug: automated-secops-lab-n8n
title: 🛡️ Automated Penetration Testing & SecOps Lab with n8n
authors:
  - DataFabric-Academy
  - phakkhaphong
tags:
  - secops
  - n8n
  - automation
  - penetration-testing
  - devsecops
  - nuclei
  - nmap
date: 2025-12-10T19:30
---

> **Lab Environment สำหรับการศึกษา** - ระบบจำลองสภาพแวดล้อมสำหรับหลักสูตร "Automated Penetration Testing & DevSecOps with n8n" ออกแบบมาเพื่อให้ผู้เรียนสามารถฝึกเขียน Workflow ควบคุม Security Tools (Nuclei, Nmap) และทดสอบเป้าหมายจำลองได้อย่างปลอดภัยและสมจริง

<!-- truncate -->

## 🎯 ภาพรวม

โปรเจกต์ **lab-n8n-secops** เป็น Lab Environment ที่สมบูรณ์สำหรับการเรียนรู้และฝึกฝนทักษะ Automated Security Operations โดยใช้ n8n เป็น Automation Platform หลัก

### คุณสมบัติหลัก

- **Automated Vulnerability Detection** - ระบบตรวจจับช่องโหว่อัตโนมัติด้วย AI
- **Natural Language Command Processing** - รับคำสั่งผ่าน Line Messenger แบบ Natural Language
- **Integration with Security Tools** - รองรับ Nuclei, Nmap และ Security Tools อื่นๆ
- **AI-Powered Reporting** - สร้างรายงานสรุปผลการสแกนด้วย AI (ภาษาไทย)
- **Complete Lab Environment** - สภาพแวดล้อมทดสอบที่สมบูรณ์พร้อม Docker Compose

## 📋 SecOps Demo Workflow

Workflow หลักจะทำการ:

1. **รับข้อความจาก Line Messaging API** (Natural Language Command)
2. **ใช้ AI แปลงคำสั่งเป็น Nmap Command** - แปลงคำสั่งภาษาไทย/อังกฤษเป็น Nmap command อัตโนมัติ
3. **สแกน Port ด้วย Nmap** และ Parse ผลลัพธ์เป็น XML
4. **แปลงผลลัพธ์ Nmap เป็น URL targets** สำหรับ Nuclei
5. **สแกนช่องโหว่ด้วย Nuclei** (เฉพาะ tags: exposure)
6. **ใช้ AI สร้างรายงานสรุปผลการสแกน** (ภาษาไทย)
7. **ส่งรายงานกลับไปยัง Line Messenger**

### Workflow Flow

```
Line Messaging Trigger (รับข้อความ)
    ↓
AI - Create Nmap Scan Command (แปลง natural language → nmap command)
    ↓
nmap scan execute (รัน nmap command)
    ↓
XML (Parse XML output)
    ↓
Code in JavaScript (แปลง nmap results → Nuclei targets)
    ↓
If (ตรวจสอบว่ามี port เปิดหรือไม่)
    ↓
    ├─ Yes → Execute Command (รัน Nuclei scan)
    │           ↓
    │           Clean & Parse Nuclei NDJSON (Parse JSON output)
    │           ↓
    │           AI - Generate Report (สร้างรายงานภาษาไทย)
    │           ↓
    │           Line Messaging (ส่งรายงานกลับ)
    │
    └─ No → (ไม่รัน Nuclei)
```

## 💬 วิธีใช้งาน

### ตัวอย่างคำสั่งที่ส่งผ่าน Line:

1. **สแกนแบบด่วน:**
   ```
   สแกนพอร์ตเว็บเครื่อง victim-app แบบด่วน
   ```

2. **สแกนแบบเต็ม:**
   ```
   Full scan on victim-app
   ```

3. **สแกนเฉพาะ Port:**
   ```
   สแกนพอร์ต 80, 443, 8080 ของ victim-app
   ```

4. **สแกนด้วย IP:**
   ```
   Scan 192.168.1.100 with OS detection
   ```

AI จะแปลงคำสั่งเหล่านี้เป็น nmap command อัตโนมัติ และ workflow จะทำงานต่อ

## ⚙️ การตั้งค่า (Configuration)

### 1. Line Messaging API

**Node: Line Messaging Trigger & Line Messaging**

ต้องติดตั้งและตั้งค่า Line Messaging API:

1. **สร้าง Line Channel:**
   - ไปที่ [Line Developers Console](https://developers.line.biz/console/)
   - สร้าง Provider และ Messaging API Channel
   - เก็บ **Channel Access Token** และ **Channel Secret**

2. **ตั้งค่า Webhook URL:**
   - ใน n8n ให้ Activate workflow
   - Copy Webhook URL จาก node **Line Messaging Trigger**
   - ไปตั้งค่าใน Line Developers Console → Webhook settings
   - ใส่ Webhook URL และ Enable webhook

3. **สร้าง Credential ใน n8n:**
   - คลิกที่ node **Line Messaging Trigger**
   - คลิก **Create New Credential** → **Line Messaging API**
   - ใส่ Channel Access Token และ Channel Secret
   - บันทึก

**หมายเหตุ:** ต้องใช้ Line Messaging API (ไม่ใช่ Line Notify) เพราะ workflow นี้ใช้สำหรับรับและส่งข้อความแบบสองทาง

### 2. OpenAI API

**Nodes: OpenAI Chat Model & OpenAI Chat Model1**

ต้องสร้าง Credential สำหรับ OpenAI API:

1. คลิกที่ node **OpenAI Chat Model** หรือ **OpenAI Chat Model1**
2. คลิก **Create New Credential**
3. เลือก **OpenAI API**
4. ใส่ API Key ของ OpenAI
5. บันทึก

**หมายเหตุ:** ใช้ Credential เดียวกันสำหรับทั้งสอง node ได้

### 3. Target Configuration

- Target จะถูกระบุผ่านข้อความที่ส่งมาใน Line
- ตัวอย่าง: "สแกนพอร์ตเว็บเครื่อง victim-app แบบด่วน"
- AI จะแปลงเป็น nmap command อัตโนมัติ
- Workflow จะสร้าง URL สำหรับ Nuclei จาก IP:Port ที่พบ

## 🧪 การทดสอบ

### 1. ทดสอบด้วย Line

1. เพิ่ม Line Bot เป็นเพื่อน
2. ส่งข้อความ: "สแกนพอร์ตเว็บเครื่อง victim-app แบบด่วน"
3. รอรับรายงานสรุปผลการสแกน

### 2. ตรวจสอบ Logs

ดู execution logs ใน n8n UI:
- ไปที่ **Executions** tab
- ดูรายละเอียดแต่ละ step
- ตรวจสอบว่า nmap command ถูกสร้างถูกต้องหรือไม่

### 3. ทดสอบ Nmap Command

ทดสอบ nmap command ที่ AI สร้าง:
```bash
docker exec -it n8n-secops nmap -p 80,443,8080 -F -T4 -oX - victim-app
```

### 4. ทดสอบ Nuclei Scan

ทดสอบ Nuclei scan:
```bash
docker exec -it n8n-secops nuclei -u http://victim-app:80 -silent -disable-update-check -j -tags exposure -nc -no-stdin
```

## 🔧 การแก้ไขปัญหา (Troubleshooting)

### ปัญหา: Line Messaging ไม่รับข้อความ

- ตรวจสอบว่า Webhook URL ถูกตั้งค่าใน Line Developers Console แล้ว
- ตรวจสอบว่า Webhook ถูก Enable แล้ว
- ตรวจสอบ Channel Access Token และ Channel Secret ถูกต้อง
- ดู logs ใน n8n Executions

### ปัญหา: AI ไม่สร้าง nmap command

- ตรวจสอบ OpenAI API Key ถูกต้อง
- ตรวจสอบว่ามี Credit ใน OpenAI Account
- ดู error logs ใน n8n Executions
- ลองส่งข้อความใหม่ที่ชัดเจนขึ้น

### ปัญหา: Nmap ไม่พบ Port

- ตรวจสอบว่า victim-app container กำลังรันอยู่
- ทดสอบด้วย: `docker exec -it n8n-secops nmap -p 80,8080 victim-app`
- ตรวจสอบว่า target ที่ระบุในข้อความถูกต้อง

### ปัญหา: Nuclei ไม่พบช่องโหว่

- อัปเดต Nuclei templates: `nuclei -update-templates`
- ตรวจสอบว่า victim-app มีไฟล์ `.env` ที่เปิดเผยอยู่
- ตรวจสอบว่า Nuclei scan ใช้ tags `exposure` ถูกต้อง

## 📥 การ Import Workflow

1. เปิด n8n UI ที่ `http://localhost:5678`
2. คลิก **Workflows** → **Import from File**
3. เลือกไฟล์ `secops-workflow.json`
4. Workflow จะถูก import เข้ามาในระบบ

## 🔗 Resources

- **Repository**: [DataFabric-Academy/lab-n8n-secops](https://github.com/DataFabric-Academy/lab-n8n-secops)
- [n8n Documentation](https://docs.n8n.io/)
- [Nuclei Documentation](https://docs.nuclei.sh/)
- [Nmap Documentation](https://nmap.org/book/)
- [Line Messaging API Documentation](https://developers.line.biz/en/docs/messaging-api/)
- [OpenAI API Documentation](https://platform.openai.com/docs/)

## ⚠️ หมายเหตุสำคัญ

- Workflow นี้ใช้สำหรับ **การศึกษาและ Demo เท่านั้น**
- อย่าใช้กับระบบจริงโดยไม่ได้รับอนุญาต
- ตรวจสอบให้แน่ใจว่า target เป็นระบบที่คุณมีสิทธิ์ทดสอบ
- AI จะสร้าง nmap command ตามคำสั่งที่ได้รับ ควรระวังคำสั่งที่อาจเป็นอันตราย

## 🤝 การมีส่วนร่วม

หากพบปัญหาหรือมีข้อเสนอแนะ กรุณา:

1. สร้าง Issue ใน Repository
2. อธิบายปัญหาหรือข้อเสนอแนะอย่างชัดเจน
3. แนบ Logs หรือ Screenshots (ถ้ามี)

---

<div align="center">

**⚠️ ใช้อย่างมีความรับผิดชอบ ⚠️**

*โปรเจกต์นี้ใช้สำหรับการศึกษาเท่านั้น*

</div>
