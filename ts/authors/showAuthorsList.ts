import { getAuthorsList, AuthorsData } from "./getAuthors.js";

export const displayAuthors = async () => {
    const authorsContainer = document.getElementById('authorContainer');

    if (!authorsContainer) {
        console.error('Элемент "authorContainer" не найден.');
        return;
    }

    const authorTemplate = document.getElementById('authorTemplate') as HTMLTemplateElement;

    if (!authorTemplate) {
        console.error('Элемент "authorTemplate" не найден.');
        return;
    }

    authorsContainer.innerHTML = '';

    try {
        const authorData: AuthorsData[] = await getAuthorsList();

        const sortedAuthors = authorData.sort((a, b) => {
            const aPopularity = a.posts * 10 + a.likes;
            const bPopularity = b.posts * 10 + b.likes;
            return bPopularity - aPopularity;
        });

        const mostPopularAuthors = sortedAuthors.slice(0, 3);

        authorData.forEach(async (author: AuthorsData) => {
            const authorInstance = document.importNode(authorTemplate.content, true);
            const authorName = authorInstance.querySelector('.author-name') as HTMLElement;
            const createdDate = authorInstance.querySelector('.created-date') as HTMLElement;
            const birthDate = authorInstance.querySelector('.birthdate') as HTMLElement;
            const postCount = authorInstance.querySelector('.post-count') as HTMLElement;
            const likeCount = authorInstance.querySelector('.like-count') as HTMLElement;
            const avatarContainer = authorInstance.querySelector('.avatar-container') as HTMLElement;
            const avatarImage = authorInstance.querySelector('.avatar-img') as HTMLImageElement;
            const goldCrown = authorInstance.querySelector('.crowned-avatar.gold') as HTMLImageElement;
            const silverCrown = authorInstance.querySelector('.crowned-avatar.silver') as HTMLImageElement;
            const bronzeCrown = authorInstance.querySelector('.crowned-avatar.bronze') as HTMLImageElement;

            if (authorName) {
                authorName.textContent = author.fullName;
            }
            if (createdDate) {
                createdDate.textContent = author.created;
            }
            if (birthDate) {
                birthDate.textContent = author.birthDate;
            }
            if (postCount) {
                postCount.textContent = String(author.posts);
            }
            if (likeCount) {
                likeCount.textContent = String(author.likes);
            }

            if (author.gender === 'Male') {
                avatarImage.src = '../image/man.png';
            } else if (author.gender === 'Female') {
                avatarImage.src = '../image/human.png';
            } else {
                avatarImage.src = 'default.png';
            }
            
            if (mostPopularAuthors[0] === author) {
                goldCrown.style.display = 'block';
            } else if (mostPopularAuthors[1] === author) {
                silverCrown.style.display = 'block';
            } else if (mostPopularAuthors[2] === author) {
                bronzeCrown.style.display = 'block';
            }

            authorsContainer.appendChild(authorInstance);
        });
    } catch (error) {
        console.error('Ошибка при отображении сообществ:', (error as Error).message);
    }
};