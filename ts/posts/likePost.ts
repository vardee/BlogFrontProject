
import { getPost } from "./getPostInformation.js";


export async function likePost(postId: string) {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('Token not found in localStorage');
        return;
    }

    const likeEndpoint = `https://blog.kreosoft.space/api/post/${postId}/like`;

    try {
        const response = await fetch(likeEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Сетевой ответ не был успешным');
        }

        await updateUI(postId);
    } catch (error) {
        console.error('Ошибка при постановке лайка:', (error as Error).message);
    }
}

export async function unlikePost(postId: string) {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('Token not found in localStorage');
        return;
    }

    const likeEndpoint = `https://blog.kreosoft.space/api/post/${postId}/like`;

    try {
        const response = await fetch(likeEndpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Сетевой ответ не был успешным');
        }

        await updateUI(postId);
    } catch (error) {
        console.error('Ошибка при снятии лайка:', (error as Error).message);
    }
}

export async function updateUI(postId: string) {
    try {
        console.log('Обновление UI для postId:', postId);
        const updatedPostData: { likes: number, hasLike: boolean } = await getPost(postId);
        const likesElement = document.querySelector(`.post[data-post-id="${postId}"] .post-likes`);
        const likeIconElement = document.querySelector(`.post[data-post-id="${postId}"] .like-icon`);        

        if (likesElement) {
            console.log("asjidgiwaugdiuawuid")
            likesElement.textContent = String(updatedPostData.likes);
        }
        if (likeIconElement) {
            console.log("asjidgiwaugdiuawuid")
            likeIconElement.setAttribute('src', updatedPostData.hasLike ? '../image/heartLiked.png' : '../image/heartUnliked.png');
        }
    } catch (error) {
        console.error('Ошибка при обновлении UI:', (error as Error).message);
    }
}
