document.body.addEventListener('click', async (event) => {
    const target = event.target;
    if (target.classList.contains('delete-icon')) {
        event.preventDefault();
        const commentDetails = target.closest('.comment-details');
        const commentId = commentDetails?.dataset.commentId;
        if (commentId) {
            await deleteComment(commentId);
        }
        else {
            console.error('Comment ID is undefined');
        }
    }
});
export async function deleteComment(commentId) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token not found in localStorage');
        return;
    }
    const deleteComment = `https://blog.kreosoft.space/api/comment/${commentId}`;
    try {
        const response = await fetch(deleteComment, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error('Сетевой ответ не был успешным');
        }
    }
    catch (error) {
        console.error('Ошибка при удалении коммента:', error.message);
    }
}
