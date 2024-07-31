import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

interface PaymentComponentProps {
  amount: number;
}

const stripePromise = loadStripe('pk_test_51PhZaY2K9MkrEBt5paCpLGfNLi71q3FsmuXl0OpMgtbJb1sGifqo3fgknIWSUCl8fstVtxhrGN6b2kmdSTImpcQL00JuL23sCW');

const PaymentComponent: React.FC<PaymentComponentProps> = ({ amount }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/stripe/card-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: amount * 100 }) // Correcting amount conversion to cents
        });
        const data = await response.json();
        setClientSecret(data.client_secret);
      } catch (error) {
        console.error('Error fetching client secret:', error);
      }
    };

    fetchClientSecret();
  }, [amount]);

  // Ensure clientSecret is available before rendering the Elements component
  if (!clientSecret) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  const options = {
    clientSecret,
   appearance :{
      theme: 'stripe',

    variables: {
      colorPrimary: '#000',
      colorBackground: '#fff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '5px',
      borderRadius: '5px',
    }
  }
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentComponent;
