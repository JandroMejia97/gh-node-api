import { createServer } from 'http';
import express from "express";
import routes from './routes/index.js';
import config from './config/index.js';
import swaggerUi from 'swagger-ui-express';
import openapiSpecification from './docs/basicInfo.js';

const app = express();

const httpServer = createServer(app);

// Setup the server
const port = config.serverPort;
app.set('port', port);


// Setup the body parser
app.use(express.json());

// Setup the routes
app.use('/api', routes);

// Setup swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification, {
  explorer: true,
}));

app.use((req, res, next) => {
  res.status(404);
  if (req.accepts('html')) {
    res.redirect('/docs');
    return;
  }
  
  res.send({ error: 'Resource isn\'t found' });
})

// Start the server
httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});