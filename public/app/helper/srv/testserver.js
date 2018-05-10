const express = require('express');
const fs = require('fs');
const logger = require('morgan');
const path = require('path');

const app = express();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../public/')));

app.listen(3000)