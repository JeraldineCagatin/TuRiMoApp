// signout user
const signOut = document.querySelector('#signout');
signout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    window.location = 'register.html';

});