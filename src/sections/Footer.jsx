import { Container } from 'react-bootstrap'
import styles from './Footer.module.css'
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'

function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3>Quiz Buddy</h3>
            <p>The AI Quiz Solver</p>
            <p>An invisible desktop app to ace any multiple choice quiz</p>
          </div>

          <div className={styles.links}>

            <div className={styles.linkGroup}>
              <h4>Pages</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Help</a></li>
                <li><a href="/help">Contact</a></li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4>Legal</h4>
              <ul>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
                <li><a href="/refund">Refund Policy</a></li>
              </ul>
            </div>
          </div>

        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Quiz Buddy. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
