// app/utils/checkAdminStatus.js
"use server";
import { auth } from "../firebase/firebaseAdmin";
import admin from "firebase-admin";

export async function checkAdminStatus(token) {
    try {
        // Verify the Firebase token to get the user ID
        const decodedToken = await auth.verifyIdToken(token);
        const uid = decodedToken.uid;


        // Retrieve the document
        const docRef = admin.firestore().collection("site_info").doc("credentials");
        const doc = await docRef.get();

        // Check if the document exists and contains the admin_uids array
        if (!doc.exists || !doc.data().admin_uids) {
            throw new Error("Admin credentials document or admin_uids field not found.");
        }

        const adminUids = doc.data().admin_uids;

        // Check if the UID is in the admin_uids array
        if (adminUids.includes(uid)) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error checking admin status:", error);
        throw new Error("An error occurred while checking admin status: " + error.message);

    }
}


/* this function will be used in future when its needed
export async function setAdminStatus(uid, setAdmin) {
    try {
        if (!uid) {
            throw new Error("User ID is required");
        }

        const db = admin.firestore();
        const siteInfoRef = db.collection("site_info").doc("credentials");
        const userRef = db.collection("users").doc(uid);

        if (setAdmin) {
            // Set "admin" custom claim to true
            await admin.auth().setCustomUserClaims(uid, { admin: true });

            // Add user ID to `admin_uids` array in Firestore
            await siteInfoRef.update({
                admin_uids: admin.firestore.FieldValue.arrayUnion(uid),
            });

            // Set `is_admin` field to true in the user's document
            await userRef.set({ is_admin: true }, { merge: true });

            return { message: `User ${uid} is now an admin.` };
        } else {
            // Remove "admin" custom claim by setting it to null
            await admin.auth().setCustomUserClaims(uid, { admin: null });

            // Remove user ID from `admin_uids` array in Firestore
            await siteInfoRef.update({
                admin_uids: admin.firestore.FieldValue.arrayRemove(uid),
            });

            // Set `is_admin` field to false in the user's document
            await userRef.set({ is_admin: false }, { merge: true });

            return { message: `User ${uid} is no longer an admin.` };
        }
    } catch (error) {
        console.error("Error updating admin status:", error);
        return { error: "Failed to update admin status." };
    }
}
*/