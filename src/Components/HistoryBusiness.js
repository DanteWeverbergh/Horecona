import Component from '../lib/Component';
import Elements from '../lib/Elements';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

class HistoryBusinessComponent extends Component {
  constructor() {
    super({
      name: 'historyBusinesss',
      model: {
        userType: 'business',
      },
      routerPath: 'dashboard/historybusiness',
    });
  }

  render() {
    const historyBusinessContainer = Elements.createDiv({
      classList: 'historyBusinessContainer',
    });

    historyBusinessContainer.appendChild(Elements.createBack());

    historyBusinessContainer.appendChild(
      Elements.createHeader({
        textContent: 'Historiek bezoekers',
        size: 2,
      })
    );

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const db = firebase.firestore();
        db.collection('businesses')
          .doc(user.uid)
          .get()
          .then((doc) => {
            const visitors = doc.data().visitors;

            console.log(visitors);
            visitors.forEach((element) => {
              historyBusinessContainer.appendChild(
                Elements.createText({
                  textContent: `- ${element}`,
                })
              );
            });
          });
      }
    });

    console.log('his bus');

    return historyBusinessContainer;
  }
}

export default HistoryBusinessComponent;
