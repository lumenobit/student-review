try {
    require('dotenv').config();
} catch (ex) { }
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const apiRouter = require('./server/api');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', apiRouter);

// app.use(express.static(path.resolve(__dirname, 'client/build')));

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
// })

app.listen(PORT, () => {
    console.log(`App listening to Port ${PORT}`);
})

module.exports = app;