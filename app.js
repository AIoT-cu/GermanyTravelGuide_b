const envImport = require("dotenv").config();
const cors = require('cors');
const express = require('express');
const sequelize = require("./helpers/sequelize");
const logger = require("./logger/logger");
const requestLogger = require("./middlewares/requestLogger");
const errorLogger = require("./middlewares/errorLogger");
const errorHandler = require("./middlewares/errorHandler");
// const authenticate = require('./middlewares/authenticate');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const AppError = require("./errors/AppError");

const app = express();

// Confugure Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Germany Travel Blog',
      version: '1.0.0',
      description: 'API Germany Travel Blog',
    },
  },
  apis: ['./routes/*.js', './models/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Configure CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    // credentials: true,
    // allowedHeaders: ["Authorization", "Content-Type"],
    // exposedHeaders: ["Content-Length"],
  })
);

// Check if occurs any error when getting env variables
if (envImport.error) {
  throw new Error(`Environment Variables - Import Error | ${envImport.error}`);
}

// Use process.env.PORT with a default value
const port = process.env.PORT;

// Middleware to parse JSON
app.use(express.json());

// Synchronize all Sequelize models with the database
sequelize
  .sync()
  .then(() => {
    logger.info("All models were synchronized successfully.");
    // Start your application here
  })
  .catch((err) => {
    logger.error("An error occurred while synchronizing the models:", err);
  });

// Use loggers
app.use(requestLogger);
app.use(errorLogger);

// Import the routes
const placesRoutes = require('./routes/placesRoutes');
const statesRoutes = require('./routes/statesRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const usersRoutes = require('./routes/users');
const imagesRoutes = require('./routes/images');

// Associate the routes with the app
app.use('/', placesRoutes);
app.use('/', statesRoutes);
app.use('/', categoriesRoutes);
app.use('/', usersRoutes);
app.use('/', imagesRoutes);

// Check if request to a non existing route
app.all("*", (req, res, next) => {
  const err = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );

  next(err);
});

// Error handling
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  logger.info(`The application is listening at http://localhost:${port}`);
});