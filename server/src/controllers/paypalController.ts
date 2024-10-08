import { Request, Response } from 'express';
import paypal from '../paypal';

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
  const amount = req.body.amount;
  if (!amount) {
    return res.status(400).json({ Error: 'Amount is required' });
  }

  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: 'http://localhost:3000/api/paypal/success',
      cancel_url: 'http://localhost:3000/api/paypal/cancel',
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
      res.status(500).json({ Error: error.message });
    } else {
      const approvalUrl = payment.links?.find(
        (link) => link.rel === 'approval_url',
      )?.href;

      res.json({ approvalUrl });
    }
  });
};

//Execute Payment
export const executePayment = async (req: Request, res: Response) => {
  const payerId = req.query.PayerID as string;
  const paymentId = req.query.paymentId as string;

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
        return res.send('Payment Successful');
        //   console.log(JSON.stringify({ payment }));
      }
    });
  } catch (error: any) {
    res.status(500).json({ Error: error.message });
  }
};

export const paymentCancellation = (req: Request, res: Response) => {
  res.send('Payment Cancelled');
};
