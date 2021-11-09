import Component from '../lib/Component';
import Elements from '../lib/Elements';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

class RegisterClientInfoComponent extends Component {
  constructor() {
    super({
      name: 'registerinfo',
      model: {
        userType: 'client',
      },
      routerPath: '/registerclientinfo',
    });
  }

  render() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const register = () => {
          const docData = {
            firstName: firstNameForm.value,
            surName: surNameForm.value,
            phone: phoneForm.value,
            birth: dateForm.value,
            id: user.uid,
            email: user.email,
            userType: 'client',
          };

          const db = firebase.firestore();

          db.collection('users')
            .doc(user.uid)
            .set(docData)
            .then(() => location.replace('/dashboard'));
        };

        registerClientInfo.appendChild(
          Elements.createButton({
            textContent: 'registreer',
            id: 'primary',
            onClick: () => register(),
          })
        );
      } else {
        console.log('geen user');
      }
    });

    const registerClientInfo = Elements.createDiv({
      id: 'registerinfo',
    });

    const registerForm = document.createElement('form');
    registerForm.classList.add('loginForm');

    registerClientInfo.appendChild(registerForm);

    const firstNameForm = registerForm.appendChild(
      Elements.createInput({
        placeholder: 'Voornaam',
        type: 'text',
        id: 'firstName',
      })
    );

    const surNameForm = registerForm.appendChild(
      Elements.createInput({
        placeholder: 'Achternaam',
        type: 'text',
        id: 'surName',
      })
    );

    const phoneForm = registerForm.appendChild(
      Elements.createInput({
        placeholder: 'telefoon',
        type: 'phone',
        id: 'phone',
      })
    );

    const dateForm = registerForm.appendChild(
      Elements.createInput({
        placeholder: 'Geboortejaar',
        type: 'date',
        id: 'birth',
      })
    );

    /*
    registerClientInfo.appendChild(
      Elements.createButton({
        textContent: 'test',
        id: 'primary',
        onClick: () => register(),
      })
    );
    */

    return registerClientInfo;
  }
}

export default RegisterClientInfoComponent;
