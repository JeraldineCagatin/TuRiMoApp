// Get the currently signed-in user
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log(user.displayName);
        newComment(user);
    } else {
        console.log('no user logged in');
        newComment(null);
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
            createRecipe.reset();
            window.location = 'index.html';
        }).catch(err => {
            console.log(err.message);
        });
    });

}