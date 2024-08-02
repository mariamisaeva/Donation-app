import Router from 'express';
import {
  createPayment,
  executePayment,
  paymentCancellation,
} from '../controllers/paypalController';

const router = Router();

router.post('/create-payment', createPayment);
router.get('/success', executePayment);
router.get('/cancel', paymentCancellation);

export default router;
