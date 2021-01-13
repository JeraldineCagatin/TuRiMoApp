// REGISTER NEW USER
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password).then((user) => {
        if (user) {
        
            window.location('index.html');
            document.getElementById('userName').innerHTML=user.email;


        }
        else {
            console.log('NO USER');
        }
    });
});

// LOGIN USER
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then((user) => {
        if (user) {
            console.log(user);
        }
    });
});

// GOOGLE LOGIN
const googleSignIn = document.querySelector('#googleSignIn')
googleSignIn.addEventListener('click', (e) => {
    var provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
});

// FACEBOOK LOGIN
const facebookSignIn = document.querySelector('#facebookSignIn')
facebookSignIn.addEventListener('click', (e) => {
    var provider = new firebase.auth.FacebookAuthProvider();

    auth.signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
            var user = result.user;
            var accessToken = credential.accessToken;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
});

// setup guides
const loggedOutlinks = document.querySelectorAll('.logged-out');
const loggedInlinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
    if (user) {
        //toggle UI elements
        loggedInlinks.forEach(item => item.style.display = 'block');
        loggedOutlinks.forEach(item => item.style.display = 'none');
    }

    else {
        //toggle UI elements

        loggedInlinks.forEach(item => item.style.display = 'none');
        loggedOutlinks.forEach(item => item.style.display = 'block');
    }
};

// Get the currently signed-in user
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log(user);
        setupUI(user);
    } else {
        console.log('no user logged in');
        setupUI();
    }
});

// signout user
const signOut = document.querySelector('#signout');
signout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

