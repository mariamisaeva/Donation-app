import React, {useState} from 'react';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { usePage } from './PageContext';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { selectedAmount, setPage } = usePage();
  const [errorMessage, setErrorMessage] = useState(null);
   const handlePage = ()=>{
    setPage(0);
   }
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const {error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'http://localhost:5173/payment/status',
      },
    });


    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
  <>
    <div className='top-card'>
      <h3 className='sa' onClick={handlePage}>Selected Amount: €{selectedAmount}</h3>
       <h3>Card Info</h3>
      </div>

    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe} className='s-btn'>Submit</button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
    </>
  )
};

export default CheckoutForm;