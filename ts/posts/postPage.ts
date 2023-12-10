import { displayComments } from "../comments/displayComment.js";
import { PostData, getPost} from "./getPostInformation.js";
import { updateCommentUI } from "../comments/showAuthorizideCommentElement.js";
import { formatDateTime } from "../additionService/changeDateType.js";
import { AddressData, getAddressChain } from "../addresses/getAddresschain.js";
import { createStringFromAddressObjects } from "../additionService/doStringForAddress.js";
import { truncateText } from "./showFullPost.js";


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
                
            } else {
                console.error('ID поста не найден в URL.');
            }
        } else {
        }
    } catch (error) {
        console.error('Ошибка при загрузке поста:', (error as Error).message);
    }
});


const displayPost = async (post: PostData) => {
    const postContainer = document.getElementById('postEl');
    if (!postContainer) {
        console.error('Элемент "postContainer" не найден.');
        return;
    }

    postContainer.innerHTML = '';

    const postTemplate = document.getElementById('postExample') as HTMLTemplateElement;
    const newPost = document.importNode(postTemplate.content, true);

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
    const communityNameElement = newPost.querySelector('.post-community') as HTMLElement;
    const postAddressElement = newPost.querySelector('.post-address') as HTMLElement;

    if (postAddressElement) {
        if(post.addressId === null){
            postAddressElement.textContent = 'Кажется, создатель этого поста не указал адрес :('
        }
        else{
            const addressArray: AddressData[] = await getAddressChain(post.addressId);
            const addressString = await createStringFromAddressObjects(addressArray)
            postAddressElement.textContent = addressString;
        }
    }
    
    
    if (titleElement) {
        titleElement.textContent = post.title ?? '';
    }
    if (descriptionElement) {
        descriptionElement.innerHTML = post.description ?? '';
        truncateText(descriptionElement, 150);
    }
    if (authorElement) authorElement.textContent = post.author ?? '';
    if (dateElement) {
        const formattedDate = await formatDateTime(post.createTime);

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
        } else {
            imageElement.parentElement?.classList.add('d-none');
        }
    }
    if(communityNameElement){
        communityNameElement.textContent = post.communityName ?? 'Без группы';
    }

    if (tagsElement) {
        const tagNames = post.tags?.map(tag => `#${tag.name}`).join(' ') ?? '';
        tagsElement.textContent = tagNames;
    }

    if (readingTimeElement) readingTimeElement.textContent = `Время чтения: ${post.readingTime ?? ''} минут`;
    if (commentsElement) commentsElement.textContent = post.commentsCount?.toString() ?? '0';
    if (likesElement) likesElement.textContent = post.likes?.toString() ?? '';
    const likeIconElement = newPost.querySelector(`.post[data-post-id="${post.id}"] .like-icon`);

    if (likeIconElement) {
        likeIconElement.setAttribute('src', post.hasLike ? '../image/heartLiked.png' : '../image/heartUnliked.png');
    }

    postContainer.appendChild(newPost);
};
