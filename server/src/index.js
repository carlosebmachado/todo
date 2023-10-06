const express = require('express');
const cors = require('cors');
require('dotenv').config();

const TaskRoutes = require('./routes/TaskRoutes');
const UserRoutes = require('./routes/UserRoutes');
const AuthRoutes = require('./routes/AuthRoutes');

const server = express();

server.use(cors());
server.use(express.json());
server.use('/task', TaskRoutes);
server.use('/user', UserRoutes);
server.use('/auth', AuthRoutes);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}.`);
});
