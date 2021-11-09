import Component from '../lib/Component';
import Elements from '../lib/Elements';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

class VisitorComponent extends Component {
  constructor() {
    super({
      name: 'visitors',
      model: {
        business: [],
      },
      routerPath: '/dashboard/visitors',
    });
  }

  render() {
    const { business } = this.model;

    const visitorContainer = Elements.createDiv({});
    visitorContainer.classList.add('visitorContainer');
    visitorContainer.appendChild(Elements.createBack());

    const header = visitorContainer.appendChild(
      Elements.createHeader({
        textContent: 'Huidige bezoekers',
        size: 2,
      })
    );
    header.classList.add('visitorContainer__header');

    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const visitorsRef = db
          .collection('businesses')
          .doc(user.uid)
          .get()
          .then((doc) => {
            const visitors = doc.data().activeVisitors;

            visitors.forEach((vis) => {
              visitorContainer.appendChild(
                Elements.createText({
                  className: 'visitorContainer__visitorItem',
                  textContent: `- ${vis}`,
                })
              );
            });
          });
      }
    });

    return visitorContainer;
  }
}

export default VisitorComponent;
