import { Router } from "express";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "./VerfiyToken.js";
import {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  getAllOrders,
  getMonthlyIncome,
} from "../controllers/order.controller.js";

const orderRouter = Router();

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */
orderRouter.post("/", verifyToken, createOrder);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   put:
 *     summary: Update order (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, processing, shipped, delivered, cancelled]
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */
orderRouter.put("/:id", verifyTokenAndAdmin, updateOrder);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   delete:
 *     summary: Delete order (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       500:
 *         description: Server error
 */
orderRouter.delete("/:id", verifyTokenAndAdmin, deleteOrder);

/**
 * @swagger
 * /api/v1/orders/find/{userId}:
 *   get:
 *     summary: Get user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User's order history
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */
orderRouter.get("/find/:userId", verifyTokenAndAuthorization, getUserOrders);

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */
orderRouter.get("/", verifyTokenAndAdmin, getAllOrders);

/**
 * @swagger
 * /api/v1/orders/income:
 *   get:
 *     summary: Get monthly income statistics (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly income data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: number
 *                     description: Month number
 *                   total:
 *                     type: number
 *                     description: Total income
 *       500:
 *         description: Server error
 */
orderRouter.get("/income", verifyTokenAndAdmin, getMonthlyIncome);

export default orderRouter;
