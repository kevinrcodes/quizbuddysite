import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import styles from './Pricing.module.css'

function Pricing() {
  const navigate = useNavigate();

  const handleSubscribe = (plan) => {
    navigate('/payments', { state: { plan } });
  };

  return (
    <section id="pricing" className={styles.pricing}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>Simple, Transparent Pricing</h2>
          <p className={styles.subtitle}>Choose the plan that works for you</p>
        </div>

        <Row className={styles.plans}>
          <Col md={4} className={styles.planColumn}>
            <div className={styles.plan}>
              <div className={styles.planHeader}>
                <h3>Free</h3>
                <div className={styles.price}>
                  <span className={styles.amount}>$0</span>
                  <span className={styles.period}>/month</span>
                </div>
              </div>
              <ul className={styles.features}>
                <li>5 questions per day</li>
                <li>Basic explanations</li>
                <li>Community support</li>
                <li>Basic subjects only</li>
              </ul>
              <button className={styles.button}>Download</button>
            </div>
          </Col>

          <Col md={4} className={styles.planColumn}>
            <div className={`${styles.plan} ${styles.popular}`}>
              <div className={styles.popularBadge}>Most Popular</div>
              <div className={styles.planHeader}>
                <h3>Getting Started</h3>
                <div className={styles.price}>
                  <span className={styles.amount}>$9.99</span>
                  <span className={styles.period}>/month</span>
                </div>
              </div>
              <ul className={styles.features}>
                <li>50 questions per day</li>
                <li>Detailed explanations</li>
                <li>Priority support</li>
                <li>All subjects</li>
                <li>Study analytics</li>
              </ul>
              <button 
                className={`${styles.button} ${styles.popularButton}`}
                onClick={() => handleSubscribe('getting-started')}
              >
                Subscribe
              </button>
            </div>
          </Col>

          <Col md={4} className={styles.planColumn}>
            <div className={styles.plan}>
              <div className={styles.planHeader}>
                <h3>Getting Serious</h3>
                <div className={styles.price}>
                  <span className={styles.amount}>$19.99</span>
                  <span className={styles.period}>/month</span>
                </div>
              </div>
              <ul className={styles.features}>
                <li>Unlimited questions</li>
                <li>Premium explanations</li>
                <li>24/7 support</li>
                <li>All subjects</li>
                <li>Advanced analytics</li>
                <li>Custom study plans</li>
              </ul>
              <button 
                className={styles.button}
                onClick={() => handleSubscribe('getting-serious')}
              >
                Subscribe
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Pricing
