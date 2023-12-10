"use strict";
document.body.addEventListener('click', async (event) => {
    const target = event.target;
    const authorElement = target.closest('.post-author');
    if (authorElement) {
        const authorName = authorElement.textContent;
        if (authorName && authorName.trim() !== '') {
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('author', authorName.trim());
            window.history.pushState({}, '', `/?${urlParams.toString()}`);
            window.location.reload();
        }
        else {
            console.error('Имя автора не может быть пустым');
        }
    }
    else {
        console.error('Не удалось найти элемент с классом .post-author');
    }
});
