// RegisterModel

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const RegisterSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});

const RegisterModel = mongoose.model('Register', RegisterSchema);

class Register {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async registerUser() {
    this.validateUserData();
    if (this.errors.length > 0) return;

    await this.checkEmailInDB();
    if (this.errors.length > 0) return;

    this.prepareDataForDB();

    this.hashPassword();

    try {
      // Register user
      this.user = await RegisterModel.create(this.body);
    } catch (err) {
      console.log(err);
    }
  }

  validateUserData() {
    this.setInputAsString();
    this.checkBlankFields();
    this.validateEmail();
    this.validatePassword();
  }

  setInputAsString() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
  }

  checkBlankFields() {
    for (const key in this.body) {
      if (this.body[key] === '') {
        this.errors.push('Todos os campos devem ser preenchidos');
        break;
      }
    }
  }

  validateEmail() {
    if (this.body.email !== this.body.confirmation) {
      this.errors.push('Confirmação do e-mail não confere.');
    } else if (!validator.isEmail(this.body.email)) {
      this.errors.push('E-mail inválido.');
    }
  }

  validatePassword() {
    if (this.body.password.length < 8 || this.body.password.length > 18) {
      this.errors.push('A senha deve ter entre 8 e 18 caracteres.');
    } else if (!validator.isStrongPassword(this.body.password)) {
      this.errors.push('A senha não cumpre os requisitos de segurança.');
    }
  }

  async checkEmailInDB() {
    const user = await RegisterModel.findOne({ email: this.body.email });
    if (user) {
      this.errors.push('E-mail já cadastrado.')
    }
  }

  prepareDataForDB() {
    this.body = {
      name: this.body.name,
      email: this.body.email,
      password: this.body.password
    };
  }

  hashPassword() {
    const salt = bcrypt.genSaltSync(10);
    this.body.password = bcrypt.hashSync(this.body.password, salt);
  }
}

module.exports = Register;
