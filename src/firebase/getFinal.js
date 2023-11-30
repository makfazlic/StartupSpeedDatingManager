import firebase_app from "./config.js";
import { getFirestore, doc, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app)

export default async function getFinal() {
    try {
        const querySnapshot = await getDocs(collection(db, "final"));
        const list = {}
        querySnapshot.forEach((doc) => {
            list[doc.id] = doc.data() 
        });
        return list
    } catch (error) {
        return undefined
    }
}