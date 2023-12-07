interface PostData {
    title: string;
    description: string;
    image?: string;
    readingTime: number;
    addressId?: string;
    tags: string[];
}

document.getElementById('writePostForm')?.addEventListener('submit', async function (event) {
    event.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
        console.log('Пользователь не авторизован');
        return;
    }

    const postTitle = (document.getElementById('postTitle') as HTMLInputElement).value;
    const postDescription = (document.getElementById('postDescription') as HTMLTextAreaElement).value;
    const imageLink = (document.getElementById('imageLink') as HTMLInputElement).value;
    const selectedTagsElement = document.getElementById('tagsElements') as HTMLSelectElement;
    const selectedTags = Array.from(selectedTagsElement.selectedOptions).map(option => option.value);
    const readingTime = (document.getElementById('readingTime') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;

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

    console.log(JSON.stringify(requestData));
    const writePostURL = 'https://blog.kreosoft.space/api/post';

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
    } catch (error) {
        console.error('Ошибка создания поста:', (error as Error).message);
    }
});
