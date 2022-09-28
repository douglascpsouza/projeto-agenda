// Imports
import './assets/css/style.css';
import Contact from './assets/modules/Contact';
import Login from './assets/modules/Login';
import Register from './assets/modules/Register';

const login = new Login('.login-form');
const register = new Register('.register-form');
const contact = new Contact('.contact-form');

login.init();
register.init();
contact.init();
