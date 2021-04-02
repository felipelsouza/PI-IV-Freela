const express = require('express');
const cors = require('cors');
const routes = require('./routes');

require('./database/connection');

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

const port = 3333;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
