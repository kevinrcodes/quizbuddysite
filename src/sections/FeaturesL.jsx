import { Container, Row, Col } from 'react-bootstrap'
import styles from './Features.module.css'

function Features() {
  return (
    <section id="how-it-works" className={styles.features}>
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className={styles.imageContainer}>
            <div className={styles.placeholderImage}>
              {/* show the app appearing, taking screenshot, solving a question, clickin the right answer */}
              <div className={styles.imageText}>App Screenshot</div>
            </div>
          </Col>
          <Col lg={6} className={styles.content}>
            <h2 className={styles.title}>Multiple choice exams have never been easier</h2>
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepContent}>
                  <h3><span className={styles.checkmark}>✓</span>No more clunky Chrome extensions</h3>
                  <p>Quiz Buddy is a native desktop app that's intuitive and fast, and works for quizzes on all platforms.</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepContent}>
                  <h3><span className={styles.checkmark}>✓</span> Invisible to --spyware-- proctoring software</h3>
                  <p>Quiz Buddy is designed to be undetectable by softwares like Honorlock.</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepContent}>
                  <h3><span className={styles.checkmark}>✓</span> Powered by the latest AI models</h3>
                  <p>GPT-4o, Gemini, Claude provide the most accurate and up-to-date answers.</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Features
