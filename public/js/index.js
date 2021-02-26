const adminForm = document.querySelector('#admin-form');

const getUrlVids = (adminDocs) => {
    if (adminForm) {
        adminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            db.collection("urlVideo").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    db.collection('urlVideo').doc(doc.id).update({
                        urlVideo: adminForm['urlCode'].value,
                        adminId: adminDocs.id,
                    }).then(() => {
                        adminForm.reset();
                    });
                });
            });
        });
    }
}


// setup guides
const loggedOutlinks = document.querySelectorAll('.logged-out');
const loggedInlinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
    if (user) {
        //toggle UI elements
        loggedInlinks.forEach(item => item.style.display = 'block');
        loggedOutlinks.forEach(item => item.style.display = 'none');
    } else {
        //toggle UI elements
        loggedInlinks.forEach(item => item.style.display = 'none');
        loggedOutlinks.forEach(item => item.style.display = 'block');
    }
};

const getAdmin = (isUser) => {
    var docRef = db.collection("admin").doc(isUser.uid);

    docRef.get().then((doc) => {
        if (doc.exists) {
            getUrlVids(doc);
            if (adminForm) {
                adminForm.style.display = 'initial';
            }
        } else {

        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

// Get the currently signed-in user
auth.onAuthStateChanged((user) => {
    if (user) {
        setupUI(user);
        getAdmin(user);
    } else {
        setupUI();
    }
});




db.collection("urlVideo").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let videoIdSrc = document.querySelector('#myFrame');
        if (videoIdSrc) {
            videoIdSrc.src = 'https://www.youtube.com/embed/' + doc.data().urlVideo + '?autoplay=0&controls=0';
        }
    });
});