import { Container } from 'react-bootstrap'
import styles from './Demo.module.css'

function Demo() {
  return (
    <section id="demo" className={styles.demo}>
      <Container>
        <div className={styles.content}>
          <h2 className={styles.title}>AI Answers that don't suck</h2>
          <p className={styles.subtitle}>
            We'll automatically parse the question from your screen and provide you with the answer and explanation.
          </p>
          

          {/* do two videos side by side. what you see, what the proctor sees */}
          <div className={styles.videoContainer}>
            <video 
              className={styles.video}
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source 
                src="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4" 
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.checkmark}>✓</span>
              <span>Effective for any subject</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.checkmark}>✓</span>
              <span>99.7% answer accuracy</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.checkmark}>✓</span>
              <span>Solution for eye tracking</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Demo
