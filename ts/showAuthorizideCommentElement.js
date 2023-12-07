import { getPost } from "./getPostInformation.js";
import { getProfile } from "./getProfile.js";
import { getCommentTree } from "./getComment.js";
export async function updateCommentUI(postId) {
    let currentIndex = 0; // Локальная переменная для хранения индекса внутри функции
    async function processCommentsRecursive(comment, profileId, deleteButtons, editButtons) {
        if (!comment || !comment.authorId) {
            console.error('Комментарий не содержит информацию об авторе.');
            return;
        }
        if (comment.authorId === profileId) {
            deleteButtons[currentIndex].style.display = 'block';
            editButtons[currentIndex].style.display = 'block';
        }
        else {
            deleteButtons[currentIndex].style.display = 'none';
            editButtons[currentIndex].style.display = 'none';
        }
        if (comment.subComments && typeof comment.subComments === 'number' && comment.subComments > 0) {
            try {
                const subComments = await getCommentTree(comment.id);
                console.log(subComments);
                if (Array.isArray(subComments) && subComments.length > 0) {
                    for (let i = 0; i < subComments.length; i++) {
                        const subComment = subComments[i];
                        if (subComment.subComments > 0) {
                            subComment.subComments = 0;
                        }
                        currentIndex++; // Увеличиваем значение currentIndex
                        await processCommentsRecursive(subComment, profileId, deleteButtons, editButtons);
                    }
                }
            }
            catch (error) {
                console.error('Ошибка при получении саб-комментариев:', error.message);
            }
        }
    }
    const commentForm = document.getElementById('commentForm');
    const commentDeleteButtons = document.querySelectorAll('.delete-icon');
    const commentEditButtons = document.querySelectorAll('.edit-icon');
    if (!commentForm || !commentDeleteButtons || !commentEditButtons) {
        console.error('Один из элементов не найден.');
        return;
    }
    const token = localStorage.getItem('token');
    if (token) {
        commentForm.style.display = 'block';
        const postData = await getPost(postId);
        const profileData = await getProfile();
        for (let i = 0; i < postData.comments.length; i++) {
            await processCommentsRecursive(postData.comments[i], profileData.id, commentDeleteButtons, commentEditButtons);
            currentIndex++;
        }
    }
    else {
        commentForm.style.display = 'none';
        commentDeleteButtons.forEach(button => (button.style.display = 'none'));
        commentEditButtons.forEach(button => (button.style.display = 'none'));
    }
}
