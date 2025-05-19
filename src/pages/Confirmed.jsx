// src/pages/Confirmed.jsx
import React from 'react';

export default function Confirmed() {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: 'var(--color-background)',
      color: 'var(--color-text-light)',
      textAlign: 'center',
      padding: '2rem'
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '1rem'
    },
    paragraph: {
      fontSize: '1.25rem',
      marginBottom: '2rem'
    },
    button: {
      padding: '0.75rem 1.5rem',
      backgroundColor: 'var(--color-accent)',
      color: 'var(--color-text-light)',
      textDecoration: 'none',
      borderRadius: '8px',
      transition: 'background-color 0.2s ease-in-out'
    },
    buttonHover: {
      backgroundColor: 'var(--color-accent-hover)'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Email Confirmed!</h1>
      <p style={styles.paragraph}>Your account is now active. You can head back to the app and sign in.</p>
    </div>
  );
}
