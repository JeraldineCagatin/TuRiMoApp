// REGISTER NEW USER
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = signupForm['firstName'].value;
    const lastName = signupForm['lastName'].value;
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password).then((user) => {
        if (user) {
            var newUser = firebase.auth().currentUser;

            newUser.updateProfile({
                displayName: firstName + ' ' + lastName,
                photoURL: "https://static.vecteezy.com/system/resources/thumbnails/000/364/628/original/Chef_Avatar_Illustration-03.jpg"
                    // db.collection('users').add({})
            }).then(function() {
                window.location = 'index.html';
            }).catch(function(error) {
                console.log(error);
            });

        } else {
            console.log('Invalid User');
        }
    });
});