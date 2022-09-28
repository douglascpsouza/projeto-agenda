import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

export default class Register {
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

    for (const errorText of this.form.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    for (const field of this.form.querySelectorAll('.form-control')) {
      const label = field.previousElementSibling.innerText;

      if (!field.value) {
        this.createErrorMessage(field, `Campo "${label}" precisa ser preenchido.`);
        valid = false;
      }

      // Check when there is input value
      if (field.id === 'email' && field.value && !isEmail(field.value)) {
        this.createErrorMessage(field, 'E-mail inválido.');
        valid = false;
      }

      // Check when there is valid email
      if (field.id === 'confirmation' && field.value && isEmail(field.value)) {
        if (!this.confirmEmail()) {
          this.createErrorMessage(field, 'A confirmação do e-mail não confere.');
          valid = false;
        }
      }

      // Check when there is input value
      if (field.id === 'password' && field.value && !isStrongPassword(field.value)) {
        this.createErrorMessage(field, 'Senha não cumpre os requisitos de segurança.');
        valid = false;
      }
    }

    return valid;
  }

  confirmEmail() {
    const emailField = this.form.querySelector('#email');
    const confirmationField = this.form.querySelector('#confirmation');
    return emailField.value === confirmationField.value;
  }

  createErrorMessage(field, message) {
    const div = document.createElement('div');
    div.innerHTML = message;
    div.setAttribute('class', 'error-text');
    field.insertAdjacentElement('afterend', div);
  }
}
