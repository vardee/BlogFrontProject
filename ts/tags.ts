export interface TagsData {
    name: string;
    id: string;
    createTime: string;
}

export async function getTags(): Promise<TagsData[]> {
    const apiUrl = "https://blog.kreosoft.space/api/tag";

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Сетевой ответ не был успешным: ${response.statusText}`);
        }

        return await response.json();
    } catch (error: any) {
        console.error('Ошибка при получении тегов:', error.message);
        throw error;
    }
}