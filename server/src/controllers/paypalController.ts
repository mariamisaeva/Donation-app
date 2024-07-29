import { Request, Response } from 'express';
import paypal from '../paypal';
import { generateToken, verifyTokenAndExtractAmount } from '../util/jwtUtil';
//Create Payment Request
export const createPayment = async (req: Request, res: Response) => {
  console.log('In CREATE_PAYMENT FUNCTION'); /////

  const amount = req.body.amount;
  //   const token = generateToken({ amount });

  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: 'http://localhost:3000/api/paypal/success',
      cancel_url: 'http://localhost:3000/cancelled',
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: 'Donation',
              sku: '001',
              price: amount,
              currency: 'USD',
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: 'USD',
          total: amount,
        },
        description: 'This is the payment description.',
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      console.log(error);
      res.status(500).json({ Error: error.message });
    } else {
      console.log('Create Payment Response'); /////

      const approvalUrl = payment.links?.find(
        (link) => link.rel === 'approval_url',
      )?.href;
      res.json({ approvalUrl });
    }
  });
};
/*
//Execute Payment
export const executePayment = async (req: Request, res: Response) => {
  console.log('In EXECUTE_PAYMENT FUNCTION'); //////
  console.log('REQUEST.QUERY:\n', req.query);

  const payerId = req.query.PayerID as string;
  const paymentId = req.query.paymentId as string;
  const amount = req.body.amount;

  console.log(amount);
  //   const token = req.query.token as string;
  //   const { payerId, paymentId } = req.query;
  //   console.log('jwtToken: ', jwtToken);
  //   if (!payerId || !paymentId || !jwtToken) {
  //     res.status(500).json({ Error: 'Payment Error' });
  //     return;
  //   }

  //   const amount = verifyTokenAndExtractAmount(jwtToken, res);
  //   if (!amount) return;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: amount,
        },
      },
    ],
  };

  paypal.payment.execute(paymentId, execute_payment_json, (err, payment) => {
    if (err) {
      res.status(500).json({ Error: err.message });
    } else {
      //   res.json('Payment Successful');
      return res.json({ message: 'Payment Successful', payment });
      //   console.log(JSON.stringify({ payment }));
    }
  });
};
*/
