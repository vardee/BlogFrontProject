"use strict";
document.body.addEventListener('click', async (event) => {
    const target = event.target;
    if (target.classList.contains('edit-icon')) {
        event.preventDefault();
        event.stopPropagation();
        const commentDetails = target.closest('.comment-details');
        const commentEditFormContainer = commentDetails?.querySelector('.comment-edit-form-container');
        const commentId = commentDetails?.dataset.commentId;
        if (commentEditFormContainer) {
            commentEditFormContainer.style.display = 'block';
            const commentEditInput = commentEditFormContainer.querySelector('.comment-edit-input');
            if (commentEditInput) {
                commentEditInput.focus();
            }
        }
    }
});
document.body.addEventListener('click', async (event) => {
    const target = event.target;
    if (target.classList.contains('comment-submit')) {
        event.preventDefault();
        const commentEditForm = target.closest('.comment-edit-post');
        const commentDetails = target.closest('.comment-details');
        const commentId = commentDetails?.dataset.commentId;
        const commentEditInput = commentEditForm?.querySelector('.comment-edit-input');
        const commentEditText = commentEditInput?.value;
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('Пользователь не авторизован');
            return;
        }
        if (commentId && commentEditText) {
            const commentEditURL = `https://blog.kreosoft.space/api/comment/${commentId}`;
            const requestData = {
                content: commentEditText
            };
            console.log(JSON.stringify(requestData));
            try {
                const response = await fetch(commentEditURL, {
                    method: 'PUT',
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
});
