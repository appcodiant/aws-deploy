const swaggerJSDoc = require('swagger-jsdoc');


const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Sample API',
      version: '1.0.0',
      description: 'A simple API with automatic Swagger documentation',
    },
  },
  apis: ['../routes/*.js'], // Path to your route files
};

//C:\Users\Keshav.K\NodeJsWorkspace\Demo\src\routes\userRoutes.js
const initializeSwagger = () => swaggerJSDoc(swaggerOptions);

module.exports = {
  initializeSwagger,
};