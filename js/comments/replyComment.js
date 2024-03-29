import { getPost } from "../posts/getPostInformation.js";
import { displayComments } from "./displayComment.js";
document.body.addEventListener('click', async (event) => {
    const target = event.target;
    if (target.classList.contains('reply-text')) {
        event.preventDefault();
        event.stopPropagation();
        const commentDetails = target.closest('.comment-details');
        const commentReplyFormContainer = commentDetails?.querySelector('.comment-reply-form-container');
        const commentInput = commentReplyFormContainer?.querySelector('.comment-input');
        if (commentDetails && commentReplyFormContainer && commentInput) {
            const openReplyForms = document.querySelectorAll('.comment-reply-form-container');
            openReplyForms.forEach((form) => {
                form.style.display = 'none';
            });
            if (commentReplyFormContainer.style.display === 'block') {
                commentReplyFormContainer.style.display = 'none';
            }
            else {
                commentReplyFormContainer.style.display = 'block';
                commentInput.focus();
            }
        }
    }
});
document.body.addEventListener('click', async (event) => {
    const target = event.target;
    if (target.classList.contains('comment-submit')) {
        event.preventDefault();
        const commentForm = target.closest('.comment-reply-post');
        const commentDetails = target.closest('.comment-details');
        const commentId = commentDetails?.dataset.commentId;
        const commentInput = commentForm?.querySelector('.comment-input');
        const commentText = commentInput?.value;
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('Пользователь не авторизован');
            return;
        }
        if (commentId && commentText) {
            const path = window.location.pathname;
            if (path.startsWith("/post/")) {
                const postId = path.split("/")[2];
                if (postId) {
                    const commentPostURL = `https://blog.kreosoft.space/api/post/${postId}/comment`;
                    const requestData = {
                        content: commentText,
                        parentId: commentId
                    };
                    try {
                        const response = await fetch(commentPostURL, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify(requestData),
                        });
                        if (!response.ok) {
                            throw new Error('Сетевой ответ не был успешным');
                        }
                        const data = await response.json();
                        console.log('Коммент отправлен:', data);
                        const postData = await getPost(postId);
                        displayComments(postData);
                    }
                    catch (error) {
                        console.error('Ошибка отправки коммента:', error.message);
                        window.location.reload();
                        if (error.response) {
                            console.error('HTTP Status:', error.response.status);
                            const text = await error.response.text();
                            console.error('Response Text:', text);
                        }
                        else {
                            console.error('Response Error:', error);
                        }
                    }
                }
                else {
                    console.error('ID поста не найден в URL.');
                }
            }
        }
    }
});
