// REGISTER NEW USER

let photoDownURL = '';

var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('photo');
fileButton.addEventListener('change', (e) => {
    e.preventDefault();
    var file = e.target.files[0];
    var storageRef = storage.ref('userProfile/' + file.name);
    var task = storageRef.put(file);
    task.on('state_changed', function progress(snapshot) {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.style.width = percentage + '%';
    }, (error) => {
        console.error(error);

    }, () => {
        task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL);
            photoDownURL = downloadURL;
        });
    });
});

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
                photoURL: photoDownURL,
            }).then(function () {
                alert('Welcome to TuRiMo');
            }).catch(function (error) {
                console.log(error);
            });

            db.collection('users').doc(newUser.uid).set({
                userName: firstName + ' ' + lastName,
                email: email,
                userImg: photoDownURL,
            }).then(function () {
                
                window.location = 'index.html';
            }).catch(function (error) {
                console.log(error);
            });

        } else {
            console.log('Invalid User');
        }
    });
});
