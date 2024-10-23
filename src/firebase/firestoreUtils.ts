import { db, storage } from '@/firebase/firebase';
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    FirestoreError,
    getDoc,
} from 'firebase/firestore';
import { deleteObject, listAll, ref } from 'firebase/storage';

type FieldValue = string | number | boolean | Date | null | string[] | { [key: string]: FieldValue };

export interface DocumentData {
    [key: string]: FieldValue;
}

export const fetchDocuments = async (collectionName: string) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as DocumentData[];
    } catch (error) {
        const firestoreError = error as FirestoreError;
        console.error("Error fetching documents: ", firestoreError.message);
        throw error;
    }
};

export const addDocument = async (collectionName: string, data: DocumentData) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        return docRef.id;
    } catch (error) {
        const firestoreError = error as FirestoreError;
        console.error("Error adding document: ", firestoreError.message);
        throw error;
    }
};

export const updateDocument = async (collectionName: string, docId: string, data: DocumentData) => {
    try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, data);
        return true;
    } catch (error) {
        const firestoreError = error as FirestoreError;
        console.error("Error updating document: ", firestoreError.message);
        throw error;
    }
};

export const deleteDocument = async (collectionName: string, docId: string) => {
    try {
        const docRef = doc(db, collectionName, docId);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        const firestoreError = error as FirestoreError;
        console.error("Error deleting document: ", firestoreError.message);
        throw error;
    }
};

export const deleteImageFromStorage = async (path: string) => {
    const folderRef = ref(storage, path);

    try {
        const result = await listAll(folderRef);

        const deletePromises = result.items.map((fileRef) => deleteObject(fileRef));
        await Promise.all(deletePromises);
    } catch (error) {
        console.error("Error deleting folder contents:", error);
    }
};

export const getDocumentById = async (collectionName: string, docId: string) => {
    try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data(),
            } as DocumentData;
        } else {
            console.error("No such document!");
            return null;
        }
    } catch (error) {
        const firestoreError = error as FirestoreError;
        console.error("Error getting document: ", firestoreError.message);
        throw error;
    }
};