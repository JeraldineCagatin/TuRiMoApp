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
