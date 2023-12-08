import { displayCommunityInformation } from "./showCommunityInfo.js";
import { updateCommunityPageButtonsUI } from "./buttonsCommunityPage.js";
import { loadPosts } from "./showCommunityPosts.js";

export const showCommunityFullInformation = async () => {
    try {
        const path = window.location.pathname;
        if (path.startsWith("/communities/")) {
            const communityId = path.split("/")[2];
            if (communityId) {
                await displayCommunityInformation(communityId);
                await loadPosts(communityId);
                await updateCommunityPageButtonsUI(communityId);
            } else {
                console.error('ID сообщества не найден в URL.');
            }
        } else {
            console.log("Неверный путь");
        }
    } catch (error) {
        console.error('Ошибка при загрузке информации о сообществе:', (error as Error).message);
    }
};



