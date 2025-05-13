import { Container } from 'react-bootstrap'
import styles from './CallToAction.module.css'
import { FaApple, FaWindows } from 'react-icons/fa'

// Download URLs - replace these with your actual download URLs
const DOWNLOAD_URLS = {
  mac: 'https://your-domain.com/downloads/quiz-buddy-mac.dmg',
  windows: 'https://your-domain.com/downloads/quiz-buddy-windows.exe'
};

function CallToAction() {
  return (
    <section id="download" className={styles.cta}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>Ace that quiz in two clicks, not two weeks</h2>
        </div>

        <div className={styles.platforms}>
          <div className={styles.platformCard}>
            <div className={styles.platformIcon} data-os="Mac">
              <FaApple />
            </div>
            <p className={styles.platformDescription}>
              Minimum Requirements: macOS 10.15 (Catalina) or later for Intel, macOS 11 (Big Sur) or later for Apple Silicon
            </p>
            <button 
              className={styles.downloadButton}
              onClick={() => window.open(DOWNLOAD_URLS.mac, '_blank')}
            >
              Download for Mac
            </button>
          </div>

          <div className={styles.platformCard}>
            <div className={styles.platformIcon} data-os="Windows">
              <FaWindows />
            </div>
            <p className={styles.platformDescription}>
              Minimum Requirements: Windows 10 (64-bit)
            </p>
            <button 
              className={styles.downloadButton}
              onClick={() => window.open(DOWNLOAD_URLS.windows, '_blank')}
            >
              Download for Windows
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default CallToAction
