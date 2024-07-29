import { Request, Response } from 'express';
import Stripe from 'stripe';
import 'dotenv/config';
// Ensure the secret key is available
const SECRET_KEY = process.env.SECRET_API;
if (!SECRET_KEY) {
  throw new Error("Stripe secret key is not defined in the environment variables.");
}

// Initialize Stripe
const stripe = new Stripe(SECRET_KEY);

export const paymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
    });

    // Send the client secret to the client
    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error: unknown) {
    // Handle the error correctly
    if (error instanceof Error) {
      console.error('Error creating payment intent:', error.message);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({ error: "Unexpected Error" });
    }
  }
}
