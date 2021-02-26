// //CREATE NEW COMMENT
const postComment = (user) => {

    const newComment = document.querySelector('#createComment');
    newComment.addEventListener('submit', (e) => {
        e.preventDefault();
        db.collection('comment').add({
            commentContent: newComment['content'].value,
            commentAuthor: user.displayName,
            commentAuthorUID: user.uid,
            commentAuthorPhotoURL: user.photoURL,
            commentDate: firebase.firestore.Timestamp.now(),
        }).then(() => {
            window.location = 'stream.html';
        }).catch(err => {
            console.log(err.message);
        });
    });

}


// SHOW COMMENT SECTION
const commentSection = document.querySelector('.comment');

let lastDoc = null;

const showComment = async() => {

    const data = await db.collection('comment')
        .orderBy('commentDate', 'desc')
        .endAt(lastDoc || 0)
        .limit(6)
        .get();

    let template = '';

    data.docs.forEach(doc => {
        get = doc.data();
        let date = new Date(doc.data().commentDate.toDate());
        template +=
            `
        <div class="container">
            <div class="card-panel hoverable">
                <li class="collection-item avatar" id="${get.id}">
                    <img src="${get.commentAuthorPhotoURL}" alt="avatar" class="circle">
                    <span class="title">
                        ${get.commentAuthor}
                    </span>
                    <p>
                        ${get.commentContent}
                    </p>
                  ${date.toUTCString()}
                </li>
            </div>
        </div>
        `
    });
    commentSection.innerHTML += template;

    lastDoc = data.docs[data.docs.length - 1];

    if (data.empty) {
        page.removeEventListener('click', handeClick);
    }
}


// // PAGINATION
const page = document.querySelector('.nextPage a');

const handeClick = () => {
    showComment();
}

page.addEventListener('click', handeClick);

window.addEventListener('DOMContentLoaded', () => showComment());