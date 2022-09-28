import isEmail from "validator/lib/isEmail";

export default class Contact {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    if (!this.form) return;
    this.events();
  }

  events() {
    this.form.addEventListener('submit', event => {
      event.preventDefault();

      if (!this.isValidInput()) return;

      this.form.submit();
    });
  }

  isValidInput() {
    let valid = true;
    const name = this.form.querySelector('#name');
    const email = this.form.querySelector('#email');
    const phone = this.form.querySelector('#phone');

    for (const errorText of this.form.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    if (!name.value) {
      this.createErrorMessage(name, `Campo "Nome" precisa ser preenchido.`);
      valid = false;
    }

    if (!email.value && !phone.value) {
      this.createErrorMessage(email, `O "Telefone" ou o "E-mail" deve ser preenchido.`);
      valid = false;
    }

    if (email.value && !isEmail(email.value)) {
      this.createErrorMessage(email, `E-mail inválido.`);
      valid = false;
    }

    return valid;
  }

  createErrorMessage(field, message) {
    const div = document.createElement('div');
    div.innerHTML = message;
    div.setAttribute('class', 'error-text');
    field.insertAdjacentElement('afterend', div);
  }
}
