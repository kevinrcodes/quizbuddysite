import { useState, useEffect, useRef } from 'react'
import { Navbar, Container, Button } from 'react-bootstrap'
import './SiteMenuBar.css'

function SiteMenuBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const hamburgerRef = useRef(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  return (
    <Navbar className="site-menu-bar" expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand href="#hero" className="text-white">App Name</Navbar.Brand>
        
        {/* Custom Hamburger Button */}
        <button 
          ref={hamburgerRef}
          className={`hamburger ${isMenuOpen ? 'is-active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Custom Mobile Menu */}
        <div 
          ref={menuRef}
          className={`mobile-menu ${isMenuOpen ? 'is-active' : ''}`}
        >
          <nav>
            <Button 
              className="download-btn"
              href="#pricing"
            >
              Get Started
            </Button>
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#help">Help</a>
          </nav>
        </div>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          <nav>
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#help">Help</a>
            <Button 
              className="download-btn"
              href="#pricing"
            >
              Get Started
            </Button>
          </nav>
        </div>
      </Container>
    </Navbar>
  )
}

export default SiteMenuBar 