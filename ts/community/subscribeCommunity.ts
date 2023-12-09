import { updateCommunityButtonsUI } from "./switchSubscribeButton.js";

document.body.addEventListener('click', async (event: Event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains('subscribe-community')) {
        event.preventDefault();

        const communityDetails = target.closest('.subscribe-btn-container') as HTMLElement | null;
        console.log(communityDetails)
        const communityId = communityDetails?.dataset.communityId;
        console.log(communityId);

        if (communityId) {
            await subscribeCommunity(communityId);
            await updateCommunityButtonsUI();
        } else {
            console.error('Community ID is undefined');
        }
    }
});

export async function subscribeCommunity(communityId: string) {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('Token not found in localStorage');
        return;
    }

    const subscribeCommunity = `https://blog.kreosoft.space/api/community/${communityId}/subscribe`;

    try {
        const response = await fetch(subscribeCommunity, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Сетевой ответ не был успешным');
        }
    } catch (error) {
        console.error('Ошибка при удалении коммента:', (error as Error).message);
    }
}