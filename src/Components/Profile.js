/**
 * profiel component
 */

import Component from '../lib/Component';
import Elements from '../lib/Elements';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

class ProfileComponent extends Component {
  constructor() {
    super({
      name: 'profile',
      model: {
        userType: 'client',
      },
      routerPath: '/dashboard/profile',
    });
  }

  render() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        if (!user.displayName) {
          console.log('geen displayname');
        } else {
          const displayName = user.displayName;

          profileContainer.appendChild(
            Elements.createInput({
              value: displayName,
              type: 'text',
            })
          );
        }

        const db = firebase.firestore();
        const docRef = db.collection('users').doc(user.uid);

        docRef.get().then((doc) => {
          if (doc.exists) {
            const update = () => {
              const updatedData = {
                firstName: firstNameForm.value,
                surName: surNameForm.value,
                phone: phoneForm.value,
              };

              const updateRef = db.collection('users').doc(user.uid);

              return updateRef
                .update(updatedData)
                .then(() => {
                  alert('Uw wijzigingen zijn opgeslagen');
                })
                .catch((e) => {
                  location.replace('/dashboard');
                });
            };

            const firstNameForm = profileUpdateForm.appendChild(
              Elements.createInput({
                type: 'text',
                id: 'firstname',
                value: doc.data().firstName,
              })
            );

            const surNameForm = profileUpdateForm.appendChild(
              Elements.createInput({
                type: 'text',
                id: 'surName',
                value: doc.data().surName,
              })
            );

            const phoneForm = profileUpdateForm.appendChild(
              Elements.createInput({
                type: 'phone',
                value: doc.data().phone,
              })
            );

            profileContainer.appendChild(
              Elements.createButton({
                textContent: 'update',
                id: 'primary',
                onClick: () => update(),
              })
            );
          } else {
            console.log('no doc found');
          }
        });

        const profileUpdateForm = document.createElement('form');
        profileUpdateForm.classList.add('loginForm');
        profileContainer.appendChild(profileUpdateForm);
      } else {
        location.replace('/');
      }
    });

    const profileContainer = Elements.createDiv({
      id: 'profile',
    });

    profileContainer.appendChild(Elements.createBack());

    return profileContainer;
  }
}

export default ProfileComponent;
