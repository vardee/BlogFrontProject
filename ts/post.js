"use strict";
document.getElementById('filterForm')?.addEventListener('submit', async function (event) {
    console.log('Форма отправлена');
    event.preventDefault();
    const tags = document.getElementById('tags').value;
    const author = document.getElementById('author').value;
    const minReadingTime = document.getElementById('minReadingTime').value;
    const maxReadingTime = document.getElementById('maxReadingTime').value;
    const sorting = document.getElementById('sorting').value;
    const onlyMyCommunities = document.getElementById('onlyMyCommunities').checked;
    let page = document.getElementById('page').value;
    let size = document.getElementById('size').value;
    if (page.trim() === '') {
        page = '1';
    }
    if (size.trim() === '') {
        size = '5';
    }
    const params = new URLSearchParams();
    if (tags.trim() !== '')
        params.set('tags', tags);
    if (author.trim() !== '')
        params.set('author', author);
    if (minReadingTime.trim() !== '')
        params.set('minReadingTime', minReadingTime);
    if (maxReadingTime.trim() !== '')
        params.set('maxReadingTime', maxReadingTime);
    if (sorting.trim() !== '')
        params.set('sorting', sorting);
    if (onlyMyCommunities)
        params.set('onlyMyCommunities', String(onlyMyCommunities));
    params.set('page', page);
    params.set('size', size);
    const apiUrl = 'https://blog.kreosoft.space/api/post';
    const url = new URL(apiUrl);
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${url.toString()}?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error('Сетевой ответ не был успешным');
        }
        const data = await response.json();
        const posts = data.posts;
        const postsContainer = document.getElementById('posts');
        if (!postsContainer) {
            console.error('Элемент "postsContainer" не найден.');
            return;
        }
        postsContainer.innerHTML = '';
        const postTemplate = document.getElementById('postTemplate');
        posts.forEach((post) => {
            const postElement = document.importNode(postTemplate.content, true);
            const titleElement = postElement.querySelector('.post-title');
            const descriptionElement = postElement.querySelector('.post-description');
            const authorElement = postElement.querySelector('.post-author');
            const dateElement = postElement.querySelector('.post-date');
            const imageElement = postElement.querySelector('.post-image');
            const tagsElement = postElement.querySelector('.post-tags');
            const readingTimeElement = postElement.querySelector('.post-reading-time');
            const commentsElement = postElement.querySelector('.post-comments');
            const likesElement = postElement.querySelector('.post-likes');
            if (titleElement)
                titleElement.textContent = post.title ?? '';
            if (descriptionElement)
                descriptionElement.innerHTML = post.description ?? '';
            if (authorElement)
                authorElement.textContent = post.author ?? '';
            if (dateElement)
                dateElement.textContent = post.date ?? '';
            if (imageElement) {
                if (post.image) {
                    imageElement.src = post.image;
                    imageElement.alt = 'Post Image';
                    imageElement.parentElement?.classList.remove('d-none');
                }
                else {
                    imageElement.parentElement?.classList.add('d-none');
                }
            }
            if (tagsElement)
                tagsElement.textContent = post.tags?.join(', ') ?? '';
            if (readingTimeElement)
                readingTimeElement.textContent = `Время чтения: ${post.readingTime ?? ''}`;
            if (commentsElement)
                commentsElement.textContent = post.comments ?? '';
            if (likesElement)
                likesElement.textContent = post.likes ?? '';
            postsContainer.appendChild(postElement);
        });
    }
    catch (error) {
        console.error('Ошибка при выполнении GET-запроса:', error.message);
    }
});
