import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Study Knots
        </Heading>
        <p className="hero__subtitle">
          Untangle the differences. Learn Bitcoin Knots.
        </p>
        <p className={styles.heroDescription}>
          The comprehensive guide to understanding Bitcoin Knots — an enhanced Bitcoin Core
          derivative with additional features, policy options, and improvements.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/getting-started/introduction">
            Start Learning
          </Link>
          <Link
            className="button button--secondary button--lg button--outline"
            href="https://bitcoinknots.org">
            Download Knots
          </Link>
        </div>
      </div>
    </header>
  );
}

function ControversyBanner() {
  return (
    <section className={styles.controversyBanner}>
      <div className="container">
        <div className={styles.controversyContent}>
          <div className={styles.controversyText}>
            <Heading as="h2">The OP_RETURN Controversy</Heading>
            <p>
              Bitcoin Core v30 removed OP_RETURN limits. Nick Szabo broke 5 years of silence to warn about it.
              Learn why 21% of nodes switched to Knots.
            </p>
          </div>
          <div className={styles.controversyButtons}>
            <Link
              className="button button--primary button--lg"
              to="/guides/op-return-controversy">
              Read the Full Story
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/architecture/code-analysis">
              Debunking the FUD
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className={styles.statsSection}>
      <div className="container">
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">21%</span>
            <span className="stat-label">Of All Nodes</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">14+</span>
            <span className="stat-label">Years Active</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">v29.2</span>
            <span className="stat-label">Current Release</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Consensus Compatible</span>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FeatureProps {
  title: string;
  description: string;
  link: string;
}

function Feature({title, description, link}: FeatureProps) {
  return (
    <div className={clsx('col col--4', styles.featureCol)}>
      <div className="feature-card">
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        <p className={styles.featureDescription}>{description}</p>
        <Link to={link} className={styles.featureLink}>Learn more →</Link>
      </div>
    </div>
  );
}

function HomepageFeatures() {
  const features: FeatureProps[] = [
    {
      title: 'Policy Control',
      description: 'Fine-grained mempool policies. Filter transactions, set dust thresholds, and control what your node relays.',
      link: '/patches/policy/mempool-policies',
    },
    {
      title: 'Wallet Features',
      description: 'Legacy wallet support, private key sweeping, Codex32 seeds, and enhanced signing capabilities.',
      link: '/patches/wallet/legacy-wallet',
    },
    {
      title: 'Extended RPC',
      description: 'Additional commands for fee estimation, block inspection, and wallet management.',
      link: '/patches/rpc/new-commands',
    },
    {
      title: 'GUI Improvements',
      description: 'Dark mode, network monitoring, mempool statistics, and a polished Qt interface.',
      link: '/patches/gui/dark-mode',
    },
    {
      title: 'Privacy Options',
      description: 'Built-in Tor subprocess, enhanced network privacy, and configurable peer settings.',
      link: '/patches/networking/tor-integration',
    },
    {
      title: 'Mining Tools',
      description: 'Transaction priority, restored block size options, and getblocktemplate enhancements.',
      link: '/guides/mining',
    },
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <Heading as="h2">What Makes Knots Different</Heading>
          <p className={styles.sectionSubtitle}>
            Same consensus rules as Bitcoin Core. More features for power users.
          </p>
        </div>
        <div className="row">
          {features.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className={styles.comparisonSection}>
      <div className="container">
        <div className="text--center margin-bottom--lg">
          <Heading as="h2">Core vs Knots</Heading>
          <p className={styles.sectionSubtitle}>
            Knots tracks Bitcoin Core releases while adding enhancements
          </p>
        </div>
        <div className={styles.comparisonTable}>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Bitcoin Core</th>
                <th>Bitcoin Knots</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Consensus Rules</td>
                <td>Standard</td>
                <td>Identical</td>
              </tr>
              <tr>
                <td>Legacy Wallet</td>
                <td>Deprecated</td>
                <td>Maintained</td>
              </tr>
              <tr>
                <td>OP_RETURN Policy</td>
                <td>Fixed</td>
                <td>Configurable</td>
              </tr>
              <tr>
                <td>Mempool Filtering</td>
                <td>Limited</td>
                <td>Extensive</td>
              </tr>
              <tr>
                <td>Dark Mode</td>
                <td>No</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Embedded Tor</td>
                <td>No</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>UPnP</td>
                <td>Removed</td>
                <td>Restored</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text--center margin-top--lg">
          <Link to="/getting-started/differences-from-core" className={styles.compareLink}>
            See full comparison →
          </Link>
        </div>
      </div>
    </section>
  );
}

function QuickStartSection() {
  return (
    <section className={styles.quickStartSection}>
      <div className="container">
        <div className="row">
          <div className="col col--6">
            <Heading as="h2">Quick Start</Heading>
            <p>Get a Bitcoin Knots node running in minutes.</p>
            <div className={styles.codeBlock}>
              <pre>
                <code>
{`# Download from bitcoinknots.org
# Extract and run:

./bitcoind -daemon

# Check status:
./bitcoin-cli getblockchaininfo`}
                </code>
              </pre>
            </div>
            <Link to="/getting-started/quick-start" className="button button--primary">
              Full Quick Start Guide
            </Link>
          </div>
          <div className="col col--6">
            <Heading as="h2">Popular Topics</Heading>
            <div className={styles.topicList}>
              <Link to="/patches/policy/mempool-policies" className={styles.topicLink}>
                <span className={styles.topicIcon}>→</span>
                Configure mempool policies
              </Link>
              <Link to="/patches/policy/transaction-filtering" className={styles.topicLink}>
                <span className={styles.topicIcon}>→</span>
                Filter inscription transactions
              </Link>
              <Link to="/patches/networking/tor-integration" className={styles.topicLink}>
                <span className={styles.topicIcon}>→</span>
                Enable built-in Tor
              </Link>
              <Link to="/guides/configuration" className={styles.topicLink}>
                <span className={styles.topicIcon}>→</span>
                Configuration reference
              </Link>
              <Link to="/patches/wallet/legacy-wallet" className={styles.topicLink}>
                <span className={styles.topicIcon}>→</span>
                Use legacy wallets
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className="container text--center">
        <Heading as="h2">Ready to Learn More?</Heading>
        <p>Explore the documentation or download Bitcoin Knots to get started.</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/getting-started/introduction">
            Read the Docs
          </Link>
          <Link
            className="button button--secondary button--lg"
            href="https://bitcoinknots.org">
            bitcoinknots.org
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Learn Bitcoin Knots"
      description="Study Knots - The comprehensive guide to understanding Bitcoin Knots, an enhanced Bitcoin Core derivative.">
      <HomepageHeader />
      <main>
        <ControversyBanner />
        <StatsSection />
        <HomepageFeatures />
        <ComparisonSection />
        <QuickStartSection />
        <CTASection />
      </main>
    </Layout>
  );
}
