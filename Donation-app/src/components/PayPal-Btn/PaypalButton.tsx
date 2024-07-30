import React from 'react';
// import { useEffect, useState } from 'react';
// import { usePayPalScriptReducer, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import './paypal-btn.css';

interface paypalButtonProps {
  amount: number;
}

const PaypalButton: React.FC<paypalButtonProps> = ({ amount }) => {
  console.log('Amount: ', amount); ////

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/paypal/create-payment',
        { amount },
      );
      const { approvalUrl } = response.data;
      if (approvalUrl) {
        window.location.href = approvalUrl; //Redirect to PayPal approval-URL
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
};

export default PaypalButton;
