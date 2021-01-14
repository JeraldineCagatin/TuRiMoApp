// Get the currently signed-in user
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log(user.displayName);
        postComment(user);
    } else {
        console.log('no user logged in');
        postComment(null);
    }
});

//CREATE NEW COMMENT
const postComment = (user) => {

    const newComment = document.querySelector('#createComment');
    newComment.addEventListener('submit', (e) => {
        e.preventDefault();
        db.collection('comment').add({
            commentContent: newComment['content'].value,
            commentAuthor: user.displayName,
            commentAuthorUID: user.uid,
            commentDate: new Date(firebase.firestore.Timestamp.now().seconds * 1000).toLocaleDateString(),
        }).then(() => {
            window.location = 'index.html';
        }).catch(err => {
            console.log(err.message);
        });
    });

}

const commentSection = document.querySelector('.comment');

function showComment(doc) {
    let html = [
        `

        <div class="col l3 m4 s12" id="${doc.id}">
            <div class="card">
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">${doc.data().commentContent}
                    <i class="material-icons right">close</i>
                    </span>
                </div>
                <div class="card-content"><p style="padding-left: 1vw">By: ${doc.data().commentAuthor}</p></div>
                <span class="left">
                    <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
                </span>
                <span class="right">
                    <a id="delBtn" class="waves-effect waves-light btn"><i class="material-icons left">delete</i>Delete</a>
                </span>
            </div>
        </div>
        `].join('');

    const div = document.createElement('div');
    div.innerHTML = html;
    commentSection.appendChild(div);
}

const ProfileView = (user) => {
    userId = user.uid;
    db.collection('comment').get().then(snapshot => {
        snapshot.docs.forEach((doc) => {
                showComment(doc);
            });
    });
}


auth.onAuthStateChanged((user) => {
    if (user) {
        ProfileView(user);
    }

    else {

    }
});