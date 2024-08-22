import swaggerJsdoc, { SwaggerDefinition } from 'swagger-jsdoc';
import { version } from '../../package.json';
import config from '.';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.1.0',
  info: {
    title: 'p2vest Express API with Swagger',
    version: version,
    description: 'Api documentaiton for the express api for p2vest task',
  },
  servers: [
    {
      url: `http://localhost:${config.port}/`,
      description: 'Local server',
    },
    {
      url: 'https://api.staging.aiforhomework.com/',
      description: 'Live server',
    },
  ],
  tags: [
    {
      name: 'default',
      description: 'A lsit of all default routes',
    },
    {
      name: 'Authentication',
      description: 'A list of routes for Authentication',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts',
    './src/services/*.ts',
    './src/schema/*.ts',
    './src/docs/*.ts',
  ],
};

const specs = swaggerJsdoc(options);

export default specs;
