import {initializeApp} from "firebase/app";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    onSnapshot,
    query,
    setDoc,
    where,
    updateDoc,
    arrayUnion
} from "firebase/firestore";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";

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

// create user doc - userData param includes displayName, email
export const createUserDoc = async (userData, userId) => {
    const userDocRef = doc(db, "users", userId);

    await setDoc(userDocRef, {...userData}, {merge: true});

    console.log("User document written with ID: ", userDocRef.id);
};

// create new chat
export const createChatDoc = async (fromUserId, toUserId) => {
    // get user details
    const fromUserDetails = await getUserFromUserId(fromUserId);
    const toUserDetails = await getUserFromUserId(toUserId);

    // create new chat document in chats collection
    const chatsColRef = collection(db, "chats");

    const chatDocRef = await addDoc(chatsColRef, {
        userIds: [fromUserId, toUserId],
        userDetails: [fromUserDetails, toUserDetails]
    });

    console.log("Chat document written with ID: ", chatDocRef.id);

    return chatDocRef.id;
};

// create new message
export const createNewMessage = async (chatId, fromUserId, toUserId, content) => {
    const chatDocRef = doc(db, "chats", chatId);

    const docSnap = await getDoc(chatDocRef);
    const messages = [];

    if (docSnap.exists()) {
        messages.push(...docSnap.data().messages);
    } else {
        console.log("No such document!");
    }

    messages.push({
        fromUserId,
        toUserId,
        content,
        read: false
    });

    console.log(messages)

    await updateDoc(chatDocRef, {messages: messages});
};

// read last message


// get all users
export const getAllUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const allUsers = [];

    querySnapshot.forEach((doc) => {
        allUsers.push({id: doc.id, ...doc.data()});
    });

    return allUsers;
};

export const getChatId = async (fromUserId, toUserId) => {
    const q = query(collection(db, "chats"),
        where("userIds", "in", [[fromUserId, toUserId], [toUserId, fromUserId]]));

    const querySnapshot = await getDocs(q);

    const foundChatId = [];

    querySnapshot.forEach((doc) => {
        foundChatId.push(doc.id);
    });

    if (!foundChatId.length) {
        return await createChatDoc(fromUserId, toUserId);
    } else {
        return foundChatId[0];
    }
};

// export const getAllChatsByUserId = async (userId) => {
//     const q = query(collection(db, "chats"), where("userIds", "array-contains", userId));
//     const querySnapshot = await getDocs(q);
//
//     const chats = [];
//
//     querySnapshot.forEach((doc) => {
//         chats.push({id: doc.id, ...doc.data()});
//     });
//
//     return chats;
// };

export const getUserFromUserId = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return ({id: docSnap.id, ...docSnap.data()});
    } else {
        console.log("No such document!");
    }
};

export const getChatFromChatId = async (chatId, userId) => {
    const docRef = doc(db, "chats", chatId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        const {userIds, userDetails} = data;
        const otherUserId = userIds[0] === userId ? userIds[1] : userIds[0];
        const otherUserDetails = userDetails.find(user => user.id === otherUserId);
        return ({id: docSnap.id, messages: data.messages, otherUserDetails});
    } else {
        console.log("No such document!");
    }
};

export const listenToAllUserChats = (userId, setter) => {
    const q = query(collection(db, "chats"), where("userIds", "array-contains", userId));

    return onSnapshot(q, (querySnapshot) => {
        const chats = [];

        querySnapshot.forEach((doc) => {
            const {userIds, userDetails} = doc.data();
            const otherUserId = userIds[0] === userId ? userIds[1] : userIds[0];
            const otherUserDetails = userDetails.find(user => user.id === otherUserId);
            chats.push({id: doc.id, messages: doc.data().messages, otherUserDetails});
        });

        setter(chats);
    });
};

export const listenToSpecificUserChat = (chatId, setter) => {
    return onSnapshot(doc(db, "chats", chatId), (doc) => {
        setter(doc.data().messages);
    });
};

