//Firestore
import { getFirestore, doc, getDoc, setDoc, deleteDoc, updateDoc, collection, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"
const db = getFirestore(app)

export async function getFirestoreData(path, document){
  const docRef = doc(db, path, document);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data()

  if (docSnap.exists()) {
    data.id = document
    console.log("Data /"+path+"/"+document+":", data);
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document at /"+path+"/"+document);
  }
  return data
}

export async function getCollectionFirestoreData(path){
  let currentData = {}
  let data = []
  const querySnapshot = await getDocs(collection(db, path));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    currentData = doc.data()
    currentData.id = doc.id
    data.push(currentData)
  });
  console.log("Data - Collection /"+path, data);
  return data
}

export async function setFirestoreData(path, document, data){
    if (document == "01RANDOM01"){
        //Random Id
        const docRef = doc(collection(db, path));
        await setDoc(docRef, data);
        console.log("Document written at: /",path +"/"+ docRef.id);
        return docRef
    } else {
        //Custom Id
        const docRef = doc(collection(db, path), document);
        await setDoc(docRef, data);
        console.log("Document written at: /",path +"/"+ document);
        return docRef
    }
}

export async function updateFirestoreData(path, document, data){
  const docRef = doc(db, path, document);
  await updateDoc(docRef, data)
  console.log("Document updated /"+path+"/"+document+":", data);
  return true
}

export async function deleteFirestoreData(path, document){
  console.log("Delete /"+path+"/"+document);
  await deleteDoc(doc(db, path, document));
}

let snapshot = {}
export async function createSnapshot(path, document, name){
  snapshot[name] = onSnapshot(doc(db, path, document), (doc) => {
    console.log("Data updated /"+path+"/"+document);
  });
}
export async function deleteSnapshot(name){
  snapshot[name]()
}