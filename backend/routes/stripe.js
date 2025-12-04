import express from "express";
import { verifyToken } from "./VerfiyToken.js";
import { STRIPE_SECRET_KEY } from "../config/config.js";
import Stripe from "stripe";
const stripe = new Stripe(STRIPE_SECRET_KEY);
const router = express.Router();

/**
 * @swagger
 * /api/v1/checkout/payment:
 *   post:
 *     summary: Process payment with Stripe
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - source
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Payment amount in cents
 *                 example: 2999
 *               source:
 *                 type: string
 *                 description: Stripe token
 *                 example: tok_visa
 *     responses:
 *       200:
 *         description: Payment successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 status:
 *                   type: string
 *                 amount:
 *                   type: number
 *       500:
 *         description: Payment failed
 */
router.post("/payment", verifyToken, (req, res) => {
  stripe.charges.create(
    {
      amount: req.body.amount,
      currency: "usd",
      source: req.body.source,
      description: "Test charge",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

export default router;
