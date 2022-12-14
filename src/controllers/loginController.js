// Login Model
const Login = require('../models/LoginModel');

exports.index = (req, res) => {
  return res.render('login');
};

exports.login = async function (req, res) {
  try {
    const login = new Login(req.body);
    await login.searchForUser();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Logado com sucesso.');
    req.session.user = login.user;
    req.session.save(() => res.redirect('/'));
  } catch (err) {
    console.log(err);
    return res.render('404');
  }
}
