// REGISTER NEW USER
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password).then((user) => {
        if (user) {
            window.location = 'index.html';
            document.getElementById('userName').innerHTML=user.email;
        }
        else {
            console.log('NO USER');
        }
    });
});