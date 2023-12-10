import { getTags } from "./tags.js";

export async function addTagsToDiv(): Promise<void> {
    try {
        const tagsFromServer = await getTags();
        const tagsContainer = document.getElementById('tagsElements') as HTMLSelectElement;

        if (!tagsContainer) {
            return;
        }
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '--';
        tagsContainer.appendChild(defaultOption);

        tagsFromServer.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag.id;
            option.textContent = tag.name;
            tagsContainer.appendChild(option);
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Ошибка при получении тегов:', error.message);
        } else {
            console.error('Неизвестная ошибка при получении тегов');
        }
    }
}
