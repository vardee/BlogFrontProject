document.body.addEventListener('click', async (event: Event) => {
    const target = event.target as HTMLElement;
    const commentElement = target.closest('.comment-icon');

    if (commentElement) {
        const postElement = target.closest('.post') as HTMLElement;
        const postId = postElement?.dataset.postId;
        if (postId) {
            window.location.href = `/post/${postId}`;
        } else {
            console.error('Не удалось получить идентификатор поста');
        }
    } else {
        console.error('Не удалось найти элемент с классом .comment-icon');
    }
});

const commentsContainer = document.getElementById('commentsContainer') as HTMLElement;

if (commentsContainer) {
    commentsContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
}
