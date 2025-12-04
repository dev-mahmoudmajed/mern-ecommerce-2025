import express from "express";
import mongoose from "mongoose";
import { DB_URI, PORT } from "./config/config.js";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";

const app = express();

// Import routes
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";
import stripeRouter from "./routes/stripe.js";

// Middleware
app.use(express.json());

// Database connection
mongoose
  .connect(DB_URI)
  .then((r) => console.log(`MongoDB connected Successfully`))
  .catch((err) => console.log(err));

// API Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/checkout", stripeRouter);

// Swagger Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "E-Commerce API Docs",
  })
);

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to E-Commerce LAMA API",
    documentation: "/api-docs",
    version: "1.0.0",
  });
});

// Test endpoint
app.get("/api/v1/test", (req, res) => {
  res
    .status(200)
    .json({
      status: "success",
      data: {
        product: "hello world",
      },
    })
    .end();
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(
    `📚 API Documentation available at http://localhost:${PORT}/api-docs`
  );
});
