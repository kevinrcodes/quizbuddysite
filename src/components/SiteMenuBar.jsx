import { useState, useEffect, useRef } from 'react'
import { Navbar, Container, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './SiteMenuBar.css'

function SiteMenuBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const hamburgerRef = useRef(null)
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleNavClick = (path) => {
    closeMenu()
    navigate(path)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
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
        closeMenu()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  const renderAuthButtons = () => {
    if (user) {
      return (
        <>
          <span className="auth-link">{user.email}</span>
          <button 
            className="auth-link signup"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </>
      )
    }
    return (
      <>
        <Link to="/login" className="auth-link" onClick={closeMenu}>Sign In</Link>
        <Link to="/signup" className="auth-link signup" onClick={closeMenu}>Sign Up</Link>
      </>
    )
  }

  return (
    <Navbar className="site-menu-bar" expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="text-white" onClick={closeMenu}>Quiz Buddy</Navbar.Brand>
        
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
              href="#download"
              onClick={closeMenu}
            >
              Download
            </Button>
            <Link to="/#how-it-works" onClick={closeMenu}>How It Works</Link>
            <Link to="/#keybinds" onClick={closeMenu}>Help</Link> // TODO fix these buttons
            {/* {renderAuthButtons()} */}
          </nav>
        </div>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          <nav>
            <Link to="/#how-it-works">How It Works</Link>
            <Link to="/#keybinds">Help</Link> 
            <Button 
              className="download-btn"
              href="#download"
            >
              Download
            </Button>
            {/* {renderAuthButtons()} */}
          </nav>
        </div>
      </Container>
    </Navbar>
  )
}

export default SiteMenuBar 