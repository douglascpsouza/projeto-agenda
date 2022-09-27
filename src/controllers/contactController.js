// Contact

const Contact = require('../models/ContactModel');

exports.index = (req, res) => {
  return res.render('contact', {
    contact: {}
  });
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
    req.session.save(() => res.redirect('/contact'));
    // req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
    return;
  } catch (err) {
    console.log(err);
    return res.render('404');
  }
};

exports.edit = async function (req, res) {
  if (!req.params.id) return res.render('404');

  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.render('404');
    }

    return res.render('contact', { contact });
  } catch (err) {
    console.log(err);
    return res.render('404');
  }
};

exports.update = async function (req, res) {
  if (!req.params.id) return res.render('404');

  try {
    const contact = new Contact(req.body);
    await contact.updateContact(req.params.id);

    if (contact.errors.length > 0) {
      req.flash('errors', contact.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Contato editado com sucesso.');
    // req.session.save(() => res.redirect('/'));
    req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
    return;
  } catch (err) {
    console.log(err);
    return res.render('404');
  }
};

exports.delete = async function (req, res) {
  if (!req.params.id) return res.render('404');

  try {
    const contact = await Contact.deleteById(req.params.id);
    if (!contact) {
      return res.render('404');
    }

    req.flash('success', 'Contato apagado com sucesso.');
    req.session.save(() => res.redirect('back'));
    return;
  } catch (err) {
    console.log(err);
    return res.render('404');
  }
};
