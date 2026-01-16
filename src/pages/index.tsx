import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

// ===== TypeScript Interfaces =====

interface Resource {
  id: string;
  title: string;
  description: string;
  link: string;
  category: 'Documentation' | 'Blog' | 'Reference';
  icon: string;
}

// ===== Resource Data =====

const RESOURCES: Resource[] = [
  {
    id: 'knowledge-base',
    title: 'Knowledge Base',
    description: 'ศูนย์รวมความรู้และเอกสารอ้างอิงสำหรับทบทวนเนื้อหาระหว่างและหลังการฝึกอบรม',
    link: '/intro',
    category: 'Documentation',
    icon: '📚',
  },
  {
    id: 'tech-blog',
    title: 'Tech Blog',
    description: 'บทความล่าสุดเกี่ยวกับ Data Engineering, Microsoft Fabric, และเทคโนโลยีที่เกี่ยวข้อง',
    link: '/blog',
    category: 'Blog',
    icon: '📝',
  },
  {
    id: 'resources',
    title: 'External Resources',
    description: 'ลิงก์ไปยังเอกสารอย่างเป็นทางการและทรัพยากรเพิ่มเติมจาก Microsoft และชุมชน',
    link: '/intro#-ทรัพยากรเพิ่มเติม',
    category: 'Reference',
    icon: '🔗',
  },
];

// ===== Hero Section =====

function HomepageHeader(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  const scrollToResources = (): void => {
    const resourcesSection = document.getElementById('resources');
    resourcesSection?.scrollIntoView({behavior: 'smooth', block: 'start'});
  };

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
            ศูนย์รวมความรู้และทรัพยากรเสริมสำหรับผู้เข้าร่วมการฝึกอบรม 
            และผู้ที่สนใจพัฒนาทักษะด้าน Data Engineering, Business Analytics และ Cloud Technologies
          </p>
          <div className={styles.heroButtons}>
            <Link
              className="button button--primary button--lg"
              onClick={scrollToResources}
              to="#resources">
              Explore Resources
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/intro">
              About the System
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

// ===== Resource Card Component =====

interface ResourceCardProps {
  resource: Resource;
}

function ResourceCard({resource}: ResourceCardProps): ReactNode {
  const cardClasses = clsx(styles.resourceCard);

  return (
    <div className={clsx('col col--4', styles.resourceCardWrapper)}>
      <div className={cardClasses}>
        <div className={styles.resourceCardHeader}>
          <div className={styles.resourceIcon}>{resource.icon}</div>
          {resource.category && (
            <span className={clsx(styles.resourceCategory, styles[`resourceCategory${resource.category}`])}>
              {resource.category}
            </span>
          )}
        </div>
        <div className={styles.resourceCardBody}>
          <Heading as="h3" className={styles.resourceTitle}>
            {resource.title}
          </Heading>
          <p className={styles.resourceDescription}>
            {resource.description}
          </p>
        </div>
        <div className={styles.resourceCardFooter}>
          <Link
            className={clsx('button button--primary', styles.resourceButton)}
            to={resource.link}>
            Explore →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ===== Resources Section =====

function ResourcesSection(): ReactNode {
  return (
    <section id="resources" className={styles.resourcesSection}>
      <div className="container">
        <div className={styles.resourcesHeader}>
          <Heading as="h2" className={styles.resourcesTitle}>
            Knowledge Resources
          </Heading>
          <p className={styles.resourcesSubtitle}>
            ทรัพยากรความรู้ที่พร้อมให้คุณเข้าถึงได้ทุกที่ทุกเวลา
          </p>
        </div>
        <div className="row">
          {RESOURCES.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== Main Home Component =====

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Knowledge Hub for Data Professionals`}
      description="ศูนย์รวมความรู้และทรัพยากรเสริมสำหรับผู้เข้าร่วมการฝึกอบรมและผู้ที่สนใจพัฒนาทักษะด้าน Data Engineering, Business Analytics และ Cloud Technologies">
      <HomepageHeader />
      <main>
        <ResourcesSection />
      </main>
    </Layout>
  );
}