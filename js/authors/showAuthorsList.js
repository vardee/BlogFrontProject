import { getAuthorsList } from "./getAuthors.js";
import { formatDateTimeAuthors } from "../additionService/changeDateType.js";
export const displayAuthors = async () => {
    const authorsContainer = document.getElementById('authorContainer');
    if (!authorsContainer) {
        console.error('Элемент "authorContainer" не найден.');
        return;
    }
    const authorTemplate = document.getElementById('authorTemplate');
    if (!authorTemplate) {
        console.error('Элемент "authorTemplate" не найден.');
        return;
    }
    authorsContainer.innerHTML = '';
    try {
        const authorData = await getAuthorsList();
        const sortedAuthors = authorData.sort((a, b) => {
            const aPopularity = a.posts * 10 + a.likes;
            const bPopularity = b.posts * 10 + b.likes;
            return bPopularity - aPopularity;
        });
        const mostPopularAuthors = sortedAuthors.slice(0, 3);
        authorData.forEach(async (author) => {
            const authorInstance = document.importNode(authorTemplate.content, true);
            const authorName = authorInstance.querySelector('.author-name');
            const createdDate = authorInstance.querySelector('.created-date');
            const birthDate = authorInstance.querySelector('.birthdate');
            const postCount = authorInstance.querySelector('.post-count');
            const likeCount = authorInstance.querySelector('.like-count');
            const avatarContainer = authorInstance.querySelector('.avatar-container');
            const avatarImage = authorInstance.querySelector('.avatar-img');
            const goldCrown = authorInstance.querySelector('.crowned-avatar.gold');
            const silverCrown = authorInstance.querySelector('.crowned-avatar.silver');
            const bronzeCrown = authorInstance.querySelector('.crowned-avatar.bronze');
            if (authorName) {
                authorName.textContent = author.fullName;
            }
            if (createdDate) {
                createdDate.textContent = await formatDateTimeAuthors(author.created);
            }
            if (birthDate) {
                birthDate.textContent = await formatDateTimeAuthors(author.birthDate);
            }
            if (postCount) {
                postCount.textContent = String(author.posts);
            }
            if (likeCount) {
                likeCount.textContent = String(author.likes);
            }
            if (author.gender === 'Male') {
                avatarImage.src = '../image/man.png';
            }
            else if (author.gender === 'Female') {
                avatarImage.src = '../image/human.png';
            }
            else {
                avatarImage.src = 'default.png';
            }
            if (mostPopularAuthors[0] === author) {
                goldCrown.style.display = 'block';
            }
            else if (mostPopularAuthors[1] === author) {
                silverCrown.style.display = 'block';
            }
            else if (mostPopularAuthors[2] === author) {
                bronzeCrown.style.display = 'block';
            }
            authorsContainer.appendChild(authorInstance);
        });
    }
    catch (error) {
        console.error('Ошибка при отображении сообществ:', error.message);
    }
};
