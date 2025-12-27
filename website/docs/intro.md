---
sidebar_position: 1
---

# รู้จัก DataFabric Academy

ยินดีต้อนรับสู่ **DataFabric Academy** - แพลตฟอร์มการเรียนรู้แบบ **Academy-as-Code** สำหรับ Data Professionals ที่ต้องการพัฒนาทักษะด้าน Data Engineering, Business Analytics และ Cloud Technologies

## 🎯 เกี่ยวกับเรา

DataFabric Academy เป็นระบบการเรียนรู้ที่ออกแบบมาเพื่อประกอบการบรรยายของ **อาจารย์ภัคพงศ์ กฤตวัฒน์** โดยใช้แนวคิด **Knowledge Fabric** ที่ผสมผสานระหว่าง:

- **Obsidian** - สำหรับจัดการความรู้แบบ Zettelkasten
- **Git & GitHub** - สำหรับ version control และ collaboration
- **Docusaurus** - สำหรับเผยแพร่เนื้อหาผ่านเว็บไซต์

:::info ทำไมต้องใช้ Academy-as-Code?

เมื่อการบรรยายผ่านสไลด์เพียงอย่างเดียวไม่เพียงพอ เนื่องจากรายละเอียดเยอะและต้องการให้ผู้เรียนสามารถ:
- **Clone** และ **Fork** เนื้อหาได้ทันที
- **แก้ไข** และ **ปรับแต่ง** ตามความต้องการ
- **เรียนรู้ผ่านการลงมือทำ** ไม่ใช่แค่ทฤษฎี
- **เข้าถึงได้ทุกที่ทุกเวลา** ผ่านเว็บไซต์

:::

## 📚 เนื้อหาที่เราสอน

### Data Platform

เทคโนโลยีหลักสำหรับการจัดการและวิเคราะห์ข้อมูล:

#### Microsoft SQL Server
- Database Administration และ Performance Tuning
- Query Optimization และ Index Management
- High Availability และ Disaster Recovery
- Security และ Compliance

#### Microsoft Fabric
- **End-to-end Analytics Platform** ที่รวมทุกอย่างไว้ในที่เดียว
- Data Engineering, Data Warehousing, และ Business Intelligence
- OneLake - Unified Data Lake สำหรับทั้งองค์กร
- Real-time Intelligence และ Data Science

:::tip Microsoft Fabric คืออะไร?

Microsoft Fabric เป็น **Analytics Platform** แบบใหม่ที่รวม:
- **Data Engineering** - สำหรับ ETL/ELT pipelines
- **Data Warehousing** - สำหรับ SQL analytics
- **Data Science** - สำหรับ Machine Learning
- **Business Intelligence** - Power BI integration
- **Real-time Analytics** - สำหรับ streaming data

ทั้งหมดอยู่ใน **Single Platform** ที่ใช้ **OneLake** เป็น storage layer ร่วมกัน

:::

#### Microsoft Power BI
- Data Modeling และ DAX Programming
- Report Design และ Visualization
- Power BI Service และ Governance
- Advanced Analytics และ AI Features

### Workflow Orchestration

เครื่องมือสำหรับการสร้าง Automated Workflows:

#### Microsoft Power Automate
- Cloud Flows และ Desktop Flows
- Integration กับ Microsoft 365 และ Azure
- Business Process Automation
- RPA (Robotic Process Automation)

#### n8n
- **Open-source Workflow Automation**
- Self-hosted และ Cloud options
- Extensive integrations (500+ apps)
- Visual workflow builder
- Advanced data transformation

:::note n8n vs Power Automate

| Feature | n8n | Power Automate |
|---------|-----|----------------|
| **License** | Open-source | Commercial |
| **Hosting** | Self-hosted หรือ Cloud | Cloud-only |
| **Cost** | Free (self-hosted) | Per-user pricing |
| **Integrations** | 500+ apps | Microsoft ecosystem focus |
| **Customization** | High (code-based) | Medium (low-code) |

