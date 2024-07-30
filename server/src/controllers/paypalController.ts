import { Request, Response } from 'express';
import paypal from '../paypal';
import { generateToken, verifyTokenAndExtractAmount } from '../util/jwtUtil';

//TYPES (execute-payment)
interface paypalTransaction {
  amount: {
    currency: string;
    total: number;
  };
}
interface PayPalPayment {
  transactions: paypalTransaction[];
}
//========================================================

//Create Payment Request
export const createPayment = async (req: Request, res: Response) => {
  console.log('In CREATE_PAYMENT FUNCTION'); /////

  const amount = req.body.amount;
  //   const encodedAmount = encodeURIComponent(amount);
  //   console.log('encodedAmount: ', encodedAmount);
  console.log('Amount: ', amount);
  if (!amount) {
    return res.status(400).json({ Error: 'Amount is required' });
  }
  //   const token = generateToken({ amount });

  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: 'http://localhost:3001/api/paypal/success',
      cancel_url: 'http://localhost:3001/cancelled',
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

  paypal.payment.create(create_payment_json, async function (error, payment) {
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

//Execute Payment
export const executePayment = async (req: Request, res: Response) => {
  console.log('In EXECUTE_PAYMENT FUNCTION'); //////
  console.log('REQUEST.QUERY:\n', req.query);

  const payerId = req.query.PayerID as string;
  const paymentId = req.query.paymentId as string;
  //   const amount = req.body.amount;

  //   console.log(amount);

  //   const token = req.query.token as string;
  //   const { payerId, paymentId } = req.query;
  //   console.log('jwtToken: ', jwtToken);
  //   if (!payerId || !paymentId || !jwtToken) {
  //     res.status(500).json({ Error: 'Payment Error' });
  //     return;
  //   }

  //   const amount = verifyTokenAndExtractAmount(jwtToken, res);
  //   if (!amount) return;
  try {
    // Retrieve the payment details to get the amount
    const paymentDetails = await new Promise<PayPalPayment>(
      (resolve, reject) => {
        paypal.payment.get(paymentId, (error, payment) => {
          if (error) {
            reject(error);
          } else {
            resolve(payment as unknown as PayPalPayment);
          }
        });
      },
    );

    const amount = paymentDetails.transactions[0].amount.total;

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
  } catch (error: any) {
    res.status(500).json({ Error: error.message });
  }
};
