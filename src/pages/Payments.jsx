import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
import styles from './Payments.module.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payments = () => {
  const location = useLocation();
  const { plan } = location.state || {};

  useEffect(() => {
    // Create a Checkout Session as soon as the page loads
    const createCheckoutSession = async () => {
      try {
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plan: plan || 'getting-started', // Default to getting-started if no plan specified
          }),
        });

        const session = await response.json();

        // Redirect to Stripe Checkout
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (error) {
          console.error('Error:', error);
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };

    createCheckoutSession();
  }, [plan]);

  return (
    <div className={styles.paymentsContainer}>
      <h2>Redirecting to secure payment...</h2>
      <p>Please wait while we redirect you to our secure payment processor.</p>
    </div>
  );
};

export default Payments;