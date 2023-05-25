const express = require('express');
const cors = require('cors');
require('dotenv').config();

const TaskRoutes = require('./routes/TaskRoutes');

const server = express();

server.use(cors());
server.use(express.json());
server.use('/task', TaskRoutes);

server.listen(3333, () => {
  console.log('Server running on port 3333.');
});
