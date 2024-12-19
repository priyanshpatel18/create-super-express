import swaggerJsdoc from "swagger-jsdoc";

const UserSchema = {
  type: "object",
  properties: {
    id: { type: "string", example: "123e4567-e89b-12d3-a456-426655440000" },
    email: { type: "string", example: "johndoe@example.com" },
    username: { type: "string", example: "johndoe" },
  },
}

// Swagger Config
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Super Express API",
      version: "1.0.0",
      description: "API documentation for Super Express",
    },
    components: {
      schemas: {
        User: UserSchema
      }
    },
  },
  apis: ["./dist/routes/*.js"],
}
export const swaggerSpec = swaggerJsdoc(swaggerOptions);