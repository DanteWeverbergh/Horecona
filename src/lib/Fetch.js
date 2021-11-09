import Elements from './Elements';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import firebaseFunctions from './firebaseFunctions';

const businesses = {
  //alles horeca zaken binnenhalen uit de API
  async fetchBusinesses() {
    const data = await fetch(
      'https://data.stad.gent/api/records/1.0/search/?dataset=koop-lokaal-horeca&q=&rows=216&facet=postcode&facet=gemeente'
    );
    const jsonData = await data.json();

    return jsonData.records;
  },

  async unregisteredBusinessesList() {
    const unregisteredBusiness = [];
    const APIBusiness = await this.fetchBusinesses();
    const businessesFromFirebase = await firebaseFunctions.getCollection({
      col: 'businesses',
    });
    const registeredBusiness = [];
    businessesFromFirebase.forEach((business) => {
      registeredBusiness.push(business.recordId);
    });
    APIBusiness.forEach((element) => {
      if (!registeredBusiness.includes(element.recordId)) {
        unregisteredBusiness.push(element);
      }

      //unregisteredBusiness.push(element);
    });

    return unregisteredBusiness;
  },

  async getBusinessList({ location }) {
    const listData = await this.unregisteredBusinessesList();
    this.buildBusinessList(location, listData);
  },

  buildBusinessList(location, array) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const buildLocation = document.getElementById(location);
        while (buildLocation.firstChild) {
          buildLocation.removeChild(buildLocation.firstChild);
        }
        array.forEach((element) => {
          const registerBusiness = () => {
            const naam = element.fields.naam;
            const adres = element.fields.adres;
            const postcode = element.fields.postcode;
            const gemeente = element.fields.gemeente;
            const recordId = element.recordid;

            const docData = {
              zaaknaam: naam,
              adres: adres,
              postcode: postcode,
              gemeente: gemeente,
              recordId: recordId,
            };

            const db = firebase.firestore();

            return db
              .collection('users')
              .doc(user.uid)
              .update(docData)
              .then(console.log('succes'))
              .catch((e) => {
                console.log('error', e);
              });
          };

          const businessCollection = () => {
            const naam = element.fields.naam;
            const adres = element.fields.adres;
            const postcode = element.fields.postcode;
            const gemeente = element.fields.gemeente;
            const userId = user.uid;
            const userEmail = user.email;
            const recordId = element.recordid;

            const docData = {
              zaaknaam: naam,
              adres: adres,
              postcode: postcode,
              gemeente: gemeente,
              userId: userId,
              userEmail: userEmail,
              recordId: recordId,
            };

            const db = firebase.firestore();

            return db
              .collection('businesses')
              .doc(user.uid)
              .set(docData)
              .then(console.log('succes'))
              .catch((e) => {
                console.log('error', e);
              });
          };

          const dataToDatabase = () => {
            registerBusiness();
            businessCollection();
          };

          const restaurant = Elements.createRestaurantItem({
            onClick: () => dataToDatabase(),
            name: element.fields.naam,
            adres: `${element.fields.adres}, ${element.fields.postcode} ${element.fields.gemeente}`,
          });

          buildLocation.appendChild(restaurant);
        });
        console.log('user gevonden');
      } else {
        console.log('geen user gevonden');
      }
    });
  },
};

export default businesses;
