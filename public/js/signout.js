const signOut = document.querySelector('#signout');
signOut.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    location.reload();
});