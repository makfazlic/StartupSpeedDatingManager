import firebase_app from "./config.js";
import { getFirestore, doc, addDoc, collection } from "firebase/firestore";

const db = getFirestore(firebase_app)

export default async function addData(data) {
    try {
        console.log(data)
        const docRef = await addDoc(
            collection(db, "forms"), 
            data
        );
        console.log("Document written with id:", docRef.id)
    } catch (error) {
        console.log("Error adding document", error)
    }

}