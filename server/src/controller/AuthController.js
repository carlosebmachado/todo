const UserController = require('./UserController');
const UserModel = require('../model/UserModel');

class AuthController {

  async register(req, res) {
    const { username, password, name } = req.body;

    const user = new UserModel({ username, password, name });

    try {
      await user.save();
      var token = jwt.sign(user, process.env.JWT_SECRET);
      res.status(200).json({ userId: user._id, token});
    } catch (error) {
      res.status(500).json(error);
    }
    
  }

  async login(req, res) {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username, password });

    if (!user) {
      res.status(401).json({ error: 'invalid auth' });
      return;
    }

    try {
      var token = jwt.sign(user, process.env.JWT_SECRET);
      res.status(200).json({ userId: user._id, token});
    } catch (error) {
      res.status(500).json(error);
    }
    
  }

  async checkUser(authorization) {
    try {
      const token = authorization.split(' ')[1];
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return null;
    }
  }

}

module.exports = new AuthController();
