import {initializeApp} from "firebase/app";
import {getFirestore, doc, setDoc, addDoc, collection, query, where} from "firebase/firestore";
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

    await setDoc(userDocRef, {...userData}, { merge: true });

    console.log("User document written with ID: ", userDocRef.id);
};

// create new chat
export const createNewChat = async (fromUserId, toUserId, content) =>  {
    // create new chat document in chats collection
    const chatsColRef = collection(db, "chats");

    const chatDocRef = await addDoc(chatsColRef, {
        usersIds: [fromUserId, toUserId]
    });

    console.log("Chat document written with ID: ", chatDocRef.id);

    const messageId = await createNewMessage(chatDocRef.id, fromUserId, toUserId, content);

    await setChatPreview(fromUserId, chatDocRef.id, messageId);
    await setChatPreview(toUserId, chatDocRef.id, messageId);
};

export const createNewMessage = async (chatId, fromUserId, toUserId, content) => {
    // create new message document in messages sub-collection
    const messagesColRef = collection(db, "chats", chatId, "messages");

    const messageDocRef = await addDoc(messagesColRef, {
        fromUserId,
        toUserId,
        content
    });

    console.log("Message document written with ID: ", messageDocRef.id);

    return messageDocRef.id;
};

// set chat preview - data param includes otherUserId, lastMessageContent, timestamp
export const setChatPreview = async (userId, chatId, messageId) => {
    const chatPreviewDocRef = doc(db, "users", userId, "chat-previews", chatId);

    await setDoc(chatPreviewDocRef, {messageId});

    console.log("Chat preview document written with ID: ", chatPreviewDocRef.id);
};