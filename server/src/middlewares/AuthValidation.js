const jwt = require('jsonwebtoken');


async function checkToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET, (err, userId) => {
        if (err) return err;
        return userId;
    });
}

async function validateToken(req, res) {
    const auth = req.headers['authorization'];

    if (!auth) {
        res.status(401).json({ error: 'no authorization header' });
        return null;
    }

    const token = auth.split(' ');

    // check if there is a token
    if (token.length !== 2) {
        res.status(401).json({ error: 'invalid auth format' });
        return null;
    }

    // check if token is bearer
    if (token[0] !== 'Bearer') {
        res.status(401).json({ error: 'invalid auth method' });
        return null;
    }

    // check if token is valid
    if (!token[1] || token[1] === '') {
        res.status(401).json({ error: 'no token provided' });
        return null;
    }

    try {
        return checkToken(token[1]);
    } catch (error) {
        return null;
    }
}

async function AuthValidation(req, res, next) {
    const userId = await validateToken(req, res);

    if (!userId) {
        return;
    }

    req.userId = userId;

    next();
};

module.exports = AuthValidation;
