require('dotenv').config();

const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const server = express();

server.use(express.json({ limit: '10mb'}));
server.use(cors());
server.use(routes);

server.listen(PORT, () => {
    console.log(`🏠 Server successfully running on port ${PORT}`);
});