import Firebase from "firebase"
export default function(){    
//Initializing firebase
let config = {
  apiKey: "AIzaSyB6ZxzZLhM-iRyVVCNm015S30rqtYE1s8Y",
  authDomain: "techyguide-d64a7.firebaseapp.com",
  databaseURL: "https://techyguide-d64a7.firebaseio.com",
  projectId: "techyguide-d64a7",
  storageBucket: "techyguide-d64a7.appspot.com",
  messagingSenderId: "898141155673"
}
//Connecting to firebase and get the reference for the users and services objects
let app = Firebase.initializeApp(config)
let db = app.database()

function setApiJsonPath(path){
  let returnedReference = db.ref(path)
  return returnedReference
}
let usersRef = setApiJsonPath("users")
}
