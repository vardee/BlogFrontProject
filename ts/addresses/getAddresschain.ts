export interface AddressData {
    objectId: string;
    objectGuid: string;
    text: string;
    objectLevel: string;
    objectLevelText: string;
}

export async function getAddressChain(objectGuid: string): Promise<AddressData[]> {
    const addressDataURL = `https://blog.kreosoft.space/api/address/chain?objectGuid=${objectGuid}`;
    const token = localStorage.getItem('token');

    if (token) {
        try {
            const response = await fetch(addressDataURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`Сетевой ответ не был успешным: ${response.statusText}`);
            }

            return await response.json() as AddressData[];
        } catch (error: any) {
            console.error('Ошибка при получении профиля:', error.message);
            throw error;
        }
    } else {
        console.log('Пользователь не авторизован');
        throw new Error('Пользователь не авторизован');
    }
}

