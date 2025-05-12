import { Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import styles from './Hero.module.css'

function Hero() {
  const subjects = ['reading', 'algebra', 'English', 'biology', 'physics', 'politics']
  const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * subjects.length))
  const [lastTwoIndices, setLastTwoIndices] = useState([-1, -1]) // Track last two indices

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex
      do {
        nextIndex = Math.floor(Math.random() * subjects.length)
      } while (lastTwoIndices.includes(nextIndex)) // Avoid last two words
      
      setLastTwoIndices(prev => [currentIndex, prev[0]]) // Update last two indices
      setCurrentIndex(nextIndex)
    }, 2000)

    return () => clearInterval(interval)
  }, [currentIndex, lastTwoIndices])

  return (
    <section id="hero" className={`py-5 ${styles.hero}`}>
      <Container>
        <div className={styles.content}>
          {/* <h1 className={styles.title}>
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
          </h1> */}
          <h1>The AI Quiz Solver</h1>
          <p className={styles.subtitle}>Quiz Buddy is your best friend in a multiple choice exam. It's 2025, and you're still stressing over those dumb questions?</p>
          <div className={styles.cta}>
            <button className={styles.primaryButton}>Download now - It's Free!</button>
          </div>
        </div>

        {/* <div style={{ marginTop: '100px', textAlign: 'left' }}>
          {subjects.map((subject) => (
            <div key={subject} className={styles.word} style={{ position: 'relative', opacity: 1, transform: 'none' }}>
              {subject}
            </div>
          ))}
        </div> */}

      </Container>
    </section>
  )
}

export default Hero 