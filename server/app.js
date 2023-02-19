const express = require('express');
const cors = require('cors');
const router = require('./routers');
const app = express();
const errorHandler = require('./errorHandlers');

app.use(cors());
app.use(express.json());

app.use('/api', router);
app.use(errorHandler);

module.exports = app;
