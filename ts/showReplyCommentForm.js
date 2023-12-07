"use strict";
document.body.addEventListener('click', async (event) => {
    const target = event.target;
    if (target.classList.contains('reply-text')) {
        event.preventDefault();
        event.stopPropagation();
        const commentDetails = target.closest('.comment-details');
        const commentReplyFormContainer = commentDetails?.querySelector('.comment-reply-form-container');
        if (commentReplyFormContainer) {
            commentReplyFormContainer.style.display = 'block';
            const commentInput = commentReplyFormContainer.querySelector('#commentForReplyText');
            if (commentInput) {
                commentInput.focus();
            }
        }
    }
});
