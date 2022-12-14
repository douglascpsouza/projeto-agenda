const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
  name: { type: String, require: true },
  surname: { type: String, require: false, default: '' },
  phone: { type: String, require: false, default: '' },
  email: { type: String, require: false, default: '' },
  createAt: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
  }

  async addContact() {
    this.validateContact();
    if (this.errors.length > 0) return;

    this.prepareDataForDB();

    this.contact = await ContactModel.create(this.body);
  }

  async updateContact(id) {
    this.validateContact();
    if (this.errors.length > 0) return;

    this.prepareDataForDB();

    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
  }

  validateContact() {
    this.setInputAsString();
    this.checkBlankFields();
    this.validateEmail();
  }

  setInputAsString() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
  }

  checkBlankFields() {
    if (!this.body.name) {
      this.errors.push('O campo Nome deve ser preenchido');
    } else if (!this.body.phone && !this.body.email) {
      this.errors.push('Telefone ou E-mail deve ser preenchido.');
    }
  }

  validateEmail() {
    if (this.body.email && !validator.isEmail(this.body.email)) {
      this.errors.push('E-mail inválido.');
    }
  }

  prepareDataForDB() {
    this.body = {
      name: this.body.name,
      surname: this.body.surname,
      phone: this.body.phone,
      email: this.body.email
    };
  }

  // Static Methods

  static async findById(id) {
    if (typeof id !== 'string') {
      return null;
    }
    const contactById = await ContactModel.findById(id);
    return contactById;
  }

  static async findAllContacts() {
    const contacts = await ContactModel.find()
      .sort({ name: 1 });
    return contacts;
  }

  static async deleteById(id) {
    if (typeof id !== 'string') {
      return null;
    }
    const contact = await ContactModel.findByIdAndDelete(id);
    return contact;
  }
}

module.exports = Contact;
