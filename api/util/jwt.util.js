const jwt = require('jsonwebtoken');

class TokenUtil {

    static secret = process.env['JWT_SECRET'];

    static sign(payload) {
        return jwt.sign(payload, this.secret);
    }

    static verify(token) {
        return jwt.verify(token, this.secret);
    }

}

module.exports = TokenUtil