:::

### Power Platform

Microsoft Power Platform ecosystem:

#### Microsoft Power Automate
- Automation workflows
- Business process optimization
- Integration capabilities

#### Microsoft Power BI
- Self-service BI
- Enterprise reporting
- Embedded analytics

## 🏗️ Knowledge Fabric System

### Academy-as-Code Architecture

```
┌─────────────────────────────────────────┐
│         Obsidian (Local)                │
│  - Zettelkasten Knowledge Management    │
│  - Wiki Links & Graph View              │
│  - Daily Notes & Templates              │
└──────────────┬──────────────────────────┘
               │
               │ Git Push
               ▼
┌─────────────────────────────────────────┐
│         GitHub (Remote)                 │
│  - Version Control                       │
│  - Collaboration                         │
│  - CI/CD Pipeline                       │
└──────────────┬──────────────────────────┘
               │
               │ GitHub Actions
               ▼
┌─────────────────────────────────────────┐
│      Docusaurus (Website)               │
│  - Static Site Generation                │
│  - Search & Navigation                   │
│  - Multi-language Support                │
└─────────────────────────────────────────┘
```

### ข้อดีของ Knowledge Fabric

✅ **Version Control** - เนื้อหาทุกอย่างถูก track ด้วย Git  
✅ **Collaboration** - หลายคนสามารถทำงานร่วมกันได้  
✅ **Accessibility** - เข้าถึงได้ทุกที่ทุกเวลา  
✅ **Maintainability** - แก้ไขและอัปเดตได้ง่าย  
✅ **Scalability** - เพิ่มเนื้อหาใหม่ได้ไม่จำกัด  

## 🚀 เริ่มต้นใช้งาน

### สำหรับผู้เรียน

1. **Browse Courses** - ดูรายการคอร์สที่มีให้เลือก
2. **Clone Repository** - Clone เนื้อหามาไว้ในเครื่อง
3. **Follow Along** - เรียนรู้ตามบทเรียนทีละขั้นตอน
4. **Practice** - ลงมือทำตาม exercises และ labs

### สำหรับผู้สอน

1. **Create Content** - สร้างเนื้อหาใน Obsidian
2. **Commit & Push** - Push ไปยัง GitHub
3. **Auto Deploy** - GitHub Actions จะ deploy อัตโนมัติ
4. **Share** - แชร์ลิงก์ให้ผู้เรียน

## 📖 ทรัพยากรเพิ่มเติม

- **[Microsoft Fabric Documentation](https://learn.microsoft.com/fabric/)** - เอกสารอย่างเป็นทางการจาก Microsoft
- **[Power BI Documentation](https://learn.microsoft.com/power-bi/)** - คู่มือ Power BI
- **[n8n Documentation](https://docs.n8n.io/)** - คู่มือ n8n
- **[Obsidian Documentation](https://help.obsidian.md/)** - คู่มือ Obsidian

## 🤝 การมีส่วนร่วม

เรายินดีรับการมีส่วนร่วมจากทุกคน! หากคุณต้องการ:

- **รายงานปัญหา** - สร้าง Issue ใน GitHub
- **เสนอแนะเนื้อหา** - สร้าง Discussion
- **ส่ง Pull Request** - แก้ไขหรือเพิ่มเนื้อหา

:::tip ต้องการเรียนรู้เพิ่มเติม?

เยี่ยมชม [Tech Blog](/blog) เพื่ออ่านบทความล่าสุดเกี่ยวกับ Data Engineering, Microsoft Fabric, และเทคโนโลยีที่เกี่ยวข้อง

:::

---

## 🎓 พร้อมเริ่มต้นเรียนรู้แล้วหรือยัง?

เยี่ยมชม [Tech Blog](/blog) เพื่ออ่านบทความล่าสุดเกี่ยวกับ Data Engineering, Microsoft Fabric, และเทคโนโลยีที่เกี่ยวข้อง

หรือเริ่มต้นด้วยการ [Explore Courses](/)