import { Container } from 'react-bootstrap'
import SiteMenuBar from './components/SiteMenuBar'
import Hero from './sections/Hero'
import Features from './sections/Features'
import './App.css'

function App() {
  return (
    <>
      <SiteMenuBar />

      {/* Add some padding to account for fixed navbar */}
      <div style={{ paddingTop: '56px' }}>
        <Hero />

        <Features />

        <Container>

          <section id="demo" className="py-5">
            <h2>See It In Action</h2>
            <p>Watch how our solution can help you</p>
          </section>

          <section id="pricing" className="py-5">
            <h2>Pricing Plans</h2>
            <p>Choose the plan that works for you</p>
          </section>

          <section id="faq" className="py-5">
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to common questions</p>
          </section>

          <section id="contact" className="py-5">
            <h2>Get in Touch</h2>
            <p>Have questions? We're here to help</p>
          </section>
        </Container>
      </div>
    </>
  )
}

export default App
