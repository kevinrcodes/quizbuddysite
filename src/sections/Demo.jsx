import { Container } from 'react-bootstrap'
import styles from './Demo.module.css'
import { useVideoIntersection } from '../hooks/useVideoIntersection'

function Demo() {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const yourPov = `https://res.cloudinary.com/${cloudName}/video/upload/q_auto,f_auto/v1/r9cxhysycjetjvrocz0v`
  const proctorPov = `https://res.cloudinary.com/${cloudName}/video/upload/q_auto,f_auto/v1/elkfxsyqpbanlvnapazs`
  
  const yourPovRef = useVideoIntersection();
  const proctorPovRef = useVideoIntersection();

  return (
    <section id="demo" className={styles.demo}>
      <Container>
        <div className={styles.content}>
          <h2 className={styles.title}>AI Answers that don't suck</h2>
          <p className={styles.subtitle}>
            We'll automatically parse the question from your screen and provide you with the answer and explanation.
          </p>
          
          <div className={styles.videosWrapper}>
            <div className={styles.videoContainer}>
              <h3 className={styles.videoTitle}>What you see</h3>
              <video 
                ref={yourPovRef}
                src={yourPov}
                loop 
                muted 
                playsInline
                preload="metadata"
                loading="lazy"
                className={styles.video}
              />
            </div>

            <div className={styles.videoContainer}>
              <h3 className={styles.videoTitle}>What the proctor sees</h3>
              <video 
                ref={proctorPovRef}
                src={proctorPov}
                loop 
                muted 
                playsInline
                preload="metadata"
                loading="lazy"
                className={styles.video}
              />
            </div>
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
