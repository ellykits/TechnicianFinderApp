/*import firebase from "firebase"

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
//let app = firebase.initializeApp(config)
//let db = app.database()
*/
export default {
  methods: {
    setApiJsonPath(path) {
      let returnedReference = db.ref(path)
      return returnedReference
    },
    retrieveUsername(email) {
      //return email.substring(0, email.lastIndexOf('@')) + email.substring(email.indexOf("@") +1, email.substring(email.indexOf(".")))
      return email.replace(/\W/g, '')
    },
    validateEmail() {
      if ((this.$refs.email.value).lastIndexOf("@") != -1) {
        return true
      } else {
        return false
      }
    },
    goBack() {
      window.history.go(-1)
    },
    filterDataInList(searchModel, idOfUl) {
		alert("filtering...")
      let ul, li, i;
      searchModel.toUpperCase()
      ul = window.document.getElementById(idOfUl);
      li = ul.getElementsByTagName("li");
      for (i = 0; i < li.length; i++) {
        if (li[i].innerHTML.toUpperCase().indexOf(searchModel) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    }
  }
}
