const jwt = require('jsonwebtoken');
const Yup = require('yup');
const User = require('../models/User');
const authConfig = require('../../config/auth');
//controller de sessão
module.exports = {
  //criando uma sessão
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } }); //pocurando um usuário pelo seu email

    if (!user) {
      return res.status(401).json({ error: 'User not found in our database' });
    }

    if (!(await user.checkPassword(password))) {
      //verificando se a senha esta correta
      return res.json(401).json({ error: 'Password does not match' });
    }
    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      //passando o segredo e quando expira o token
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  },
};
