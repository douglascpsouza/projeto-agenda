// RegisterModel
const { Register, RegisterModel } = require('./RegisterModel');
const bcrypt = require('bcryptjs');

class Login extends Register {
  async searchForUser() {
    this.validateLoginInput();
    if (this.errors.length > 0) return;

    const userDataInDB = await this.findUserInDB();
    if (this.errors.length > 0) return;

    this.checkHashedPassword(userDataInDB.password);
    if (this.errors.length > 0) return;

    this.user = {
      id: userDataInDB._id,
      name: userDataInDB.name,
      email: userDataInDB.email
    };
  }

  validateLoginInput() {
    this.setInputAsString();
    this.checkBlankFields();
    this.validateEmail();
  }

  async findUserInDB() {
    const user = await RegisterModel.findOne({ email: this.body.email });
    if (!user) {
      this.errors.push('Usuário e/ou senha inválidos.');
    }
    return user;
  }

  checkHashedPassword(hash) {
    if (!bcrypt.compareSync(this.body.password, hash)) {
      this.errors.push('Usuário e/ou senha inválidos.');
    }
  }
}

module.exports = Login;
