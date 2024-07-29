import { Router } from "express";
import { paymentIntent  } from "../controllers/stripeController";
const router = Router();

router.post("/card-payment",paymentIntent );
export default router