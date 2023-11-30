document.getElementById('filterForm')?.addEventListener('submit', async function (event) {
    console.log('Форма отправлена');
    event.preventDefault();

    const tags = (document.getElementById('tags') as HTMLInputElement).value;
    const author = (document.getElementById('author') as HTMLInputElement).value;
    const minReadingTime = (document.getElementById('minReadingTime') as HTMLInputElement).value;
    const maxReadingTime = (document.getElementById('maxReadingTime') as HTMLInputElement).value;
    const sorting = (document.getElementById('sorting') as HTMLSelectElement).value;
    const onlyMyCommunities = (document.getElementById('onlyMyCommunities') as HTMLInputElement).checked;
    let page = (document.getElementById('page') as HTMLInputElement).value;
    let size = (document.getElementById('size') as HTMLInputElement).value;

    
    if (page.trim() === '') {
        page = '1';
    }
    if (size.trim() === '') {
        size = '5';
    }

    const params = new URLSearchParams();
    if (tags.trim() !== '') params.set('tags', tags);
    if (author.trim() !== '') params.set('author', author);
    if (minReadingTime.trim() !== '') params.set('minReadingTime', minReadingTime);
    if (maxReadingTime.trim() !== '') params.set('maxReadingTime', maxReadingTime);
    if (sorting.trim() !== '') params.set('sorting', sorting);
    if (onlyMyCommunities) params.set('onlyMyCommunities', String(onlyMyCommunities));
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

        const postTemplate = document.getElementById('postTemplate') as HTMLTemplateElement;

        posts.forEach((post: { title: string; description: string; author: string; date: string; image: string; tags: any[]; readingTime: any; comments: string; likes: string; }) => {
            const postElement = document.importNode(postTemplate.content, true);
            
            const titleElement = postElement.querySelector('.post-title') as HTMLElement;
            const descriptionElement = postElement.querySelector('.post-description') as HTMLElement;
            const authorElement = postElement.querySelector('.post-author') as HTMLElement;
            const dateElement = postElement.querySelector('.post-date') as HTMLElement;
            const imageElement = postElement.querySelector('.post-image') as HTMLImageElement;
            const tagsElement = postElement.querySelector('.post-tags') as HTMLElement;
            const readingTimeElement = postElement.querySelector('.post-reading-time') as HTMLElement;
            const commentsElement = postElement.querySelector('.post-comments') as HTMLElement;
            const likesElement = postElement.querySelector('.post-likes') as HTMLElement;
        
            if (titleElement) titleElement.textContent = post.title ?? '';
            if (descriptionElement) descriptionElement.innerHTML = post.description ?? '';
            if (authorElement) authorElement.textContent = post.author ?? '';
            if (dateElement) dateElement.textContent = post.date ?? '';
            if (imageElement) {
                if (post.image) {
                    imageElement.src = post.image;
                    imageElement.alt = 'Post Image';
                    imageElement.parentElement?.classList.remove('d-none');
                } else {
                    imageElement.parentElement?.classList.add('d-none');
                }
            }
            if (tagsElement) tagsElement.textContent = post.tags?.join(', ') ?? '';
            if (readingTimeElement) readingTimeElement.textContent = `Время чтения: ${post.readingTime ?? ''}`;
            if (commentsElement) commentsElement.textContent = post.comments ?? '';
            if (likesElement) likesElement.textContent = post.likes ?? '';
        
            postsContainer.appendChild(postElement);
        });
        
        
    } catch (error) {
        console.error('Ошибка при выполнении GET-запроса:', (error as Error).message);
    }
});