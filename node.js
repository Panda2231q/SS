const express = require('express');
const stripe = require('stripe')('tvoj_stripe_secret_key');
const cors = require('cors');

const app = express();

// Omogoči CORS za vse zahtevke
app.use(cors({
  origin: 'https://dolphin-app-z8fq2.ondigitalocean.app',
  methods: ['POST']
}));

app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { amount, currency, payment_method_types, metadata } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: payment_method_types,
      line_items: [{
        price_data: {
          currency: currency,
          product_data: {
            name: 'Spletna Stran',
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://dolphin-app-z8fq2.ondigitalocean.app/success.html',
      cancel_url: 'https://dolphin-app-z8fq2.ondigitalocean.app/cancel.html',
      metadata: metadata
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
