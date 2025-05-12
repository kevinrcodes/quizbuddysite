import { Container, Row, Col } from 'react-bootstrap'
import styles from './Features.module.css'

function Features() {
  return (
    <section id="how-it-works" className={styles.features}>
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className={styles.imageContainer}>
            <div className={styles.placeholderImage}>
              {/* Replace with actual image */}
              <div className={styles.imageText}>App Screenshot</div>
            </div>
          </Col>
          <Col lg={6} className={styles.content}>
            <h2 className={styles.title}>How It Works</h2>
            <div className={styles.steps}>
              <div className={styles.step}>
                <span className={styles.stepNumber}>1</span>
                <div className={styles.stepContent}>
                  <h3>Take a Photo</h3>
                  <p>Snap a picture of your multiple choice question</p>
                </div>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNumber}>2</span>
                <div className={styles.stepContent}>
                  <h3>Get Instant Answer</h3>
                  <p>Our AI analyzes the question and provides the correct answer</p>
                </div>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNumber}>3</span>
                <div className={styles.stepContent}>
                  <h3>Learn & Improve</h3>
                  <p>Review detailed explanations to understand the concepts</p>
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
