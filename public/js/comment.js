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

const commentSection = document.querySelector('.comment');

function showComment(doc) {
    let date = new Date(doc.data().commentDate.toDate());
    let html = [
        `
        <div class="container">
            <div class="card-panel hoverable">
                <li class="collection-item avatar" id="${doc.id}">
                    <img src="images/green_smile.png" alt="avatar" class="circle">
                    <span class="title">
                        ${doc.data().commentAuthor}
                    </span>
                    <p>
                        ${doc.data().commentContent}
                    </p>
                    ${date.toLocaleString('en-GB')}
                </li>
            </div>
        </div>
        `
    ].join('');

    const div = document.createElement('div');
    div.innerHTML = html;
    commentSection.appendChild(div);
}

db.collection('comment').get().then(snapshot => {
    snapshot.docs.forEach((doc) => {
        showComment(doc);
    });
});