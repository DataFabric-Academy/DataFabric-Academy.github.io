import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

// ===== TypeScript Interfaces =====

interface Course {
  id: string;
  title: string;
  description: string;
  link: string;
  tag: 'Recommended' | 'Architecture' | 'Coming Soon';
  icon: string;
}

// ===== Course Data =====

const COURSES: Course[] = [
  {
    id: 'azure-fabric',
    title: 'Azure Fabric: Zero to Hero',
    description: 'End-to-end analytics with Microsoft Fabric. Master data engineering, warehousing, and business intelligence in one unified platform.',
    link: '/course-azure-fabric',
    tag: 'Recommended',
    icon: '☁️',
  },
  {
    id: 'knowledge-fabric',
    title: 'Knowledge Fabric System',
    description: 'Building an Academy-as-Code with Obsidian & GitHub. Learn how to structure and deliver technical education as version-controlled content.',
    link: '/intro',
    tag: 'Architecture',
    icon: '📚',
  },
  {
    id: 'power-bi-advanced',
    title: 'Power BI Advanced Data Modeling',
    description: 'Mastering DAX and relationships. Deep dive into advanced data modeling techniques, performance optimization, and complex calculations.',
    link: '#',
    tag: 'Coming Soon',
    icon: '📊',
  },
];

// ===== Hero Section =====

function HomepageHeader(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  const scrollToCourses = (): void => {
    const coursesSection = document.getElementById('courses');
    coursesSection?.scrollIntoView({behavior: 'smooth', block: 'start'});
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
            พัฒนาทักษะ Data Engineering และ Business Analytics ผ่านการเรียนรู้แบบ Academy-as-Code 
            ด้วย Microsoft Fabric, Power BI และเทคโนโลยี Cloud ที่ทันสมัย
          </p>
          <div className={styles.heroButtons}>
            <Link
              className="button button--primary button--lg"
              onClick={scrollToCourses}
              to="#courses">
              Explore Courses
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

// ===== Course Card Component =====

interface CourseCardProps {
  course: Course;
}

function CourseCard({course}: CourseCardProps): ReactNode {
  const isComingSoon = course.tag === 'Coming Soon';
  const cardClasses = clsx(styles.courseCard, {
    [styles.courseCardComingSoon]: isComingSoon,
  });

  return (
    <div className={clsx('col col--4', styles.courseCardWrapper)}>
      <div className={cardClasses}>
        <div className={styles.courseCardHeader}>
          <div className={styles.courseIcon}>{course.icon}</div>
          {course.tag && (
            <span className={clsx(styles.courseTag, styles[`courseTag${course.tag.replace(' ', '')}`])}>
              {course.tag}
            </span>
          )}
        </div>
        <div className={styles.courseCardBody}>
          <Heading as="h3" className={styles.courseTitle}>
            {course.title}
          </Heading>
          <p className={styles.courseDescription}>
            {course.description}
          </p>
        </div>
        <div className={styles.courseCardFooter}>
          {isComingSoon ? (
            <span className={clsx('button button--disabled', styles.courseButton)}>
              Coming Soon
            </span>
          ) : (
            <Link
              className={clsx('button button--primary', styles.courseButton)}
              to={course.link}>
              Start Learning →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// ===== Course Catalog Section =====

function CourseCatalog(): ReactNode {
  return (
    <section id="courses" className={styles.coursesSection}>
      <div className="container">
        <div className={styles.coursesHeader}>
          <Heading as="h2" className={styles.coursesTitle}>
            Explore Our Courses
          </Heading>
          <p className={styles.coursesSubtitle}>
            Comprehensive learning paths designed for data professionals at every level
          </p>
        </div>
        <div className="row">
          {COURSES.map((course) => (
            <CourseCard key={course.id} course={course} />
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
      title={`${siteConfig.title} - Academy-as-Code for Data Professionals`}
      description="Learn Data Engineering and Business Analytics through Academy-as-Code with Microsoft Fabric, Power BI, and modern Cloud technologies">
      <HomepageHeader />
      <main>
        <CourseCatalog />
      </main>
    </Layout>
  );
}