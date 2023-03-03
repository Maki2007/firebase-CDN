//Auth
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"
window.auth = getAuth(app);

window.user

onAuthStateChanged(auth, (userx) => {
    sessionStorage.setItem("userdata", JSON.stringify(userx))
  if (userx) {
    let uid = userx.uid;
    user = userx
    document.getElementById("accountNav").innerHTML = '<button id="signOutBTN" onclick="signout()">Log ud</button>'
    console.log("Signed in: "+uid)
  } else {
    document.getElementById("accountNav").innerHTML = '<button id="signInBTN" onclick="toSignIn()">Log ind</button>'
    console.log("No signed in user")
  }
});

export async function signUp(email, password) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        let user = userCredential;
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
    user = userCredential.user;
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
  var result = await user.reauthenticateWithCredential(credential);
  await result.user.delete();
}