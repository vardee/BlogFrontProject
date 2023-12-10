import { validatePostData } from "./validationCreatePost.js";

export interface PostData {
    title: string;
    description: string;
    image?: string;
    readingTime: number;
    addressId?: string;
    tags: string[];
}

document.getElementById('writePostForm')?.addEventListener('submit', async function (event) {
    event.preventDefault();
    const errorMessageElement = document.getElementById('error-message');
    if (!errorMessageElement) {
        console.error('Error message element not found');
        return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
        errorMessageElement.textContent = 'Пользователь не авторизован';
        errorMessageElement.style.display = 'block';
        return;
    }

    const postTitle = (document.getElementById('postTitle') as HTMLInputElement).value;
    const postDescription = (document.getElementById('postDescription') as HTMLTextAreaElement).value;
    const imageLink = (document.getElementById('imageLink') as HTMLInputElement).value;
    const selectedTagsElement = document.getElementById('tagsElements') as HTMLSelectElement;
    const selectedTags = Array.from(selectedTagsElement.selectedOptions).map(option => option.value);
    const readingTime = (document.getElementById('readingTime') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;
    const communitiesSelect = document.getElementById('communities') as HTMLSelectElement;

    const requestData: PostData = {
        title: postTitle,
        description: postDescription,
        readingTime: parseInt(readingTime),
        tags: selectedTags,
    };
    if (imageLink) {
        requestData.image = imageLink;
    }

    if (address) {
        requestData.addressId = address;
    }
    const validationResults = validatePostData(requestData);

    if (!validationResults.isValid) {
        errorMessageElement.textContent = validationResults.errors.join('\n');
        errorMessageElement.style.display = 'block';
        return;
    }

    const selectedCommunityId = communitiesSelect.value;

    let writePostURL = "";
    if (selectedCommunityId) {
        writePostURL = `https://blog.kreosoft.space/api/community/${selectedCommunityId}/post`;
    } else {
        writePostURL = 'https://blog.kreosoft.space/api/post';
    }
    try {
        const response = await fetch(writePostURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error('Сетевой ответ не был успешным');
        }

        const data = await response.json();
        console.log('Пост создан:', data);

        window.location.href = '/';
    } catch (error) {
        console.error('Ошибка создания поста:', (error as Error).message);
        errorMessageElement.textContent = 'Ошибка создания поста: ' + (error as Error).message;
        errorMessageElement.style.display = 'block';
    }
});
