import { displayComments } from "../comments/displayComment.js";
import { getPost } from "./getPostInformation.js";
import { updateCommentUI } from "../comments/showAuthorizideCommentElement.js";
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const path = window.location.pathname;
        if (path.startsWith("/post/")) {
            const postId = path.split("/")[2];
            if (postId) {
                const postData = await getPost(postId);
                await displayPost(postData);
                await displayComments(postData);
                updateCommentUI(postId);
            }
            else {
                console.error('ID поста не найден в URL.');
            }
        }
        else {
            console.log("vsepiszdec");
        }
    }
    catch (error) {
        console.error('Ошибка при загрузке поста:', error.message);
    }
});
const displayPost = (post) => {
    const postContainer = document.getElementById('postEl');
    console.log("asdkjawidiuawuidhawiudhwa");
    if (!postContainer) {
        console.error('Элемент "postContainer" не найден.');
        return;
    }
    console.log("asdkjawidiuawuidhawiudhwa");
    postContainer.innerHTML = '';
    const postTemplate = document.getElementById('postExample');
    const newPost = document.importNode(postTemplate.content, true);
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
    if (titleElement) {
        titleElement.textContent = post.title ?? '';
    }
    if (descriptionElement)
        descriptionElement.innerHTML = post.description ?? '';
    if (authorElement)
        authorElement.textContent = post.author ?? '';
    if (dateElement) {
        const formattedDate = post.createTime ?? 'Некорректная дата';
        dateElement.textContent = formattedDate;
    }
    if (postElement) {
        postElement.dataset.postId = post.id;
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
        commentsElement.textContent = post.commentsCount?.toString() ?? '0';
    if (likesElement)
        likesElement.textContent = post.likes?.toString() ?? '';
    const likeIconElement = newPost.querySelector(`.post[data-post-id="${post.id}"] .like-icon`);
    if (likeIconElement) {
        likeIconElement.setAttribute('src', post.hasLike ? '../image/heartLiked.png' : '../image/heartUnliked.png');
    }
    postContainer.appendChild(newPost);
};
