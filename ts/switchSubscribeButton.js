import { getUserCommunityList } from "./getUserCommunityList.js";
export async function updateCommunityButtonsUI() {
    const token = localStorage.getItem('token');
    if (token) {
        const userCommunityData = await getUserCommunityList();
        const communityContainers = document.querySelectorAll('.subscribe-btn-container');
        const subscribeButtons = document.querySelectorAll('.subscribe-community');
        const unsubscribeButtons = document.querySelectorAll('.unsubscribe-community');
        const createPostButtons = document.querySelectorAll('.write-post');
        communityContainers.forEach((container, index) => {
            const communityId = container?.dataset.communityId;
            if (!communityId) {
                console.error(`Не удалось получить communityId для элемента с индексом ${index}`);
                return;
            }
            const isSubscribed = userCommunityData.some(item => item.communityId === communityId);
            const isAdmin = userCommunityData.some(item => item.role === "Administrator");
            subscribeButtons[index].style.display = isSubscribed ? 'none' : 'block';
            unsubscribeButtons[index].style.display = isSubscribed ? 'block' : 'none';
            createPostButtons[index].style.display = "none";
            if (isAdmin === true) {
                createPostButtons[index].style.display = "block";
                subscribeButtons[index].style.display = 'none';
                unsubscribeButtons[index].style.display = 'none';
            }
        });
    }
    else {
        const subscribeButtons = document.querySelectorAll('.subscribe-community');
        const unsubscribeButtons = document.querySelectorAll('.unsubscribe-community');
        const createPostButtons = document.querySelectorAll('.write-post');
        subscribeButtons.forEach(button => (button.style.display = 'none'));
        unsubscribeButtons.forEach(button => (button.style.display = 'none'));
        createPostButtons.forEach(button => (button.style.display = 'none'));
    }
}
