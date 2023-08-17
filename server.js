const express = require('express');
const bodyParser = require('body-parser');
const apiRoute = require('./routes/routes');
const mongoose = require('mongoose');
const rateLimite = require('express-rate-limit');
const cors = require('cors');

const app = express();
const PORT = 3333;

const apiLimiter = rateLimite({
    windowMs: 15 * 60 * 100,
    max: 100,
    message: 'Too many request from this IP, please try again later '
})

mongoose.connect('mongodb://localhost:27017/rede-social', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiLimiter);
app.use('/api', apiRoute);

app.listen(PORT, () => {
    console.log(`Escutando a porta ${PORT}`);
});



