import { getUserCommunityList } from "./getUserCommunityList.js";
import { getFullCommunityInfo } from "./getFullInfoCommunity.js";
export async function addCommunitiesToDiv() {
    try {
        const communitiesFromServer = await getUserCommunityList();
        const communitiesContainer = document.getElementById('communities');
        if (!communitiesContainer) {
            return;
        }
        const emptyOption = document.createElement('option');
        emptyOption.value = "";
        emptyOption.textContent = "Выберите группу";
        communitiesContainer.appendChild(emptyOption);
        for (const community of communitiesFromServer) {
            if (community.role === 'Administrator') {
                const option = document.createElement('option');
                const communityId = community.communityId;
                option.value = communityId;
                const communityInfo = getFullCommunityInfo(communityId);
                option.textContent = (await communityInfo).name;
                communitiesContainer.appendChild(option);
            }
        }
        const selectedCommunityId = localStorage.getItem('selectedCommunityId');
        if (selectedCommunityId) {
            const selectedOption = communitiesContainer.querySelector(`option[value="${selectedCommunityId}"]`);
            if (selectedOption) {
                selectedOption.selected = true;
            }
            localStorage.removeItem('selectedCommunityId');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Ошибка при получении групп:', error.message);
        }
        else {
            console.error('Неизвестная ошибка при получении групп');
        }
    }
}
