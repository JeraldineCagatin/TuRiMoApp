// LOGIN USER
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then((user) => {
        if (user) {
            window.location = 'index.html';
            // document.getElementById('userName').innerHTML=user.email;
        }
    });
});
