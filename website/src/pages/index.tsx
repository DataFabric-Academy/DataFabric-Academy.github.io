import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

// Import SVG Icons
import IconAcademyCode from '@site/static/img/icon-academy-code.svg';
import IconFabricCloud from '@site/static/img/icon-fabric-cloud.svg';
import IconRealworldSkills from '@site/static/img/icon-realworld-skills.svg';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>
          <p className={styles.heroSubtitle}>
            {siteConfig.tagline}
          </p>
          <p className={styles.heroDescription}>
            พัฒนาทักษะ Data Engineering และ Business Analytics ผ่านการเรียนรู้แบบ Academy-as-Code 
            ด้วย Microsoft Fabric, Power BI และเทคโนโลยี Cloud ที่ทันสมัย
          </p>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/intro">
              เริ่มต้นเรียนรู้ →
            </Link>
            <Link
              className="button button--secondary button--lg"
              href="https://github.com/DataFabric-Academy">
              GitHub Organization
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.heroBackground}>
        <div className={styles.heroGradient}></div>
      </div>
    </header>
  );
}

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  link?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Academy-as-Code',
    Svg: IconAcademyCode,
    description: (
      <>
        เรียนรู้ผ่านการลงมือทำจริงด้วย <strong>Git</strong> และ <strong>Obsidian</strong>. 
        ทุกบทเรียนเป็นโค้ดที่คุณสามารถ clone, fork และแก้ไขได้ทันที 
        พัฒนาทักษะผ่านการปฏิบัติจริง ไม่ใช่แค่ทฤษฎี
      </>
    ),
    link: '/intro',
  },
  {
    title: 'Master Microsoft Fabric',
    Svg: IconFabricCloud,
    description: (
      <>
        เจาะลึกเทคโนโลยีหลักที่เราสอน: <strong>Microsoft Fabric</strong>, 
        <strong> Power BI</strong>, <strong>Azure Data Services</strong> และ <strong>Data Engineering</strong>. 
        เรียนรู้จากผู้เชี่ยวชาญที่ใช้งานจริงในองค์กร
      </>
    ),
    link: '/intro',
  },
  {
    title: 'Real-world Skills',
    Svg: IconRealworldSkills,
    description: (
      <>
        เน้นทักษะที่นำไปใช้ทำงานได้จริง ไม่ใช่แค่ทฤษฎี. 
        เรียนรู้จาก <strong>Case Studies</strong>, <strong>Best Practices</strong> 
        และ <strong>Real-world Projects</strong> ที่ใช้ในอุตสาหกรรมจริง
      </>
    ),
    link: '/intro',
  },
];

function Feature({title, Svg, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureCard)}>
      <div className={styles.featureCardInner}>
        <div className={styles.featureIcon}>
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
        <p className={styles.featureDescription}>{description}</p>
        {link && (
          <Link className={styles.featureLink} to={link}>
            เรียนรู้เพิ่มเติม →
          </Link>
        )}
      </div>
    </div>
  );
}

function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2" className={styles.featuresTitle}>
            ทำไมต้องเลือก DataFabric Academy?
          </Heading>
          <p className={styles.featuresSubtitle}>
            เรามีแนวทางที่แตกต่างในการพัฒนาทักษะ Data Professional
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Academy-as-Code for Data Professionals`}
      description="เรียนรู้ Data Engineering และ Business Analytics ผ่าน Academy-as-Code ด้วย Microsoft Fabric, Power BI และเทคโนโลยี Cloud">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}