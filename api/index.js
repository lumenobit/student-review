const path = require('path')
if (process.env.NODE_ENV !== 'production') {
    try {
        require('dotenv').config({ path: path.resolve(process.cwd, '.env') });
    } catch (ex) { }
}
const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./api');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`App listening to Port ${PORT}`);
})

module.exports = app;