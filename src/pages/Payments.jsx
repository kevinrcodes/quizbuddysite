import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Payments.module.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Payments() {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan') || 'getting-started';
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect to signup if not authenticated
    if (!user) {
      const returnUrl = `/payments?plan=${plan}`;
      navigate(`/signup?returnTo=${encodeURIComponent(returnUrl)}`);
      return;
    }

    async function goToCheckout() {
      try {
        const res = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.id}` // Include user ID in request
          },
          body: JSON.stringify({ 
            plan,
            userId: user.id,
            email: user.email
          }),
        });
        console.log('API Response Status:', res.status);
        const data = await res.json();
        console.log('API Response Data:', data);
        
        if (data.error) throw new Error(data.error);
        
        const stripe = await stripePromise;
        const { error: stripeError } = await stripe.redirectToCheckout({ 
          sessionId: data.id 
        });
        if (stripeError) throw stripeError;
      } catch (err) {
        console.error('Checkout Error:', err);
        navigate('/cancel');
      }
    }

    goToCheckout();
  }, [plan, navigate, user]);

  return (
    <div className={styles.paymentsContainer}>
      <h2>Redirecting to secure payment…</h2>
      <p>If you're not redirected automatically, <button onClick={() => navigate(-1)}>go back</button>.</p>
    </div>
  );
}
