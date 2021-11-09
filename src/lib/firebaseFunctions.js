import Component from './Component';
import Elements from './Elements';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseFunctions = {
  async getCollection({ col }) {
    const array = [];
    await firebase
      .firestore()
      .collection(col)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => array.push(doc.data()));
      });

    return array;
  },

  async getDoc({ d }) {
    let document = {};
    await firebase
      .firestore()
      .doc(d)
      .get.then((doc) => {
        document = doc.data();
      });
    return document;
  },
};

export default firebaseFunctions;
