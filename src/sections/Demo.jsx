import { Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import styles from './Demo.module.css'
import { useVideoIntersection } from '../hooks/useVideoIntersection'

function Demo() {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const yourPov = `https://res.cloudinary.com/${cloudName}/video/upload/q_auto,f_auto/v1/r9cxhysycjetjvrocz0v`
  const proctorPov = `https://res.cloudinary.com/${cloudName}/video/upload/q_auto,f_auto/v1/elkfxsyqpbanlvnapazs`
  
  const yourPovRef = useVideoIntersection();
  const proctorPovRef = useVideoIntersection();

  // Rotating text animation
  const subjects = ['reading', 'algebra', 'English', 'biology', 'physics', 'politics']
  const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * subjects.length))
  const [lastTwoIndices, setLastTwoIndices] = useState([-1, -1])

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex
      do {
        nextIndex = Math.floor(Math.random() * subjects.length)
      } while (lastTwoIndices.includes(nextIndex))
      
      setLastTwoIndices(prev => [currentIndex, prev[0]])
      setCurrentIndex(nextIndex)
    }, 2000)

    return () => clearInterval(interval)
  }, [currentIndex, lastTwoIndices])

  return (
    <section id="demo" className={styles.demo}>
      <Container>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Ace your{' '}
            <span className={styles.rotatingText}>
              {subjects.map((subject, index) => (
                <span
                  key={subject}
                  className={`${styles.word} ${
                    index === currentIndex ? styles.active : ''
                  }`}
                >
                  {subject}
                </span>
              ))}
            </span>{' '}
            multiple choice
          </h2>
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
