import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

export default class Login {
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

      const blank = this.blankInput();
      const valid = this.validEntries();

      if (blank || !valid) return;

      this.form.submit();
    });
  }

  blankInput() {
    let blank = false;

    for (const errorText of this.form.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    for (const field of this.form.querySelectorAll('.form-control')) {
      const label = field.previousElementSibling.innerText;

      if (!field.value) {
        this.createErrorMessage(field, `Campo "${label}" precisa ser preenchido.`);
        blank = true;
      }
    }

    return blank;
  }

  validEntries() {
    let valid = true;
    const emailInput = this.form.querySelector('#email');
    const passwordInput = this.form.querySelector('#password');

    if (!emailInput.value || !passwordInput.value || !isEmail(emailInput.value) || !isStrongPassword(passwordInput.value)) {
      this.createErrorMessage(passwordInput, 'Favor conferir login e senha.');
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
