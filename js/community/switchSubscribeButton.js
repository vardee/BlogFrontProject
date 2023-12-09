import { getUserCommunityList } from "./getUserCommunityList.js";
export async function updateCommunityButtonsUI() {
    const token = localStorage.getItem('token');
    if (token) {
        const userCommunityData = await getUserCommunityList();
        const communityContainers = document.querySelectorAll('.subscribe-btn-container');
        const subscribeButtons = document.querySelectorAll('.subscribe-community');
        const unsubscribeButtons = document.querySelectorAll('.unsubscribe-community');
        communityContainers.forEach((container, index) => {
            const communityId = container?.dataset.communityId;
            if (!communityId) {
                console.error(`Не удалось получить communityId для элемента с индексом ${index}`);
                return;
            }
            const isAdminOfCommunity = userCommunityData.some(item => item.communityId === communityId && item.role === "Administrator");
            const isSubscribed = userCommunityData.some(item => item.communityId === communityId);
            subscribeButtons[index].style.display = isSubscribed ? 'none' : 'block';
            unsubscribeButtons[index].style.display = isSubscribed ? 'block' : 'none';
            if (isAdminOfCommunity) {
                subscribeButtons[index].style.display = 'none';
                unsubscribeButtons[index].style.display = 'none';
            }
        });
    }
    else {
        const subscribeButtons = document.querySelectorAll('.subscribe-community');
        const unsubscribeButtons = document.querySelectorAll('.unsubscribe-community');
        subscribeButtons.forEach(button => (button.style.display = 'none'));
        unsubscribeButtons.forEach(button => (button.style.display = 'none'));
    }
}
