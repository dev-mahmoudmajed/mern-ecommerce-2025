import { Router } from "express";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "./VerfiyToken.js";
import {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllCarts,
} from "../controllers/cart.controller.js";

const cartRouter = Router();

/**
 * @swagger
 * /api/v1/carts:
 *   post:
 *     summary: Create a new cart
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       201:
 *         description: Cart created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Server error
 */
cartRouter.post("/", verifyToken, createCart);

/**
 * @swagger
 * /api/v1/carts/{id}:
 *   put:
 *     summary: Update cart
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Server error
 */
cartRouter.put("/:id", verifyTokenAndAuthorization, updateCart);

/**
 * @swagger
 * /api/v1/carts/{id}:
 *   delete:
 *     summary: Delete cart
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 *       500:
 *         description: Server error
 */
cartRouter.delete("/:id", verifyTokenAndAuthorization, deleteCart);

/**
 * @swagger
 * /api/v1/carts/find/{userId}:
 *   get:
 *     summary: Get user's cart
 *     tags: [Carts]
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
 *         description: User's cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Server error
 */
cartRouter.get("/find/:userId", verifyTokenAndAuthorization, getUserCart);

/**
 * @swagger
 * /api/v1/carts:
 *   get:
 *     summary: Get all carts (Admin only)
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all carts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Server error
 */
cartRouter.get("/", verifyTokenAndAdmin, getAllCarts);

export default cartRouter;
