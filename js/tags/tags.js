export async function getTags() {
    const apiUrl = "https://blog.kreosoft.space/api/tag";
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Сетевой ответ не был успешным: ${response.statusText}`);
        }
        return await response.json();
    }
    catch (error) {
        console.error('Ошибка при получении тегов:', error.message);
        throw error;
    }
}
