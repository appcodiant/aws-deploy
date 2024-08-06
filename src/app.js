const express = require("express");
const userRoutes = require("./routes/userRoutes.js");
const swaggerUi = require("swagger-ui-express");
const { initializeSwagger, setupSwagger } = require("./constants/swagger.js");
const load = require("express-load");
const r = require("./routes/userRoutes.js");
const path = require("path");
const fs = require('fs');

require("./app/models");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();
const swaggerSpec = initializeSwagger();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath)
  .filter(file => file.endsWith('.js'))
  .forEach(file => {
    const routePath = path.join(routesPath, file);
    const route = require(routePath);
    app.use('/users', route);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/', mainRoutes);
// app.use("/users", userRoutes);

app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
