import { CommunityData, getCommunity } from "./getCommunity.js";
import { updateCommunityButtonsUI } from "./switchSubscribeButton.js";

export const displayCommunity = async () => {
    const communityContainer = document.getElementById('communityContainer');

    if (!communityContainer) {
        console.error('Элемент "communityContainer" не найден.');
        return;
    }

    communityContainer.innerHTML = '';

    const commentTemplate = document.getElementById('communityTemplate') as HTMLTemplateElement;
    try {
        const communityData: CommunityData[] = await getCommunity();

        communityData.forEach(async (community: CommunityData) => {
            const communityInstance = document.importNode(commentTemplate.content, true);
            const communtyIdElement = communityInstance.querySelector('.subscribe-btn-container') as HTMLElement;
            const communityName = communityInstance.querySelector('.community-name') as HTMLElement;
            
            if (communityName) {
                communityName.textContent = community.name;
                const communityLink = communityName.closest('.community-link') as HTMLAnchorElement;
                const communityId= community.id;
                if (communtyIdElement) {
                    communtyIdElement.dataset.communityId = communityId;
                }
                if (communityLink) {
                    communityLink.href = `/communities/${community.id}`;
                }
                communityContainer.appendChild(communityInstance);
                await updateCommunityButtonsUI();
            }
        });
    } catch (error) {
        console.error('Ошибка при отображении сообществ:', (error as Error).message);
    }
};