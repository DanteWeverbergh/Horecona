/**
 * Check in
 */
import Component from '../lib/Component';
import Elements from '../lib/Elements';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

class CheckinComponent extends Component {
  constructor() {
    super({
      name: 'checkin',
      model: {
        user: null,
      },
      routerPath: 'dashboard/checkin',
    });
  }

  render() {
    const db = firebase.firestore();

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        db.collection('users')
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (!doc.data().isActive == false) {
              checkinContainer.appendChild(
                Elements.createHeader({
                  textContent: `U bent ingecheked in: `,
                  size: 2,
                })
              );
              checkinContainer.appendChild(
                Elements.createHeader({
                  textContent: doc.data().isActive,
                  size: 2,
                })
              );
            } else {
              console.log('niet ingecheked');
              // wanneer de gebruiker nog niet is ingecheked
              const checkin = ({ zaaknaam, id }) => {
                firebase.auth().onAuthStateChanged(function (user) {
                  if (user) {
                    db.collection('users').doc(user.uid).update({
                      isActive: zaaknaam,
                    });

                    db.collection('users')
                      .doc(user.uid)
                      .get()
                      .then((doc) => {
                        const visitedRef = db.collection('users').doc(user.uid);

                        visitedRef.update({
                          visited:
                            firebase.firestore.FieldValue.arrayUnion(zaaknaam),
                        });

                        const businessesRef = db
                          .collection('businesses')
                          .doc(id);

                        businessesRef.update({
                          capacity: firebase.firestore.FieldValue.increment(-1),
                        });

                        businessesRef.update({
                          visitors: firebase.firestore.FieldValue.arrayUnion(
                            user.email
                          ),
                          activeVisitors:
                            firebase.firestore.FieldValue.arrayUnion(
                              user.email
                            ),
                        });
                      })
                      .then(() => alert(`U bent ingecheked in: ${zaaknaam}`));
                  }
                });
              };

              db.collection('businesses')
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    const name = doc.data().zaaknaam;
                    const checkincode = doc.data().checkinCode;
                    const id = doc.data().userId;

                    const restaurantcard = checkinContainer.appendChild(
                      Elements.createRestaurantItem({
                        onClick: () =>
                          checkin({
                            zaaknaam: name,
                            id: id,
                          }),
                        name: name,
                        adres: checkincode,
                      })
                    );

                    restaurantcard.classList =
                      'checkinContainer__restaurantCard';
                  });
                });
            }
          });
      }
    });

    const checkinContainer = Elements.createDiv({
      id: 'checkin',
      classList: 'checkinContainer',
    });

    checkinContainer.appendChild(Elements.createBack());

    return checkinContainer;
  }
}

export default CheckinComponent;
