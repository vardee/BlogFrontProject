export interface CommunityInformationData {
    id: string,
    createTime: string,
    name: string,
    description: string,
    isClosed: boolean,
    subscribersCount: number,
    administrators: Array<{
        id: string;
        createTime: string;
        fullName: string;
        birthDate: string;
        gender: string;
        email: string;
        phoneNumber: string;
    }>;
}

export async function getFullCommunityInfo(communityId: string) {
    const communityDataURL = `https://blog.kreosoft.space/api/community/${communityId}`;
    const token = localStorage.getItem('token');
    
    if (communityDataURL == `https://blog.kreosoft.space/api/community/${communityId}`) {
        try {
            const response = await fetch(communityDataURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`Сетевой ответ не был успешным: ${response.statusText}`);
            }

            return await response.json() as CommunityInformationData;
        } catch (error: any) {
            console.error('Ошибка при получении поста:', error.message);
            throw error;
        }
    } else {
        console.log('Пользователь не авторизован');
        throw new Error('Пользователь не авторизован');
    }
}
