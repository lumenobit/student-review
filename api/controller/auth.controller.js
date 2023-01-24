const TokenUtil = require("../util/jwt.util");

async function attemptLogin(req, res) {

    const { username, password } = req.body;

    try {
        if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {

            const token = TokenUtil.sign({ username: username });
            res.cookie('authToken', token, { maxAge: 2592000 });
            res.send({})
        } else {
            res.status(401).send({ message: "Invalid email and password." })
        }
    } catch (ex) {
        logger.error(ex);
        res.status(500).send({ message: "An unexpected error has occurred. Please try again later." })
    }

}

module.exports = {
    attemptLogin
}