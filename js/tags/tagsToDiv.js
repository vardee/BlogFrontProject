import { getTags } from "./tags.js";
export async function addTagsToDiv() {
    try {
        const tagsFromServer = await getTags();
        const tagsContainer = document.getElementById('tagsElements');
        if (!tagsContainer) {
            return;
        }
        tagsFromServer.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag.id;
            option.textContent = tag.name;
            tagsContainer.appendChild(option);
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Ошибка при получении тегов:', error.message);
        }
        else {
            console.error('Неизвестная ошибка при получении тегов');
        }
    }
}
