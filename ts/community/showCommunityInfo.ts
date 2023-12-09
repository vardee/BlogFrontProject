import { getFullCommunityInfo, CommunityInformationData } from "./getFullInfoCommunity.js";

export const displayCommunityInformation = async (communityId: string) => {
    const communityContainerInfo = document.getElementById('communityContainerInfo');

    if (!communityContainerInfo) {
        console.error('Элемент "communityContainerInfo" не найден.');
        return;
    }

    communityContainerInfo.innerHTML = '';

    const communityInfoTemplate = document.getElementById('communityInfoTemplate') as HTMLTemplateElement;
    try {
        const communityData: CommunityInformationData = await getFullCommunityInfo(communityId);

        const communityInstance = document.importNode(communityInfoTemplate.content, true);
        
        const communityIdElement = communityInstance.querySelector('.subscribe-btn-container') as HTMLElement;
        const communityName = communityInstance.querySelector('.community-name');
        const communitySubscribers = communityInstance.querySelector('.community-subscribers');
        const communityType = communityInstance.querySelector('.community-type');
        const communityAdminsContainer = communityInstance.querySelector('.community-admins');

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
            communityType.textContent = `Тип сообщества: ${communityClose ? 'закрытое' : 'открытое'}`;
        }

        if (communityAdminsContainer) {
            const adminContainer = communityAdminsContainer.querySelector('.admin-avatar');
            
            if (adminContainer) {
                communityData.administrators.forEach(admin => {
                    const adminAvatar = adminContainer.querySelector('.avatar-img') as HTMLImageElement;
                    adminAvatar.alt = admin.fullName;
        
                    if (admin.gender === 'Male') {
                        adminAvatar.src = '../image/man.png';
                    } else if (admin.gender === 'Female') {
                        adminAvatar.src = '../image/human.png';
                    } else {
                        adminAvatar.src = 'default.png';
                    }
        
                    const adminFullName = adminContainer.querySelector('.admin-fullname') as HTMLParagraphElement;
                    adminFullName.textContent = admin.fullName;
                });
            }
        }

        communityContainerInfo.appendChild(communityInstance);
    } catch (error) {
        console.error('Ошибка при отображении сообщества:', (error as Error).message);
    }
};