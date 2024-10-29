const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./connectDB.js');

const express = require('express');
const cors = require('cors');

const app = express();

const agentRouter = require('./routes/agentRoute.js');
const callsRouter = require('./routes/callsRoute.js');

//middlewares
app.use(express.json());
app.use(cors());

app.use('/agent', agentRouter);
app.use('/calls', callsRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    connectDB();
    console.log(`Running on ${port}`);
});