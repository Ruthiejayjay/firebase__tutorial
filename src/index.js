import { initializeApp } from '@firebase/app';
import { getFirestore, collection, getDocs, 
    addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyATioaDISQ2F7Zo6Dgdm6ChstTLDJUmL_U",
    authDomain: "fir-9-tutorial-e7c61.firebaseapp.com",
    projectId: "fir-9-tutorial-e7c61",
    storageBucket: "fir-9-tutorial-e7c61.appspot.com",
    messagingSenderId: "945066427193",
    appId: "1:945066427193:web:b8c529b895948c6e639ee8"
};

//init firebase app
initializeApp(firebaseConfig)

//init services
const db = getFirestore()

//colection ref
const colRef = collection(db, 'books')

// realtime collection data
    onSnapshot(colRef, (snapshot) => {
        let books = []
        snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id })
        })
        console.log(books)
    })

// adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value ,
        author: addBookForm.author.value,
    })
    .then(() => {
        addBookForm.reset()
    })
})

// deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const docRef = doc(db, 'books', deleteBookForm.id.value)
    deleteDoc(docRef)
    .then(() => {
        deleteBookForm.reset()
    })
})
