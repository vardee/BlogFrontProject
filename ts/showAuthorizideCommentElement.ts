import { getPost, PostData } from "./getPostInformation.js";
import { getProfile, ProfileData } from "./getProfile.js";
import { CommentData, getCommentTree } from "./getComment.js";

export async function updateCommentUI(postId: string) {
    let currentIndex = 0;

    async function processCommentsRecursive(comment: CommentData, profileId: string, deleteButtons: NodeListOf<HTMLElement>, editButtons: NodeListOf<HTMLElement>) {
        if (!comment || !comment.authorId) {
            console.error('Комментарий не содержит информацию об авторе.');
            return;
        }

        if (comment.authorId === profileId) {
            deleteButtons[currentIndex].style.display = 'block';
            editButtons[currentIndex].style.display = 'block';
        } else {
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
                        currentIndex++;
                        await processCommentsRecursive(subComment, profileId, deleteButtons, editButtons);
                    }
                }
            } catch (error) {
                console.error('Ошибка при получении саб-комментариев:', (error as Error).message);
            }
        }
    }

    const commentForm = document.getElementById('commentForm') as HTMLElement;
    const commentDeleteButtons = document.querySelectorAll('.delete-icon') as NodeListOf<HTMLElement>;
    const commentEditButtons = document.querySelectorAll('.edit-icon') as NodeListOf<HTMLElement>;

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
    } else {
        commentForm.style.display = 'none';
        commentDeleteButtons.forEach(button => (button.style.display = 'none'));
        commentEditButtons.forEach(button => (button.style.display = 'none'));
    }
}
