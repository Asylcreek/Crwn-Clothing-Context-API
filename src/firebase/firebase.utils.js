import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyBRM7kH_td48BV2AvEDn7gGX0A15gKB6K8",
    authDomain: "crwn-store-66270.firebaseapp.com",
    databaseURL: "https://crwn-store-66270.firebaseio.com",
    projectId: "crwn-store-66270",
    storageBucket: "crwn-store-66270.appspot.com",
    messagingSenderId: "970170588718",
    appId: "1:970170588718:web:8fd38923df3316f64949bf",
    measurementId: "G-WP3K5GCTB0",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
        } catch (error) {
            console.log("error creating user", error.message);
        }
    }

    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;