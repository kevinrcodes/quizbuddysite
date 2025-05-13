// server.js
import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });
const app = express();
app.use(express.json());

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { plan } = req.body;
    // TODO: swap in your real price IDs
    const priceId = plan === 'pro' ? 'price_ABC' : 'price_DEF';
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: 'http://localhost:3000/success',
      cancel_url:  'http://localhost:3000/cancel',
    });
    res.json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4242, () => console.log('⚡️ Server running on http://localhost:4242'));
