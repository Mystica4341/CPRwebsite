const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { TableHints } = require("sequelize");
require('dotenv').config();
const port = process.env.PORT;


// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
      myapi: '3.0.0',
      info: {
        title: 'CPR API Documentation',
        version: '1.2.0',
        description: 'API documentation',
      },
      servers: [
        {
          url: `http://localhost:${port}`,
        },
      ],
      tags: [
        {
          name: 'User',
          description: 'API related to User',
        },
        {
          name: 'Item',
          description: 'API related to Item',
        },
        {
          name: 'Order',
          description: 'API related to Order',
        }
      ],
    },
    apis: ['./routes/*.js'], // files containing annotations as above
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  

  module.exports = (app) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }