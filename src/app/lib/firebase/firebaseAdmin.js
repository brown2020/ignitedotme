// lib/firebaseAdmin.js
import admin from "firebase-admin";

if (!admin.apps.length) {
    // admin.initializeApp({
    //     credential: admin.credential.cert(serviceAccount),
    // });

    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
    });
}

export const db = admin.firestore();
export const auth = admin.auth();
