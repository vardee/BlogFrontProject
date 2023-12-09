"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const postDescriptions = document.querySelectorAll('.post-description');
    console.log(postDescriptions);
    postDescriptions.forEach(description => {
        const text = description.textContent || description.innerText;
        const maxLength = 150;
        if (text && text.length > maxLength) {
            const truncatedText = text.slice(0, maxLength) + '...';
            description.textContent = truncatedText;
            const showButton = document.createElement('button');
            showButton.textContent = 'Показать все';
            showButton.className = 'btn btn-link';
            description.parentNode?.appendChild(showButton);
            showButton.addEventListener('click', () => {
                description.textContent = text;
                const hideButton = document.createElement('button');
                hideButton.textContent = 'Скрыть';
                hideButton.className = 'btn btn-link';
                description.parentNode?.appendChild(hideButton);
                hideButton.addEventListener('click', () => {
                    description.textContent = truncatedText;
                    hideButton.remove();
                });
                showButton.remove();
            });
        }
    });
});
