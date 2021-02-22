//CREATE NEW COMMENT
 const postComment = (user) => {


    const newComment = document.querySelector('#createComment');
    newComment.addEventListener('submit', (e) => {
        e.preventDefault();
        db.collection('comment').add({
            commentContent: newComment['content'].value,
            commentAuthor: user.displayName,
            commentAuthorUID: user.uid,
            commentAuthorPhotoURL: user.photoURL,
            commentDate: (firebase.firestore.Timestamp.now()),
        }).then(() => {
            window.location = 'stream.html';
        }).catch(err => {
            console.log(err.message);
        });
    });

}

// SHOW COMMENT SECTION
const commentSection = document.querySelector('.comment');

function showComment(doc) {
    let date = new Date(doc.data().commentDate.toDate());
    let html = [
        `
        <div class="container">
            <div class="card-panel hoverable">
                <li class="collection-item avatar" id="${doc.data().commentAuthorPhotoURL}">
                    <img src="${doc.data().commentAuthorPhotoURL}" alt="avatar" class="circle">
                    <span class="title">
                        ${doc.data().commentAuthor}
                    </span>
                    <p>
                        ${doc.data().commentContent}
                    </p>
                    ${date.toUTCString()}
                </li>
            </div>
        </div>
        `
    ].join('');

    const div = document.createElement('div');
    div.innerHTML = html;
    commentSection.appendChild(div);
}

// GET COMMENTS FROM FIRESTORE
db.collection('comment')
    .orderBy('commentDate', 'desc')
    .get()
    .then(snapshot => {
        snapshot.docs.forEach((doc) => {
            showComment(doc);
        });
    });


// Get the currently signed-in user
auth.onAuthStateChanged((user) => {
    if (user) {
        document.getElementById('hide').classList.remove('disabled');
        setupUI(user);
        postComment(user);
    } else {
        setupUI();
        postComment(null);
    }
});

