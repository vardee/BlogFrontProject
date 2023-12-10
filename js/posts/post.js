import { formatDateTime } from "../additionService/changeDateType.js";
import { truncateText } from "./showFullPost.js";
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOMContentLoaded event triggered');
    await loadPosts();
});
window.addEventListener('popstate', async () => {
    console.log('popstate event triggered');
    try {
        await loadPosts();
        console.log('loadPosts executed successfully');
    }
    catch (error) {
        console.error('Error in loadPosts:', error);
    }
});
document.getElementById('filterForm')?.addEventListener('submit', async function (event) {
    event.preventDefault();
    console.log('Filter form submitted');
    await applyFilters();
});
document.getElementById('pagination')?.addEventListener('click', async function (event) {
    event.preventDefault();
    const target = event.target;
    const page = target.dataset.page;
    if (page) {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('page', page);
        window.history.pushState({}, '', `?${urlParams.toString()}`);
        await loadPosts();
    }
});
const loadPosts = async () => {
    console.log('loadPosts function called');
    const urlParams = new URLSearchParams(window.location.search);
    const apiUrl = 'https://blog.kreosoft.space/api/post';
    const url = new URL(apiUrl);
    const token = localStorage.getItem('token');
    url.search = urlParams.toString();
    try {
        const response = await fetch(url.toString(), {
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
        const pageCount = data.pagination.count;
        const current = data.pagination.current;
        console.log(pageCount);
        updatePagination(pageCount, current);
        const postsContainer = document.getElementById('posts');
        if (!postsContainer) {
            console.error('Элемент "postsContainer" не найден.');
            return;
        }
        postsContainer.innerHTML = '';
        const postTemplate = document.getElementById('postTemplate');
        posts.forEach(async (post) => {
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
            const communityNameElement = newPost.querySelector('.post-community');
            if (titleElement) {
                titleElement.textContent = post.title ?? '';
                const postLink = titleElement.closest('.post-link');
                if (postLink) {
                    postLink.href = `/post/${post.id}`;
                }
            }
            if (communityNameElement) {
                communityNameElement.textContent = post.communityName ?? 'Без группы';
            }
            if (descriptionElement) {
                descriptionElement.innerHTML = post.description ?? '';
                truncateText(descriptionElement, 150);
            }
            if (authorElement)
                authorElement.textContent = post.author ?? '';
            if (dateElement) {
                const formattedDate = post.createTime ?? ' ';
                const normalDate = await formatDateTime(post.createTime);
                dateElement.textContent = normalDate;
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
                const tagNames = post.tags?.map(tag => `#${tag.name}`).join(' ') ?? '';
                tagsElement.textContent = tagNames;
            }
            if (readingTimeElement)
                readingTimeElement.textContent = `Время чтения: ${post.readingTime ?? ''} минут`;
            if (commentsElement)
                commentsElement.textContent = post.commentsCount ?? 0;
            if (likesElement)
                likesElement.textContent = post.likes ?? '';
            const likeIconElement = newPost.querySelector(`.post[data-post-id="${postId}"] .like-icon`);
            if (likeIconElement) {
                likeIconElement.setAttribute('src', post.hasLike ? '../image/heartLiked.png' : '../image/heartUnliked.png');
            }
            postsContainer.appendChild(newPost);
        });
    }
    catch (error) {
        console.error('Ошибка при выполнении GET-запроса:', error.message);
    }
};
const applyFilters = async () => {
    console.log('applyFilters function called');
    const tags = Array.from(document.getElementById('tagsElements').selectedOptions).map(option => option.value);
    const author = document.getElementById('author').value;
    const minReadingTime = document.getElementById('minReadingTime').value;
    const maxReadingTime = document.getElementById('maxReadingTime').value;
    const sorting = document.getElementById('sorting').value;
    const onlyMyCommunities = document.getElementById('onlyMyCommunities').checked;
    let size = document.getElementById('size').value;
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
    params.set('size', size);
    window.history.pushState({}, '', `?${params.toString()}`);
    await loadPosts();
};
const updatePagination = (pageCount, currentPage) => {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) {
        console.error('Элемент "pagination" не найден.');
        return;
    }
    paginationContainer.innerHTML = '';
    const maxVisiblePages = 10;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, pageCount);
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }
    for (let i = startPage; i <= endPage; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = 'page-item';
        const pageLink = document.createElement('a');
        pageLink.className = 'page-link';
        pageLink.href = '#';
        pageLink.setAttribute('data-page', i.toString());
        pageLink.textContent = i.toString();
        if (i === currentPage) {
            pageItem.classList.add('active');
        }
        pageLink.addEventListener('click', async (event) => {
            event.preventDefault();
            const target = event.target;
            const page = target.dataset.page;
            if (page) {
                const urlParams = new URLSearchParams(window.location.search);
                urlParams.set('page', page);
                window.history.pushState({}, '', `?${urlParams.toString()}`);
                await loadPosts();
            }
        });
        pageItem.appendChild(pageLink);
        paginationContainer.appendChild(pageItem);
    }
};
console.log('Calling loadPosts from the beginning');
await loadPosts();
