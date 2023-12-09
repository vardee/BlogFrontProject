export async function getCommentTree(commentId) {
    const commentDataURL = `https://blog.kreosoft.space/api/comment/${commentId}/tree`;
    const token = localStorage.getItem('token');
    console.log(commentId);
    if (commentDataURL == `https://blog.kreosoft.space/api/comment/${commentId}/tree`) {
        try {
            const response = await fetch(commentDataURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!response.ok) {
                throw new Error(`Сетевой ответ не был успешным: ${response.statusText}`);
            }
            return await response.json();
        }
        catch (error) {
            console.error('Ошибка при получении комментов:', error.message);
            throw error;
        }
    }
    else {
        console.log('Пользователь не авторизован');
        throw new Error('Пользователь не авторизован');
    }
}
