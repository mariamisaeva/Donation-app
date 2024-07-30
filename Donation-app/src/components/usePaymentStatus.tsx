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

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      setStatus('No client secret found in URL.');
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (paymentIntent) {
        switch (paymentIntent.status) {
          case 'succeeded':
            setStatus('Success! Payment received.');
            console.log(status)
            break;
          case 'processing':
            setStatus("Payment processing. We'll update you when payment is received.");
            break;
          case 'requires_payment_method':
            setStatus('Payment failed. Please try another payment method.');
            break;
          default:
            setStatus('Something went wrong.');
            break;
        }
      } else {
        setStatus('PaymentIntent not found.');
      }
    }).catch(error => {
      setStatus(`Error retrieving PaymentIntent: ${error.message}`);
    });
  }, [stripe, setStatus]);

  return status;
};

export default usePaymentStatus;
