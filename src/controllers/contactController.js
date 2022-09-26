// Contact

const Contact = require('../models/ContactModel');

exports.index = (req, res) => {
  return res.render('contact');
};

exports.create = async function (req, res) {
  try {
    const contact = new Contact(req.body);
    await contact.addContact();

    if (contact.errors.length > 0) {
      req.flash('errors', contact.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Contato registrado com sucesso.');
    return res.render('contact');
  } catch (err) {
    console.log(err);
    return res.render('404');
  }
};
