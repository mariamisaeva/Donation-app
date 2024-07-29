import Router from 'express';
import { createPayment, executePayment } from '../controllers/paypalController';

const router = Router();

router.post('/create-payment', createPayment);
router.get('/success', executePayment);

export default router;
