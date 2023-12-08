import { updateCommunityButtonsUI } from "./switchSubscribeButton.js";

document.body.addEventListener('click', async (event: Event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains('unsubscribe-community')) {
        event.preventDefault();

        const communityDetails = target.closest('.subscribe-btn-container') as HTMLElement | null;
        console.log(communityDetails)
        const communityId = communityDetails?.dataset.communityId;
        console.log(communityId);

        if (communityId) {
            await unsubscribeCommunity(communityId);
            await updateCommunityButtonsUI();
        } else {
            console.error('Community ID is undefined');
        }
    }
});

export async function unsubscribeCommunity(communityId: string) {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('Token not found in localStorage');
        return;
    }

    const unsubscribeCommunity = `https://blog.kreosoft.space/api/community/${communityId}/unsubscribe`;

    try {
        const response = await fetch(unsubscribeCommunity, {
            method: 'DELETE',
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