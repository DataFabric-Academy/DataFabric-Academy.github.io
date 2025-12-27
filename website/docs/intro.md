---
sidebar_position: 1
---

# รู้จัก DataFabric Academy

ยินดีต้อนรับสู่ **DataFabric Academy** - **ศูนย์รวมความรู้และทรัพยากรเสริม** สำหรับผู้ที่เข้าร่วมการฝึกอบรมและผู้ที่สนใจพัฒนาทักษะด้าน Data Engineering, Business Analytics และ Cloud Technologies

## 🎯 เกี่ยวกับเรา

DataFabric Academy เป็น **Knowledge Hub** ที่ออกแบบมาเพื่อเป็นแหล่งอ้างอิงและเสริมความรู้ระหว่างและหลังการฝึกอบรม โดยใช้แนวคิด **Knowledge Fabric** ที่ผสมผสานระหว่าง:

- **Obsidian** - สำหรับจัดการความรู้แบบ Zettelkasten
- **Git & GitHub** - สำหรับ version control และ collaboration
  - Repository: [DataFabric-Academy/DataFabric-Academy.github.io](https://github.com/DataFabric-Academy/DataFabric-Academy.github.io)
  - Organization: [DataFabric-Academy](https://github.com/DataFabric-Academy)
- **Docusaurus** - สำหรับเผยแพร่เนื้อหาผ่านเว็บไซต์

:::info ทำไมต้องมี Knowledge Hub?

ระหว่างและหลังการฝึกอบรม ผู้เรียนมักต้องการ:
- **ทบทวนเนื้อหา** - กลับมาดูรายละเอียดที่อาจลืม
- **ค้นหาข้อมูลเพิ่มเติม** - หา resources และเอกสารอ้างอิง
- **ติดตามข่าวสาร** - อ่านบทความและอัปเดตล่าสุด
- **เข้าถึงได้ทุกที่ทุกเวลา** - ไม่ต้องพึ่งพาเอกสารที่อาจหาย

:::

## 📚 เนื้อหาที่เรารวบรวม

### Data Platform

ทรัพยากรความรู้เกี่ยวกับเทคโนโลยีหลักสำหรับการจัดการและวิเคราะห์ข้อมูล:

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

ทรัพยากรเกี่ยวกับเครื่องมือสำหรับการสร้าง Automated Workflows:

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

```mermaid
graph TD
    A[Obsidian<br/>Local Knowledge Management] -->|Git Push| B[GitHub<br/>Remote Repository]
    B -->|GitHub Actions<br/>CI/CD Pipeline| C[Docusaurus<br/>Website Deployment]
    
    A1[Zettelkasten<br/>Knowledge Management] -.-> A
    A2[Wiki Links<br/>& Graph View] -.-> A
    A3[Daily Notes<br/>& Templates] -.-> A
    
    B1[Version Control] -.-> B
    B2[Collaboration] -.-> B
    B3[CI/CD Pipeline] -.-> B
    B4[Repository:<br/>DataFabric-Academy/<br/>DataFabric-Academy.github.io] -.-> B
    
    C1[Static Site<br/>Generation] -.-> C
    C2[Search &<br/>Navigation] -.-> C
    C3[Multi-language<br/>Support] -.-> C
    
    style A fill:#0078d4,stroke:#005495,stroke-width:2px,color:#fff
    style B fill:#238636,stroke:#1a6e28,stroke-width:2px,color:#fff
    style C fill:#2e8555,stroke:#1e6b3f,stroke-width:2px,color:#fff
    style A1 fill:#e3f2fd,stroke:#0078d4,stroke-width:1px
    style A2 fill:#e3f2fd,stroke:#0078d4,stroke-width:1px
    style A3 fill:#e3f2fd,stroke:#0078d4,stroke-width:1px
    style B1 fill:#dafbe1,stroke:#238636,stroke-width:1px
    style B2 fill:#dafbe1,stroke:#238636,stroke-width:1px
    style B3 fill:#dafbe1,stroke:#238636,stroke-width:1px
    style B4 fill:#dafbe1,stroke:#238636,stroke-width:1px
    style C1 fill:#d1fae5,stroke:#2e8555,stroke-width:1px
    style C2 fill:#d1fae5,stroke:#2e8555,stroke-width:1px
    style C3 fill:#d1fae5,stroke:#2e8555,stroke-width:1px
```

### ข้อดีของ Knowledge Fabric

✅ **Version Control** - เนื้อหาทุกอย่างถูก track ด้วย Git  
✅ **Collaboration** - หลายคนสามารถทำงานร่วมกันได้  
✅ **Accessibility** - เข้าถึงได้ทุกที่ทุกเวลา  
✅ **Maintainability** - แก้ไขและอัปเดตได้ง่าย  
✅ **Scalability** - เพิ่มเนื้อหาใหม่ได้ไม่จำกัด  

## 📖 วิธีใช้งาน Knowledge Hub

### สำหรับผู้เข้าร่วมการฝึกอบรม

1. **ทบทวนเนื้อหา** - กลับมาอ่านรายละเอียดที่เรียนไปแล้ว
2. **ค้นหาข้อมูล** - ใช้ Search เพื่อหาข้อมูลที่ต้องการ
3. **อ่านบทความ** - ติดตาม [Tech Blog](/blog) สำหรับเนื้อหาใหม่
4. **Clone Repository** - Clone [repository](https://github.com/DataFabric-Academy/DataFabric-Academy.github.io) เพื่อเก็บไว้ในเครื่อง

### สำหรับผู้ที่สนใจ

1. **Browse Resources** - ดูทรัพยากรที่มีให้
2. **อ่านบทความ** - ติดตามบทความล่าสุดใน [Tech Blog](/blog)
3. **Clone Repository** - Clone [repository](https://github.com/DataFabric-Academy/DataFabric-Academy.github.io) มาไว้ในเครื่อง
4. **ติดตามอัปเดต** - [Watch repository](https://github.com/DataFabric-Academy/DataFabric-Academy.github.io) เพื่อรับการแจ้งเตือน

## 📰 Tech Blog

[Tech Blog](/blog) ของเรานำเสนอ:
- **บทความล่าสุด** - เรื่องราวใหม่ ๆ เกี่ยวกับ Data Engineering และ Cloud Technologies
- **Best Practices** - แนวทางปฏิบัติที่ดีจากประสบการณ์จริง
- **Case Studies** - ตัวอย่างการใช้งานจริง
- **Tips & Tricks** - เคล็ดลับและเทคนิคที่ช่วยให้ทำงานได้ดีขึ้น

:::tip ติดตามข่าวสารล่าสุด

เยี่ยมชม [Tech Blog](/blog) เพื่ออ่านบทความล่าสุดเกี่ยวกับ Data Engineering, Microsoft Fabric, และเทคโนโลยีที่เกี่ยวข้อง

:::

## 📚 ทรัพยากรเพิ่มเติม

### เอกสารอย่างเป็นทางการ

- **[Microsoft Fabric Documentation](https://learn.microsoft.com/fabric/)** - เอกสารอย่างเป็นทางการจาก Microsoft
- **[Power BI Documentation](https://learn.microsoft.com/power-bi/)** - คู่มือ Power BI
- **[n8n Documentation](https://docs.n8n.io/)** - คู่มือ n8n
- **[Obsidian Documentation](https://help.obsidian.md/)** - คู่มือ Obsidian

### GitHub Resources

- **[GitHub Repository](https://github.com/DataFabric-Academy/DataFabric-Academy.github.io)** - Source code และเนื้อหาทั้งหมด
- **[GitHub Organization](https://github.com/DataFabric-Academy)** - ดู repositories อื่น ๆ ใน organization
- **[GitHub Issues](https://github.com/DataFabric-Academy/DataFabric-Academy.github.io/issues)** - รายงานปัญหาและข้อเสนอแนะ
- **[GitHub Discussions](https://github.com/DataFabric-Academy/DataFabric-Academy.github.io/discussions)** - อภิปรายและถามคำถาม

## 🤝 การมีส่วนร่วม

เรายินดีรับการมีส่วนร่วมจากทุกคน! หากคุณต้องการ:

- **รายงานปัญหา** - สร้าง [Issue](https://github.com/DataFabric-Academy/DataFabric-Academy.github.io/issues) ใน GitHub
- **เสนอแนะเนื้อหา** - สร้าง [Discussion](https://github.com/DataFabric-Academy/DataFabric-Academy.github.io/discussions)
- **ส่ง Pull Request** - แก้ไขหรือเพิ่มเนื้อหาผ่าน [Pull Request](https://github.com/DataFabric-Academy/DataFabric-Academy.github.io/pulls)

### GitHub Repository

- **Main Portal**: [DataFabric-Academy/DataFabric-Academy.github.io](https://github.com/DataFabric-Academy/DataFabric-Academy.github.io)
- **GitHub Organization**: [DataFabric-Academy](https://github.com/DataFabric-Academy)

:::info Clone Repository

คุณสามารถ clone repository เพื่อเก็บเนื้อหาไว้ในเครื่อง:

```bash
git clone https://github.com/DataFabric-Academy/DataFabric-Academy.github.io.git
cd DataFabric-Academy.github.io/website
npm install
npm start
```

:::

---

## 🎓 เริ่มต้นใช้งาน

เยี่ยมชม [Tech Blog](/blog) เพื่ออ่านบทความล่าสุด หรือใช้ Search เพื่อค้นหาข้อมูลที่คุณต้องการ