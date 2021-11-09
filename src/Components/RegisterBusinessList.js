import Component from '../lib/Component';
import Elements from '../lib/Elements';
import businesses from '../lib/Fetch';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

class RegisterBusinessComponent extends Component {
  constructor() {
    super({
      name: 'registerBusiness',
      model: {
        userType: 'business',
      },
      routerPath: '/registerbusiness',
    });
    this.businessesLoaded = false;
  }

  render() {
    const registerBusinessContainer = Elements.createDiv({
      id: 'business',
    });

    const heading = registerBusinessContainer.appendChild(
      Elements.createHeader({
        size: 2,
        textContent: 'kies Jouw zaak ',
      })
    );

    heading.classList.add('register__heading');

    registerBusinessContainer.appendChild(
      Elements.createDiv({
        id: 'businessList',
      })
    );

    setTimeout(
      () =>
        businesses.getBusinessList({
          location: 'businessList',
        }),
      10
    );

    const capacityDb = () => {
      firebase.auth().onAuthStateChanged(function (user) {
        const db = firebase.firestore();

        const data = {
          capacity: capacityForm.value,
          maxCapacity: capacityForm.value,
        };

        db.collection('businesses')
          .doc(user.uid)
          .update(data)
          .then(location.replace('/dashboard'));
      });
    };

    const capacityForm = registerBusinessContainer.appendChild(
      Elements.createInput({
        type: 'number',
        placeholder: 'capaciteit',
      })
    );

    registerBusinessContainer.appendChild(
      Elements.createButton({
        textContent: 'doorgaan',
        id: 'primary',
        onClick: () => capacityDb(),
      })
    );

    return registerBusinessContainer;
  }
}

export default RegisterBusinessComponent;
