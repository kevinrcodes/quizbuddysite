/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Row, Col } from 'react-bootstrap'
import styles from './Features.module.css'
import { useVideoIntersection } from '../hooks/useVideoIntersection'

function Features() {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/q_auto,f_auto/v1/q7b7wpdytdr4hinpss0o`
  const videoRef = useVideoIntersection();

  return (
    <section id="how-it-works" className={styles.features}>
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className={styles.leftColumn}>
            <h2 className={styles.title}>Multiple choice exams have never been easier</h2>
            <div className={styles.videoContainer}>
              <video
                ref={videoRef}
                src={videoUrl}
                loop
                muted
                playsInline
                preload="metadata"
                loading="lazy"
                className={styles.demoVideo}
              />
            </div>
          </Col>
          <Col lg={6} className={styles.content}>
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
