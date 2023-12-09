export async function getAuthorsList() {
    const authorsDataURL = "https://blog.kreosoft.space/api/author/list";
    const token = localStorage.getItem('token');
    if (authorsDataURL === "https://blog.kreosoft.space/api/author/list") {
        try {
            const response = await fetch(authorsDataURL, {
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
            console.error('Ошибка при получении профиля:', error.message);
            throw error;
        }
    }
    else {
        console.log('Пользователь не авторизован');
        throw new Error('Пользователь не авторизован');
    }
}
