//Auth
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"
window.auth = getAuth(app);

window.user

window.OnAuthChangedIn = ""
window.OnAuthChangedOut = ""
onAuthStateChanged(auth, (userx) => {
    sessionStorage.setItem("userdata", JSON.stringify(userx))
  if (userx) {
    let uid = userx.uid;
    window.user = userx

    console.log("Signed in: "+uid)
    if (OnAuthChangedIn) {
      window[OnAuthChangedIn]()
    }
  } else {
    console.log("No signed in user")
    
    if (OnAuthChangedOut) {
      window[OnAuthChangedOut]()
    }
  }
});

export async function signUp(email, password) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        window.user = userCredential;
        let uid = userCredential.user.uid;
        let email = userCredential.user.email;
        console.log("Created user as: "+email+" UID: "+uid, user);
        resolve(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error creating account:",errorMessage,errorCode);
        reject(error);
      });
  });
}


export function signIn(email, password){
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    window.user = userCredential.user;
    if (user.displayName){
      window.location.href = "/firm/firm.html"
    } else {
    window.location.href = "/find.html"
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    document.getElementById("signInError").innerText = errorMessage
    console.log("SignInError:", errorMessage, errorCode);
  });
}

export function signout(){
  signOut(auth).then(() => {
    console.log("Signed user out")
    window.location.href = "/index.html";
  }).catch((error) => {
    console.error(error)
  });
}

export async function deleteAccount() {
  const credential = promptForCredentials();
  var result = await user.reauthenticateWithCredential(credential);
  await result.user.delete();
}