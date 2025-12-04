import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API Documentation",
      version: "1.0.0",
      description:
        "Complete API documentation for the E-Commerce LAMA platform. This API provides endpoints for user authentication, product management, shopping cart, orders, and payment processing.",
      contact: {
        name: "API Support",
        email: "support@ecommerce-lama.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
      {
        url: "https://api.ecommerce-lama.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["username", "email", "password"],
          properties: {
            _id: {
              type: "string",
              description: "Auto-generated user ID",
            },
            username: {
              type: "string",
              description: "User's username",
              example: "johndoe",
            },
            email: {
              type: "string",
              format: "email",
              description: "User's email address",
              example: "john@example.com",
            },
            password: {
              type: "string",
              format: "password",
              description: "User's encrypted password",
            },
            isAdmin: {
              type: "boolean",
              default: false,
              description: "Admin status",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Product: {
          type: "object",
          required: ["title", "description", "img", "price"],
          properties: {
            _id: {
              type: "string",
              description: "Auto-generated product ID",
            },
            title: {
              type: "string",
              minLength: 2,
              description: "Product name",
              example: "Classic Cotton T-Shirt",
            },
            description: {
              type: "string",
              description: "Product description",
              example: "Comfortable 100% cotton t-shirt",
            },
            img: {
              type: "string",
              description: "Product image URL",
              example: "https://example.com/image.jpg",
            },
            categories: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Product categories",
              example: ["clothing", "men", "casual"],
            },
            size: {
              type: "string",
              description: "Product size",
              example: "M",
            },
            color: {
              type: "string",
              description: "Product color",
              example: "Navy Blue",
            },
            price: {
              type: "number",
              description: "Product price",
              example: 29.99,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Cart: {
          type: "object",
          required: ["userId", "products"],
          properties: {
            _id: {
              type: "string",
              description: "Auto-generated cart ID",
            },
            userId: {
              type: "string",
              description: "User ID",
            },
            products: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productId: {
                    type: "string",
                    description: "Product ID",
                  },
                  quantity: {
                    type: "number",
                    default: 1,
                    description: "Product quantity",
                  },
                },
              },
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Order: {
          type: "object",
          required: ["userId", "products", "amount", "address"],
          properties: {
            _id: {
              type: "string",
              description: "Auto-generated order ID",
            },
            userId: {
              type: "string",
              description: "User ID",
            },
            products: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productId: {
                    type: "string",
                    description: "Product ID",
                  },
                  quantity: {
                    type: "number",
                    default: 1,
                    description: "Product quantity",
                  },
                },
              },
            },
            amount: {
              type: "number",
              description: "Total order amount",
              example: 149.99,
            },
            address: {
              type: "object",
              description: "Shipping address",
              properties: {
                street: { type: "string" },
                city: { type: "string" },
                state: { type: "string" },
                zipCode: { type: "string" },
                country: { type: "string" },
              },
            },
            status: {
              type: "string",
              default: "pending",
              enum: [
                "pending",
                "processing",
                "shipped",
                "delivered",
                "cancelled",
              ],
              description: "Order status",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js", "./controllers/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
