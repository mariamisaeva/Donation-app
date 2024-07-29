import { useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { usePage } from './PageContext';

const usePaymentStatus = () => {
  const stripe = useStripe();
  const { status, setStatus } = usePage();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    // Retrieve the PaymentIntent
    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        // Inspect the PaymentIntent `status` to indicate the status of the payment
        // to your customer.
        switch (paymentIntent.status) {
          case 'succeeded':
            setStatus('Success! Payment received.');
            break;

          case 'processing':
            setStatus("Payment processing. We'll update you when payment is received.");
            break;

          case 'requires_payment_method':
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            setStatus('Payment failed. Please try another payment method.');
            break;

          default:
            setStatus('Something went wrong.');
            break;
        }
      });
  }, [stripe, setStatus]);

  return status;
};

export default usePaymentStatus;
