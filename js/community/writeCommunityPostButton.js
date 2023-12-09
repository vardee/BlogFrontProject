"use strict";
document.body.addEventListener('click', async (event) => {
    const target = event.target;
    if (target.classList.contains('write-post')) {
        event.preventDefault();
        const path = window.location.pathname;
        if (path.startsWith("/communities/")) {
            const communityId = path.split("/")[2];
            if (communityId) {
                localStorage.setItem('selectedCommunityId', communityId);
            }
            else {
                console.error('ID сообщества не найден в URL.');
            }
        }
        else {
            console.log("Неверный путь");
        }
        window.location.href = '/post/create';
    }
});
