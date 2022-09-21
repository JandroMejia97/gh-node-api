import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Github API',
      version: '1.0.0',
      description: 'A simple RESTful API integrated with GitHub REST API to get users and their repositories',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'JandroMejia97',
        email: 'alejandromejia2012.27@gmail.com'
      },
    },
  },
  apis: ['./src/routes/**.js'],
};

const openapiSpecification = swaggerJsdoc(options);

export default openapiSpecification;