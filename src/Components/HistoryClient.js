import Component from '../lib/Component';
import Elements from '../lib/Elements';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

class HistoryClientComponent extends Component {
  constructor() {
    super({
      name: 'history',
      model: {
        userType: 'client',
      },
      routerPath: 'dashboard/history',
    });
  }

  render() {
    const historyContainer = Elements.createDiv({
      classList: 'historyContainer',
    });

    //db
    const db = firebase.firestore();

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        db.collection('users')
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.data().isActive) {
              // console.log(doc.data().visited);
              console.log(doc.data().isActive);
              historyContainer.appendChild(
                Elements.createHeader({
                  textContent: 'je bent momenteel in:',
                  size: 3,
                })
              );

              historyContainer.appendChild(
                Elements.createHeader({
                  textContent: doc.data().isActive,
                  size: 3,
                  classList: 'historyContainer__active__item',
                })
              );
            } else {
              historyContainer.appendChild(
                Elements.createHeader({
                  textContent: 'Je bent momenteel nergens ingechecked.',
                  size: 3,
                  classList: 'historyContainer__visitedList__header',
                })
              );
            }

            historyContainer.appendChild(
              Elements.createHeader({
                textContent: 'Je bent al geweest in:',
                size: 3,
                classList: 'historyContainer__visitedList__listHeader',
              })
            );

            const visitedBusinesses = doc.data().visited;

            const visitedDiv = historyContainer.appendChild(
              Elements.createDiv({
                classList: 'historyContainer__visitedList',
              })
            );

            visitedBusinesses.forEach((bus) => {
              visitedDiv.appendChild(
                Elements.createHeader({
                  textContent: bus,
                  size: 3,
                  classList: 'historyContainer__visitedList__item',
                })
              );
            });
          });
      }
    });

    historyContainer.appendChild(Elements.createBack());

    return historyContainer;
  }
}

export default HistoryClientComponent;
