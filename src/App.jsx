import { Container, Row, Col } from 'react-bootstrap'
import { lazy, Suspense } from 'react'
import SiteMenuBar from './components/SiteMenuBar'
import Hero from './sections/Hero'
import { FaShieldAlt, FaGraduationCap, FaRobot } from 'react-icons/fa'
import './App.css'
import Keybinds from './sections/Keybinds'

// Lazy load components that are below the fold
const FeaturesL = lazy(() => import('./sections/FeaturesL'))
const Demo = lazy(() => import('./sections/Demo'))
const Pricing = lazy(() => import('./sections/Pricing'))
const Questions = lazy(() => import('./sections/Questions'))
const CallToAction = lazy(() => import('./sections/CallToAction'))
const Footer = lazy(() => import('./sections/Footer'))

function TextSection() {
  const sectionStyle = {
    backgroundColor: 'var(--color-background)'
  }

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '20px',
    textAlign: 'center',
    color: 'var(--color-text-light)'
  }

  const columnStyle = {
    padding: '30px',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
    cursor: 'pointer'
  }

  const iconStyle = {
    fontSize: '48px',
    color: 'var(--color-accent)',
    marginBottom: '24px'
  }

  const headingStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '16px',
    color: 'var(--color-text-light)'
  }

  const textStyle = {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: 'var(--color-text)'
  }

  return (
    <section style={sectionStyle}>
      <Container>
        <h2 style={titleStyle}>How is it undetectable?</h2>
        <Row>
          <Col md={4} style={columnStyle}>
            <FaShieldAlt style={iconStyle} />
            <h4 style={headingStyle}>The browser space</h4>
            <p style={textStyle}>
              A "locked down" browser tab can only see tab switches, pastes, and Chrome extensions. It lives in its own bubble, which is how all browsers are designed.
            </p>
          </Col>
          <Col md={4} style={columnStyle}>
            <FaGraduationCap style={iconStyle} />
            <h4 style={headingStyle}>Why the desktop app</h4>
            <p style={textStyle}>
              Proctoring platforms cannot see which apps you have open or global keystrokes. The browser simply does not have access to Quiz Buddy because it is separate.
            </p>
          </Col>
          <Col md={4} style={columnStyle}>
            <FaRobot style={iconStyle} />
            <h4 style={headingStyle}>The Quiz Buddy difference</h4>
            <p style={textStyle}>
              Quiz Buddy is a convenient desktop app, so it works across all quiz platforms and is undetectable. The transparent overlay is also a solution to eye tracking.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

function SocialProof() {
  const sectionStyle = {
    padding: '60px 0',
    backgroundColor: 'var(--color-background)'
  }

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '40px',
    textAlign: 'left',
    color: 'var(--color-text-light)'
  }

  const subtitleStyle = {
    fontSize: '1.5rem',
    color: 'var(--color-text)',
    marginTop: '40px',
    textAlign: 'left',
    maxWidth: '600px'
  }

  const logoContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '40px',
    flexWrap: 'wrap'
  }

  const logoStyle = {
    height: '120px',
    opacity: '0.8',
    transition: 'opacity 0.2s ease-in-out',
    maxWidth: '100%',
    objectFit: 'contain'
  }

  const universities = [
    { name: 'Alabama', logo: '/src/assets/alabamalogo.png' },
    { name: 'Columbia', logo: '/src/assets/columbialogo.png' },
    { name: 'Cornell', logo: '/src/assets/cornelllogo.png' },
    { name: 'UC Berkeley', logo: '/src/assets/berkeleylogo.svg' },
    { name: 'Michigan', logo: '/src/assets/michlogo.png' },
    { name: 'UW Seattle', logo: '/src/assets/washingtonlogo.png' }
  ]

  return (
    <section style={sectionStyle}>
      <Container>
        <h2 style={titleStyle}>Trusted by 5,000+ students at...</h2>
        <Row className="justify-content-center align-items-center g-4">
          {universities.map((uni, index) => (
            <Col key={index} xs={6} sm={4} md={3} lg={2} className="text-center">
              <img
                src={uni.logo}
                alt={`${uni.name} logo`}
                style={logoStyle}
                onMouseOver={(e) => e.target.style.opacity = '1'}
                onMouseOut={(e) => e.target.style.opacity = '0.8'}
              />
            </Col>
          ))}
        </Row>
        <p style={subtitleStyle}>
          ... and more!
        </p>
      </Container>
    </section>
  )
}

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ 
    height: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center' 
  }}>
    Loading...
  </div>
)

function App() {
  return (
    <>
      <SiteMenuBar />

      <div style={{ paddingTop: '56px' }}>
        <Hero />
        <SocialProof />

        <Suspense fallback={<LoadingFallback />}>
          <FeaturesL />
          <Demo />
          <TextSection />
          <Keybinds />
          <Questions />
          <CallToAction />
          <Footer />
        </Suspense>
      </div>
    </>
  )
}

export default App
