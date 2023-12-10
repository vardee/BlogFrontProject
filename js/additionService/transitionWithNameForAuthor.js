"use strict";
document.body.addEventListener('click', async (event) => {
    const target = event.target;
    const authorCardElement = target.closest('.author');
    console.log(authorCardElement);
    if (authorCardElement) {
        const authorName = authorCardElement.getAttribute('data-author-name');
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
        console.error('Не удалось определить элемент, на который произведен клик');
    }
});
