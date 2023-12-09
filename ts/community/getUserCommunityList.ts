export interface UserCommunityData {
    userId: string,
    communityId: string,
    role: string
}

export async function getUserCommunityList() {
    const userCommunityDataURL = `https://blog.kreosoft.space/api/community/my`;
    const token = localStorage.getItem('token');
    
    if (token) {
        try {
            const response = await fetch(userCommunityDataURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!response.ok) {
                throw new Error(`Сетевой ответ не был успешным: ${response.statusText}`);
            }
            return await response.json() as UserCommunityData[];
        } catch (error) {
            console.error('Ошибка при получении поста:', (error as Error).message);
            throw error;
        }
    } else {
        console.log('Пользователь не авторизован');
        throw new Error('Пользователь не авторизован');
    }
}
