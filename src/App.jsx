import { Container } from 'react-bootstrap'
import SiteMenuBar from './components/SiteMenuBar'
import Hero from './sections/Hero'
import FeaturesL from './sections/FeaturesL'
import Demo from './sections/Demo'
import Pricing from './sections/Pricing'
import Questions from './sections/Questions'
import CallToAction from './sections/CallToAction'
import Footer from './sections/Footer'
import './App.css'

function App() {
  return (
    <>
      <SiteMenuBar />

      {/* Add some padding to account for fixed navbar */}
      <div style={{ paddingTop: '56px' }}>

        {/* the multiple choice solver */}
        <Hero /> 

        {/* invisible desktop app that aces any multiple choice exam */}
        {/* super easy to use */}
        {/* cmd h to take screenshot */}
        <FeaturesL />

        {/* cmd enter for AI answers that don't suck */}
        <Demo />

        {/* how it is undetectable */}
        {/* briefly explain browser vs OS space */}
        {/* text section */}

        {/* high quality explanations, if you actually want to learn */}
        {/* see why the other answers are wrong */}
        {/* powered by the best GPT-4o whatever */}
        {/* <FeaturesR /> */}

        {/* Used by students at... */}
        {/* <SocialProof /> */}

        {/* FAQ */}
        <Questions />

        {/* how to use */}
        {/* <KeyTable /> */}

        {/* call to action */}
        <CallToAction />

        <Footer />

      </div>
    </>
  )
}

export default App
