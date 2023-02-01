# 1 Firebase-CDN
A CDN library for use with Firebase V9.

I had a hard time figuring out how to use firebase V9. I used the compat SDK, which was a temporary solution.
I knew, that at some time I had to use the regular SDK, but couldn't figure out how to use it. 
It could be that I was new to JavaScript and didn't understand the export, import and modules thing.
I want to use plain/vanilla JavaScript, so no framework like React, Vue, Angular or jQuery.
I felt like the documentation told how to drive the car, but did not tell the traffic regulations.
I spent like the 4 times 4 hours on trying to upgrade to the V9 SDK with no success.
The fifth time is is the charm. 

# 2 What does it do?
To put it simple, it makes it easier to use Firebase Auth and Firebase Firestore.

# 3 Modules
## 3.1 Auth

## 3.2 Firestore
### Getting a document
```getFirestoreData(path, document)
let data = getFirestoreData("users", "maki")
```
This modules takes to arguments. The "path", is where your document is located and "document" is the name of the document.
You get the output by asigning the function to a variable. Inside the variable you will get the data. 

# How to use
First find a JavaScript file you want to work on. It can be a existing one or you can create one. 
```script.js
import {getFirestoreData} from "https://maki2007.github.io/firebase-firestore-cdn.js"
```
You can replace "firebase-firestore-cdn.js" with "firebase-auth-cdn.js", if want to use Firebase Authentication instead. 
Inside {}, you choose the desired modules and seperate with "," if you want multiple.
It is important that your JavaScript is a module like
```index.html
<script src="/account.js" type="module"></script> 
```
