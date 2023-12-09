"use strict";
document.getElementById('writePostForm')?.addEventListener('submit', async function (event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('Пользователь не авторизован');
        return;
    }
    const postTitle = document.getElementById('postTitle').value;
    const postDescription = document.getElementById('postDescription').value;
    const imageLink = document.getElementById('imageLink').value;
    const selectedTagsElement = document.getElementById('tagsElements');
    const selectedTags = Array.from(selectedTagsElement.selectedOptions).map(option => option.value);
    const readingTime = document.getElementById('readingTime').value;
    const address = document.getElementById('address').value;
    const communitiesSelect = document.getElementById('communities');
    const requestData = {
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
    // Получение ID выбранной группы
    const selectedCommunityId = communitiesSelect.value;
    console.log(selectedCommunityId);
    let writePostURL = "";
    if (selectedCommunityId) {
        writePostURL = `https://blog.kreosoft.space/api/community/${selectedCommunityId}/post`;
    }
    else {
        writePostURL = 'https://blog.kreosoft.space/api/post';
    }
    console.log(JSON.stringify(requestData));
    console.log(writePostURL);
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
    }
    catch (error) {
        console.error('Ошибка создания поста:', error.message);
    }
});
