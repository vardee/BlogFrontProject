export interface ProfileData {
    id: string;
    createTime: string;
    fullName: string;
    birthDate: string;
    gender: string;
    email: string;
    phoneNumber: string;
}

export async function getProfile(): Promise<ProfileData> {
    const profileDataURL = "https://blog.kreosoft.space/api/account/profile";
    const token = localStorage.getItem('token');

    if (token) {
        try {
            const response = await fetch(profileDataURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`Сетевой ответ не был успешным: ${response.statusText}`);
            }

            return await response.json() as ProfileData;
        } catch (error: any) {
            console.error('Ошибка при получении профиля:', error.message);
            throw error;
        }
    } else {
        console.log('Пользователь не авторизован');
        throw new Error('Пользователь не авторизован');
    }
}
