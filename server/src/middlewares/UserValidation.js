const UserModel = require('../model/UserModel');

async function UserValidation(req, res, next) {
    const { username, password, name } = req.body;

    if (!username) {
        res.status(400).json({ error: 'missing username' });
        return;
    }
    if (!password) {
        res.status(400).json({ error: 'missing password' });
        return;
    }
    if (!name) {
        res.status(400).json({ error: 'missing name' });
        return;
    }

    let exists = await UserModel.findOne({
        'username': { '$eq': username }
    });

    if (exists) {
        res.status(400).json({ error: 'username in use' });
        return;
    }

    next();
};

module.exports = UserValidation;
