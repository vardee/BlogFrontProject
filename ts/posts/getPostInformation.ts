export interface PostData {
    id: string;
    createTime: string;
    title: string;
    description: string;
    readingTime: number;
    image: string;
    authorId: string;
    author: string;
    communityId: string;
    communityName: string;
    addressId: string;
    likes: number;
    hasLike: boolean;
    commentsCount: number;
    tags: Array<{
        id: string;
        createTime: string;
        name: string;
    }>;
    comments: Array<{
        id: string;
        createTime: string;
        content: string;
        modifiedDate: string;
        deleteDate: string;
        authorId: string;
        author: string;
        subComments: number;
    }>;
}

export async function getPost(postId: string): Promise<PostData> {
    const postDataURL = `https://blog.kreosoft.space/api/post/${postId}`;
    const token = localStorage.getItem('token');

    if (postDataURL == `https://blog.kreosoft.space/api/post/${postId}`) {
        try {
            const response = await fetch(postDataURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`Сетевой ответ не был успешным: ${response.statusText}`);
            }

            return await response.json() as PostData;
        } catch (error: any) {
            console.error('Ошибка при получении поста:', error.message);
            throw error;
        }
    } else {
        console.log('Пользователь не авторизован');
        throw new Error('Пользователь не авторизован');
    }
}
