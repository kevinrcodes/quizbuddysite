import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import styles from './Auth.module.css';

export default function LoginForm({ onShowSignup, onShowForgotPassword }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await authService.signIn(email, password);
      navigate('/'); // Redirect to home after successful login
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Login</h2>
          <p className={styles.description}>
            <button
              className={styles.linkButton}
              onClick={onShowSignup}
            >
              Don't have an account? Sign up
            </button>
          </p>
        </div>
        <div className={styles.content}>
          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <div className={styles.labelGroup}>
                  <label htmlFor="password" className={styles.label}>Password</label>
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={onShowForgotPassword}
                  >
                    Forgot your password?
                  </button>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                />
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
