// Register Model
const { Register } = require('../models/RegisterModel');

exports.index = (req, res) => {
  return res.render('register');
};

exports.register = async function (req, res) {
  try {
    const register = new Register(req.body);
    await register.registerUser();

    if (register.errors.length > 0) {
      req.flash('errors', register.errors);
      req.session.save(() => {
        return res.redirect('back');
      });
      return;
    }

    req.flash('success', 'Usuário cadastrado com sucesso.');
    req.session.save(() => res.redirect('/login'));
  } catch (err) {
    console.log(err);
    return res.render('404');
  }
};
