try {
    require('dotenv').config();
} catch (ex) { }
const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./api');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== 'production') {
    app.use(cors({
        credentials: true,
        origin: 'http://localhost:3000'
    }));
}

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`App listening to Port ${PORT}`);
})

module.exports = app;