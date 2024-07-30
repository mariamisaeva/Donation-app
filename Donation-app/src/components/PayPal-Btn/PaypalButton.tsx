import React from 'react';
// import { useEffect, useState } from 'react';
// import { usePayPalScriptReducer, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import './paypal-btn.css';

interface paypalButtonProps {
  amount: number;
}

const PaypalButton: React.FC<paypalButtonProps> = ({ amount }) => {
  console.log('Amount: ', amount);

  //   const [{ isPending }, dispatch] = usePayPalScriptReducer();

  //   React.useEffect(() => {
  //     dispatch({
  //       type: 'setOptions' as any,
  //       value: {
  //         clientId: 'YOUR_PAYPAL_CLIENT_ID', // Replace with your actual PayPal client ID
  //         currency: 'USD',
  //       },
  //     });
  //   }, [dispatch]);

  //   const createOrder = (data: any, actions: any) => {
  //     return fetch('/api/paypal/create-payment', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ amount }),
  //     })
  //       .then((response) => response.json())
  //       .then((order) => order.approvalUrl);
  //   };

  //   const onApprove = (data: any, actions: any) => {
  //     return fetch(
  //       `/api/paypal/success?paymentId=${data.paymentID}&PayerID=${data.payerID}`,
  //       {
  //         method: 'GET',
  //       },
  //     )
  //       .then((response) => response.json())
  //       .then((details) => {
  //         alert('Transaction completed by ' + details.payer.name.given_name);
  //       });
  //   };

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/paypal/create-payment',
        { amount },
      );
      const { approvalUrl } = response.data;
      if (approvalUrl) {
        window.location.href = approvalUrl; // Redirect to PayPal approval URL
      } else {
        console.error('No approval URL found.');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  return (
    <button type="button" onClick={handlePayment}>
      Paypal
    </button>
  );
  //   return (
  //     <>
  //       {isPending ? <div>Loading...</div> : null}
  //       <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
  //     </>
  //   );
};

export default PaypalButton;
