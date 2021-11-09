import Component from '../lib/Component';
import Elements from '../lib/Elements';
import firebase from 'firebase/app';
import 'firebase/auth';
// async functions
import 'regenerator-runtime/runtime';

class RegisterClientComponent extends Component {
  constructor() {
    super({
      name: 'registerKlant',
      model: {
        userType: 'client',
      },
      routerPath: '/register',
    });
  }

  klant() {
    this.model.userType = 'client';
  }

  zaak() {
    this.model.userType = 'business';
  }

  render() {
    const { userType } = this.model;

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        location.replace('/dashboard');
      } else {
        const register = async (e) => {
          const auth = firebase.auth();

          const email = emailForm.value;
          const password = passwordForm.value;

          try {
            await auth.createUserWithEmailAndPassword(email, password);
            location.replace('/registerclientinfo');
          } catch (e) {
            alert('Er is een fout opgetreden, probeer opnieuw');
            console.log(e);
          }
        };

        registerDiv.appendChild(
          Elements.createButton({
            textContent: 'Registreren',
            id: 'primary',
            onClick: () => register(),
          })
        );

        registerClient.appendChild(registerDiv);

        const linkDiv = registerClient.appendChild(
          Elements.createDiv({
            id: 'link',
          })
        );

        linkDiv.appendChild(
          Elements.createLink({
            textContent: 'Ik heb al een account, inloggen',
            href: '/login',
          })
        );
      }
    });

    const registerClient = Elements.createDiv({ id: 'register' });

    const registerDiv = Elements.createDiv({ id: 'loginBtn' });

    const registerForm = document.createElement('form');
    registerForm.classList.add('loginForm');

    registerClient.append(registerForm);

    const emailForm = Elements.createInput({
      placeholder: 'Email',
      type: 'email',
      id: 'emailForm',
    });

    registerForm.appendChild(emailForm);

    const passwordForm = Elements.createInput({
      placeholder: 'Wachtwoord',

      type: 'password',
      id: 'passwordForm',
    });

    registerForm.appendChild(passwordForm);

    return registerClient;
  }
}

export default RegisterClientComponent;
