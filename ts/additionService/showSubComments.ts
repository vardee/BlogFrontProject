export function showAllSubComments(subCommentsContainer: HTMLElement) {
    subCommentsContainer.style.display = 'none';

    const showSubCommentsButton = document.createElement('button');
    showSubCommentsButton.textContent = 'Показать все саб-комменты';
    showSubCommentsButton.className = 'btn btn-link';
    subCommentsContainer.parentNode?.appendChild(showSubCommentsButton);

    showSubCommentsButton.addEventListener('click', () => {
        subCommentsContainer.style.display = 'block';
        showSubCommentsButton.style.display = 'none';

        const hideSubCommentsButton = document.createElement('button');
        hideSubCommentsButton.textContent = 'Скрыть саб-комменты';
        hideSubCommentsButton.className = 'btn btn-link';
        subCommentsContainer.parentNode?.appendChild(hideSubCommentsButton);

        hideSubCommentsButton.addEventListener('click', () => {
            subCommentsContainer.style.display = 'none';
            hideSubCommentsButton.style.display = 'none';
            showSubCommentsButton.style.display = 'inline';
        });
    });
}
