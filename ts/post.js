document.getElementById('filterForm')?.addEventListener('submit', async function (event) {
    console.log('Форма отправлена');
    event.preventDefault();
    const tags = Array.from(document.getElementById('tagsElements').selectedOptions).map(option => option.value);
    const author = document.getElementById('author').value;
    const minReadingTime = document.getElementById('minReadingTime').value;
    const maxReadingTime = document.getElementById('maxReadingTime').value;
    const sorting = document.getElementById('sorting').value;
    const onlyMyCommunities = document.getElementById('onlyMyCommunities').checked;
    let page = document.getElementById('page').value;
    let size = document.getElementById('size').value;
    console.log(tags);
    if (page.trim() === '') {
        page = '1';
    }
    if (size.trim() === '') {
        size = '5';
    }
    const params = new URLSearchParams();
    tags.forEach(tag => params.append('tags', tag));
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
    console.log(`${url.toString()}?${params.toString()}`);
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
            const newPost = document.importNode(postTemplate.content, true);
            const postId = post.id;
            const postElement = newPost.querySelector('.post');
            const titleElement = newPost.querySelector('.post-title');
            const descriptionElement = newPost.querySelector('.post-description');
            const authorElement = newPost.querySelector('.post-author');
            const dateElement = newPost.querySelector('.post-date');
            const imageElement = newPost.querySelector('.post-image');
            const tagsElement = newPost.querySelector('.post-tags');
            const readingTimeElement = newPost.querySelector('.post-reading-time');
            const commentsElement = newPost.querySelector('.post-comments');
            const likesElement = newPost.querySelector('.post-likes');
            if (titleElement)
                titleElement.textContent = post.title ?? '';
            if (descriptionElement)
                descriptionElement.innerHTML = post.description ?? '';
            if (authorElement)
                authorElement.textContent = post.author ?? '';
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
                }
                else {
                    imageElement.parentElement?.classList.add('d-none');
                }
            }
            if (tagsElement) {
                const tagNames = post.tags?.map(tag => tag.name).join(', ') ?? '';
                tagsElement.textContent = `Теги: ${tagNames}`;
            }
            if (readingTimeElement)
                readingTimeElement.textContent = `Время чтения: ${post.readingTime ?? ''} минут`;
            if (commentsElement)
                commentsElement.textContent = post.commentsCount ?? 0;
            if (likesElement)
                likesElement.textContent = post.likes ?? '';
            const likeIconElement = newPost.querySelector(`.post[data-post-id="${postId}"] .like-icon`);
            if (likeIconElement) {
                console.log("asjidgiwaugdiuawuid");
                likeIconElement.setAttribute('src', post.hasLike ? '../image/heartLiked.png' : '../image/heartUnliked.png');
            }
            postsContainer.appendChild(newPost);
        });
    }
    catch (error) {
        console.error('Ошибка при выполнении GET-запроса:', error.message);
    }
});
export {};
