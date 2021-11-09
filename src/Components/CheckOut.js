import Component from '../lib/Component';
import Elements from '../lib/Elements';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

class CheckOutComponent extends Component {
  constructor() {
    super({
      name: 'checkout',
      model: {
        checkedin: [],
      },
      routerPath: '/dashboard/checkout',
    });
  }

  render() {
    const checkoutContainer = Elements.createDiv({
      classList: 'checkoutContainer',
    });

    checkoutContainer.appendChild(Elements.createBack());

    const db = firebase.firestore();

    const userRef = db.collection('users');
    const busRef = db.collection('businesses');

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const userEmail = user.email;
        const userId = user.uid;

        const getActiveBusiness = async () => {
          let isActive = {};
          await userRef
            .doc(userId)
            .get()
            .then((doc) => {
              isActive = doc.data().isActive;
            });

          return isActive;
        };

        const getBusinessId = async () => {
          let docId = {};
          //activeBusiness
          const activeBusiness = await getActiveBusiness();

          const query = busRef.where('zaaknaam', '==', activeBusiness);

          await query.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              docId = doc.data().userId;
            });
          });

          return docId;
        };

        const deleteActiveUser = async () => {
          const docId = await getBusinessId();

          busRef
            .doc(docId)
            .update({
              capacity: firebase.firestore.FieldValue.increment(1),
              activeVisitors:
                firebase.firestore.FieldValue.arrayRemove(userEmail),
            })
            .then(() => alert('Checout compleet, u kan nu uitloggen'));
        };

        const checkout = () => {
          deleteActiveUser();
        };

        checkoutContainer.appendChild(
          Elements.createButton({
            textContent: 'Checkout',
            id: 'primary',
            className: 'checkoutContainer__button',
            onClick: () => checkout(),
          })
        );

        const form = checkoutContainer.appendChild(
          document.createElement('form')
        );
        form.classList = 'checkoutContainer__form';

        const sfeerForm = form.appendChild(
          Elements.createRatingInput({
            placeholder: 'Sfeer 1-5',
          })
        );

        const drukteForm = form.appendChild(
          Elements.createRatingInput({
            placeholder: 'Drukte 1-5',
          })
        );

        const ratingForm = form.appendChild(
          Elements.createRatingInput({
            placeholder: 'Rating 1-5',
          })
        );

        const resetIsActive = async () => {
          return userRef.doc(userId).update({
            isActive: false,
          });
        };

        const localStorage = () => {
          const ratingData = {
            sfeer: `${sfeerForm.value}/5`,
            drukte: `${drukteForm.value}/5`,
            rating: `${ratingForm.value}/5`,
          };

          return window.localStorage.setItem(
            'rating',
            JSON.stringify(ratingData)
          );
        };

        const logout = () => {
          firebase.auth().signOut();
        };

        const functions = async () => {
          await resetIsActive();

          localStorage();
          logout();

          setTimeout(() => {
            location.replace('/');
          }, 500);
        };

        checkoutContainer.appendChild(
          Elements.createButton({
            textContent: 'Uitloggen',
            id: 'primary',
            className: 'checkoutContainer__button',
            onClick: () => functions(),
          })
        );
      }
    });

    return checkoutContainer;
  }
}

export default CheckOutComponent;
