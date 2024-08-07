import paypal from 'paypal-rest-sdk';
import dotenv from 'dotenv';

dotenv.config();

paypal.configure({
  mode: 'live', //sandbox or live
  client_id: process.env.PAYPAL_CLIENT_ID || '',
  client_secret: process.env.PAYPAL_SECRET || '',
});

export default paypal;
