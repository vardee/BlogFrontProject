document.body.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains('reply-text')) {
        event.preventDefault();
        event.stopPropagation();

        const commentDetails = target.closest('.comment-details') as HTMLElement | null;
        const commentReplyFormContainer = commentDetails?.querySelector('.comment-reply-form-container') as HTMLElement | null;

        if (commentReplyFormContainer) {
            commentReplyFormContainer.style.display = 'block';
            const commentInput = commentReplyFormContainer.querySelector('#commentForReplyText') as HTMLInputElement | null;
            if (commentInput) {
                commentInput.focus();
            }
        }
        
    }
});
