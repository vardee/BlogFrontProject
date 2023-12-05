export async function getPost(postId) {
    const postDataURL = `https://blog.kreosoft.space/api/post/${postId}`;
    const token = localStorage.getItem('token');
    if (postDataURL == `https://blog.kreosoft.space/api/post/${postId}`) {
        try {
            const response = await fetch(postDataURL, {
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
            console.error('Ошибка при получении поста:', error.message);
            throw error;
        }
    }
    else {
        console.log('Пользователь не авторизован');
        throw new Error('Пользователь не авторизован');
    }
}
