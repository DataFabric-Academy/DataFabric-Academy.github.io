import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

// Import SVG Icons
import IconAcademyCode from '@site/static/img/icon-academy-code.svg';
import IconFabricCloud from '@site/static/img/icon-fabric-cloud.svg';
import IconRealworldSkills from '@site/static/img/icon-realworld-skills.svg';

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
        เนื้อหาทุกอย่างเป็น <strong>version-controlled</strong> ด้วย Git และ GitHub. 
        คุณสามารถ <strong>clone</strong>, <strong>fork</strong> และ <strong>แก้ไข</strong> ได้ทันที 
        เพื่อทบทวนและเสริมความรู้ตามความต้องการ
      </>
    ),
    link: '/intro',
  },
  {
    title: 'Knowledge Hub',
    Svg: IconFabricCloud,
    description: (
      <>
        ศูนย์รวมความรู้เกี่ยวกับ <strong>Microsoft Fabric</strong>, 
        <strong> Power BI</strong>, <strong>Azure Data Services</strong> และ <strong>Data Engineering</strong>. 
        เข้าถึงได้ทุกที่ทุกเวลาเพื่อทบทวนและค้นหาข้อมูล
      </>
    ),
    link: '/intro',
  },
  {
    title: 'Tech Blog',
    Svg: IconRealworldSkills,
    description: (
      <>
        ติดตามบทความล่าสุดเกี่ยวกับ <strong>Best Practices</strong>, 
        <strong> Case Studies</strong> และ <strong>Tips & Tricks</strong> 
        จากประสบการณ์จริงในอุตสาหกรรม
      </>
    ),
    link: '/blog',
  },
];

function Feature({title, Svg, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className={styles.featureContent}>
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
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2" className={styles.featuresTitle}>
            ทำไมต้องเลือก DataFabric Academy?
          </Heading>
          <p className={styles.featuresSubtitle}>
            ศูนย์รวมความรู้ที่พร้อมให้คุณเข้าถึงได้ทุกที่ทุกเวลา
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