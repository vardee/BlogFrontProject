import { getTags } from "./tags.js";
document.getElementById('filterForm')?.addEventListener('submit', async function (event) {
    console.log('Форма отправлена');
    event.preventDefault();

    const tags = Array.from((document.getElementById('tagsElements') as HTMLSelectElement).selectedOptions).map(option => option.value);
    const author = (document.getElementById('author') as HTMLInputElement).value;
    const minReadingTime = (document.getElementById('minReadingTime') as HTMLInputElement).value;
    const maxReadingTime = (document.getElementById('maxReadingTime') as HTMLInputElement).value;
    const sorting = (document.getElementById('sorting') as HTMLSelectElement).value;
    const onlyMyCommunities = (document.getElementById('onlyMyCommunities') as HTMLInputElement).checked;
    let page = (document.getElementById('page') as HTMLInputElement).value;
    let size = (document.getElementById('size') as HTMLInputElement).value;

    console.log(tags)
    if (page.trim() === '') {
        page = '1';
    }
    if (size.trim() === '') {
        size = '5';
    }

    const params = new URLSearchParams();
    tags.forEach(tag => params.append('tags', tag));
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
    console.log(`${url.toString()}?${params.toString()}`)
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

        posts.forEach((post: { hasLike: boolean; id: string; title: string; description: string; author: string; date: string; image: string; tags: any[]; readingTime: any; commentsCount: any; likes: string; }) => {
            const newPost = document.importNode(postTemplate.content, true);
            const postId = post.id;
            const postElement = newPost.querySelector('.post') as HTMLElement;
            const titleElement = newPost.querySelector('.post-title') as HTMLElement;
            const descriptionElement = newPost.querySelector('.post-description') as HTMLElement;
            const authorElement = newPost.querySelector('.post-author') as HTMLElement;
            const dateElement = newPost.querySelector('.post-date') as HTMLElement;
            const imageElement = newPost.querySelector('.post-image') as HTMLImageElement;
            const tagsElement = newPost.querySelector('.post-tags') as HTMLElement;
            const readingTimeElement = newPost.querySelector('.post-reading-time') as HTMLElement;
            const commentsElement = newPost.querySelector('.post-comments') as HTMLElement;
            const likesElement = newPost.querySelector('.post-likes') as HTMLElement;
            if (titleElement) titleElement.textContent = post.title ?? '';
            if (descriptionElement) descriptionElement.innerHTML = post.description ?? '';
            if (authorElement) authorElement.textContent = post.author ?? '';
            if (dateElement) {
                const formattedDate = post.date ?? 'Некорректная дата';
                dateElement.textContent = formattedDate;
            }
            if (postElement) {
                postElement.dataset.postId = postId;
            }
            if (imageElement) {
                if (post.image) {
                    imageElement.src = post.image;
                    imageElement.alt = 'Post Image';
                    imageElement.parentElement?.classList.remove('d-none');
                } else {
                    imageElement.parentElement?.classList.add('d-none');
                }
            }
            if (tagsElement) {
                const tagNames = post.tags?.map(tag => tag.name).join(', ') ?? '';
                tagsElement.textContent = `Теги: ${tagNames}`;
            }
            if (readingTimeElement) readingTimeElement.textContent = `Время чтения: ${post.readingTime ?? ''} минут`;
            if (commentsElement) commentsElement.textContent = post.commentsCount ?? 0;
            if (likesElement) likesElement.textContent = post.likes ?? '';
            const likeIconElement = newPost.querySelector(`.post[data-post-id="${postId}"] .like-icon`);
            if (likeIconElement) {
                console.log("asjidgiwaugdiuawuid")
                likeIconElement.setAttribute('src', post.hasLike ? '../image/heartLiked.png' : '../image/heartUnliked.png');
            }
            postsContainer.appendChild(newPost);
        });
        
    } catch (error) {
        console.error('Ошибка при выполнении GET-запроса:', (error as Error).message);
    }
});
