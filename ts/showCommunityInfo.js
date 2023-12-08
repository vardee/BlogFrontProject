import { getFullCommunityInfo } from "./getFullInfoCommunity.js";
export const displayCommunityInformation = async (communityId) => {
    const communityContainerInfo = document.getElementById('communityContainerInfo');
    if (!communityContainerInfo) {
        console.error('Элемент "communityContainerInfo" не найден.');
        return;
    }
    communityContainerInfo.innerHTML = '';
    const communityInfoTemplate = document.getElementById('communityInfoTemplate');
    try {
        const communityData = await getFullCommunityInfo(communityId);
        const communityInstance = document.importNode(communityInfoTemplate.content, true);
        const communityIdElement = communityInstance.querySelector('.subscribe-btn-container');
        const communityName = communityInstance.querySelector('.community-name');
        const communitySubscribers = communityInstance.querySelector('.community-subscribers');
        const communityType = communityInstance.querySelector('.community-type');
        const communityAdmins = communityInstance.querySelector('.community-admins');
        if (communityIdElement) {
            communityIdElement.dataset.communityId = communityId;
        }
        if (communityName) {
            communityName.textContent = communityData.name;
        }
        if (communitySubscribers) {
            communitySubscribers.textContent = `Подписчики: ${communityData.subscribersCount}`;
        }
        if (communityType) {
            const communityClose = communityData.isClosed;
            if (communityClose === true) {
                communityType.textContent = `Тип сообщества: закрытое`;
            }
            else {
                communityType.textContent = `Тип сообщества: открытое`;
            }
        }
        if (communityAdmins) {
            const adminNames = communityData.administrators.map(admin => admin.fullname).join(', ');
            communityAdmins.textContent = `Администраторы: ${adminNames}`;
        }
        communityContainerInfo.appendChild(communityInstance);
    }
    catch (error) {
        console.error('Ошибка при отображении сообщества:', error.message);
    }
};
