import {initializeApp} from "firebase/app";
import {getFirestore, doc, setDoc, collection, query, where} from "firebase/firestore";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "chat-app-7c7f8.firebaseapp.com",
    projectId: "chat-app-7c7f8",
    storageBucket: "chat-app-7c7f8.appspot.com",
    messagingSenderId: "254957839396",
    appId: "1:254957839396:web:830fd2011866150c07e4b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

// sign in functions
export const signInWithGooglePopup = async () => {
    const result = await signInWithPopup(auth, provider);
    const credential = await GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    return result.user;
};

// sign out function
export const signOutUser = async () => {
    await signOut(auth);
};

// create user doc - userData param includes displayName, email, photoUrl
export const createUserDoc = async (userData, userId) => {
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, {...userData});

    console.log("User document written with ID: ", userDocRef.id);
};

// create/update chat preview - data param includes chatId, otherUserId, lastMessageContent, timestamp
export const createOrUpdateChatPreview = async (data, userId) => {
    const chatPreviewDocRef = doc(db, "users", userId, "chats", data.chatId);

};