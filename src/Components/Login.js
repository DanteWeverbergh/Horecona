import Component from '../lib/Component';
import Elements from '../lib/Elements';
import firebase from 'firebase/app';
import 'firebase/auth';
// async functions
import 'regenerator-runtime/runtime';

class LoginComponent extends Component {
  constructor() {
    super({
      name: 'login',
      model: {
        user: null,
      },
      routerPath: '/login',
    });
  }

  render() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        location.replace('/dashboard');
      } else {
        console.log('login');
      }
    });

    const signIn = () => {
      const auth = firebase.auth();

      const email = emailForm.value;
      const password = passwordForm.value;

      auth
        .signInWithEmailAndPassword(email, password)
        .then((cred) => {
          console.log(cred.user);
        })
        .catch((error) => {
          alert(`error: ${error.message}`);
        });
    };

    const loginWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    };

    const loginContainer = Elements.createDiv({ id: 'login' });

    const loginDiv = Elements.createDiv({ id: 'loginBtn' });

    const loginForm = loginContainer.appendChild(
      document.createElement('form')
    );

    loginForm.classList.add('loginForm');

    const emailForm = Elements.createInput({
      placeholder: 'Email',
      type: 'email',
      id: 'emailForm',
    });

    loginForm.appendChild(emailForm);

    const passwordForm = Elements.createInput({
      placeholder: 'Wachtwoord',

      type: 'password',
      id: 'passwordForm',
    });

    loginForm.appendChild(passwordForm);

    loginDiv.appendChild(
      Elements.createButton({
        textContent: 'Inloggen',
        id: 'primary',
        onClick: () => signIn(),
      })
    );

    loginContainer.appendChild(loginDiv);

    const googleDiv = Elements.createDiv({ id: 'google' });

    loginContainer.appendChild(googleDiv);

    googleDiv.appendChild(
      Elements.createButton({
        textContent: 'Login met google',
        id: 'primary',
        onClick: () => loginWithGoogle(),
      })
    );

    const linkDiv = loginContainer.appendChild(
      Elements.createDiv({
        id: 'link',
      })
    );

    linkDiv.appendChild(
      Elements.createLink({
        textContent: 'Ik heb nog geen account, registreren',
        href: '/register',
      })
    );

    return loginContainer;
  }
}

export default LoginComponent;
