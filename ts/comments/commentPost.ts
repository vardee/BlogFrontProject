document.getElementById('addCommentForm')?.addEventListener('submit', async function (event) {
    event.preventDefault();
    const token = localStorage.getItem('token');


    if (!token) {
        console.log('Пользователь не авторизован');
        return;
    }

    const commentText = (document.getElementById('commentText') as HTMLInputElement).value;
    const requestData = {
        content: commentText,
    };

    const path = window.location.pathname;
    if (path.startsWith("/post/")) {
        const postId = path.split("/")[2];
        if (postId) {
            const commentPostURL = `https://blog.kreosoft.space/api/post/${postId}/comment`;
            fetch(commentPostURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Сетевой ответ не был успешным');
                }
                return response.json();
            })
            .then(data => {
                console.log('Коммент отправлен:', data);
            })
            .catch(error => {
                console.error('Ошибка отправки коммента:', error.message);
                window.location.reload();
            
                if (error.response) {
                    console.error('HTTP Status:', error.response.status);
                    error.response.text().then((text: any) => {
                        console.error('Response Text:', text);
                    });
                } else {
                    console.error('Response Error:', error);
                }
            });
        } else {
            console.error('ID поста не найден в URL.');
        }
    }
});
