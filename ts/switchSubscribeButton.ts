import { UserCommunityData, getUserCommunityList } from "./getUserCommunityList.js";

export async function updateCommunityButtonsUI() {
    const token = localStorage.getItem('token');

    if (token) {
        const userCommunityData: UserCommunityData[] = await getUserCommunityList();

        const communityContainers = document.querySelectorAll('.subscribe-btn-container') as NodeListOf<HTMLElement>;
        const subscribeButtons = document.querySelectorAll('.subscribe-community') as NodeListOf<HTMLElement>;
        const unsubscribeButtons = document.querySelectorAll('.unsubscribe-community') as NodeListOf<HTMLElement>;
        const createPostButtons = document.querySelectorAll('.write-post') as NodeListOf<HTMLElement>;

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
    } else {
        const subscribeButtons = document.querySelectorAll('.subscribe-community') as NodeListOf<HTMLElement>;
        const unsubscribeButtons = document.querySelectorAll('.unsubscribe-community') as NodeListOf<HTMLElement>;
        const createPostButtons = document.querySelectorAll('.write-post') as NodeListOf<HTMLElement>;

        subscribeButtons.forEach(button => (button.style.display = 'none'));
        unsubscribeButtons.forEach(button => (button.style.display = 'none'));
        createPostButtons.forEach(button => (button.style.display = 'none'));
    }
}
