import Component from '../lib/Component';
import Elements from '../lib/Elements';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

class DashboardComponent extends Component {
  constructor() {
    super({
      name: 'dashboard',
      model: {
        // user inladen vanuit firebase
        user: null,
      },
      routerPath: '/dashboard',
    });
  }

  render() {
    // check if user => back to start page
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const db = firebase.firestore();
        const docRef = db.collection('users').doc(user.uid);

        docRef.get().then((doc) => {
          if (doc.exists) {
            if (doc.data().userType === 'client') {
              dashboardContainer.appendChild(
                Elements.createCard({
                  textContent: 'check-in',
                  id: 'navBtn',

                  onClick: () => location.replace('dashboard/checkin'),
                })
              );

              dashboardContainer.appendChild(
                Elements.createCard({
                  textContent: 'check-out',
                  id: 'navBtn',
                  onClick: () => location.replace('dashboard/checkout'),
                })
              );

              dashboardContainer.appendChild(
                Elements.createCard({
                  textContent: 'history',
                  id: 'navBtn',
                  onClick: () => location.replace('dashboard/history'),
                })
              );

              dashboardContainer.appendChild(
                Elements.createCard({
                  textContent: 'cafés',
                  id: 'navBtn',
                  onClick: () => location.replace('dashboard/cafes'),
                })
              );

              dashboardContainer.appendChild(
                Elements.createCard({
                  textContent: 'profiel',
                  id: 'navBtn',
                  onClick: () => location.replace('dashboard/profile'),
                })
              );
            } else {
              dashboardContainer.appendChild(
                Elements.createCard({
                  textContent: 'bezoekers',
                  id: 'navBtn',
                  onClick: () => location.replace('dashboard/visitors'),
                })
              );

              dashboardContainer.appendChild(
                Elements.createCard({
                  textContent: 'Historiek',
                  id: 'navBtn',
                  onClick: () => location.replace('dashboard/historybusiness'),
                })
              );

              dashboardContainer.appendChild(
                Elements.createCard({
                  textContent: 'Code',
                  id: 'navBtn',
                  onClick: () => location.replace('/qrcodecreator'),
                })
              );

              dashboardContainer.appendChild(
                Elements.createCard({
                  textContent: 'profiel',
                  id: 'navBtn',
                  onClick: () => location.replace('dashboard/profile'),
                })
              );

              dashboardContainer.appendChild(
                Elements.createCard({
                  textContent: 'uitloggen',
                  id: 'navBtn',
                  onClick: () => firebase.auth().signOut(),
                })
              );
            }
          }
        });
      } else {
        location.replace('/');
      }
    });

    //console.log(user);

    const dashboardContainer = Elements.createDiv({
      id: 'dashboardContainer',
      classList: 'dashboardContainer',
    });

    return dashboardContainer;
  }
}

export default DashboardComponent;
