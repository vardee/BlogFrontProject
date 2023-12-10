export async function truncateText(description, maxLength) {
    const text = description.textContent || description.innerText;
    if (text && text.length > maxLength) {
        const truncatedText = text.slice(0, maxLength) + '...';
        description.textContent = truncatedText;
        const showButton = document.createElement('button');
        showButton.textContent = 'Показать все';
        showButton.className = 'btn btn-link';
        description.parentNode?.appendChild(showButton);
        showButton.addEventListener('click', () => {
            description.textContent = text;
            showButton.style.display = 'none';
            const hideButton = document.createElement('button');
            hideButton.textContent = 'Скрыть';
            hideButton.className = 'btn btn-link';
            description.parentNode?.appendChild(hideButton);
            hideButton.addEventListener('click', () => {
                description.textContent = truncatedText;
                hideButton.style.display = 'none';
                showButton.style.display = 'inline';
            });
        });
    }
}
