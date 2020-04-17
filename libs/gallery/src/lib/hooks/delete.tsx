import * as firebase from 'firebase';

export const deleteFromFirebase = async(id: string) => {
    const storage = firebase.storage();
    const firestore = firebase.firestore();
    const data = await firestore.doc(`gallery/${id}`).get();
    const deleteBlob = storage.refFromURL(data.data().images.original).delete();
    const deleteMeta = firestore.doc(`gallery/${id}`).delete();

    return await Promise.all([deleteBlob, deleteMeta]);
}