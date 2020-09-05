import * as firebase from 'firebase';

export const editRecord = async(item: any) => {
    const { id } = item;
    const firestore = firebase.firestore();
    return firestore.doc(`gallery/${id}`).update(item);
}