
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config'
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);
function App() {
  let fbProvider = new firebase.auth.FacebookAuthProvider();
  let provider = new firebase.auth.GoogleAuthProvider();
  let githubProvider = new firebase.auth.GithubAuthProvider();

   const [user,setUser] = useState({})
  const googleHandler=()=>{
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      const credential = result.credential;
      const token = credential.accessToken;
      const user = result.user;
      setUser(user)
      console.log(result.user)

    
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
       console.log(errorCode,errorMessage)
    });
  
  }
  const facebookHandler=()=>{
    firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      var credential = result.credential;
      var user = result.user;
      var accessToken = credential.accessToken;
      setUser(user)
      console.log('facebook',user)
      console.log(result.user)

    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message 
      var email = error.email;
      var credential = error.credential;
      console.log(errorCode,errorMessage)
    });
  }

  const gitHubHandler =()=>{
    firebase
    .auth()
    .signInWithPopup(githubProvider)
    .then((result) => {
      var credential = result.credential
      var token = credential.accessToken;
      var user = result.user;
      
      setUser(user)
      console.log('github',user)
     // console.log(result.user)
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log('error',errorCode,errorMessage,email,credential)
    });
  }
  /* 
      if(!firebase.app.length) {
        firebase.initializeApp({});
      }else{
        firebase.app();
      }
  */
  return (
    <div className="App">
     <button onClick={googleHandler}>SignIn Goggle</button>
     <button onClick={facebookHandler}>faceBook login</button>
     <button onClick={gitHubHandler}>Github login</button>
     <button>twitter Login</button>
  {/*    <h1>Name:-{user.displayName}</h1>
     <h2>email:-{user.email}</h2>
     <h3>photo</h3>
     <img src={user.photoURL}></img> */}
     <hr></hr>
     <h1>Name:-{user.displayName}</h1>
     <h2>email:-{user.email}</h2>
     <h3>photo</h3>
     <img src={user.photoURL}></img>
    </div>
  );
}

export default App;
