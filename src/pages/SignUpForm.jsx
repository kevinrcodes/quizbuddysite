import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import styles from './Auth.module.css';

export default function SignUpForm({ onShowLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      await authService.signUp(email, password);
      setSuccess(true);
    } catch (err) {
      if (err.message === 'An account with this email already exists') {
        setError(
          <div>
            An account with this email already exists.{' '}
            <button
              className={styles.linkButton}
              onClick={onShowLogin}
            >
              Sign in instead
            </button>
          </div>
        );
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h2 className={styles.title}>Check your email</h2>
            <p className={styles.description}>
              Please verify your account before logging in. The email will arrive in a few seconds.
            </p>
          </div>
          <div className={styles.content}>
            <button
              className={styles.linkButton}
              onClick={onShowLogin}
            >
              Back to sign in
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Create Account</h2>
          <p className={styles.description}>
            <button
              className={styles.linkButton}
              onClick={onShowLogin}
            >
              Already have an account? Sign in
            </button>
          </p>
        </div>
        <div className={styles.content}>
          <form onSubmit={handleSignUp}>
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
                <label htmlFor="password" className={styles.label}>Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="repeat-password" className={styles.label}>Repeat Password</label>
                <input
                  id="repeat-password"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className={styles.input}
                />
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Sign up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
