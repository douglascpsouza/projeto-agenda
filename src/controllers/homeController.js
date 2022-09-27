// Import Contact
const Contact = require('../models/ContactModel');

exports.index = async (req, res) => {
  const contacts = await Contact.findAllContacts();
  return res.render('index', { contacts });
};
