/**
 * Get user data from firestore
 */
import firebase from 'firebase/app';
import 'firebase/firestore';
// async functions
import 'regenerator-runtime/runtime';

const userDetails = {
  getAll: async () => {
    //firestore
    const db = firebase.firestore();

    const query = db.collection('users');

    const querySnapshot = await query.get();

    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  },

  getById: async () => {
    const db = firebase.firestore();

    const user = await (await db.collection('users').doc(id).get()).data();

    return user;
  },
};

export default userDetails;
