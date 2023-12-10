export interface CommentData{
    id: string;
    createTime: string;
    content: string;
    modifiedDate: string;
    deleteDate: string;
    authorId: string;
    author: string;
    subComments: number;
}

export async function getCommentTree(commentId: string): Promise<CommentData> {
    const commentDataURL = `https://blog.kreosoft.space/api/comment/${commentId}/tree`;
    const token = localStorage.getItem('token');
    if (commentDataURL == `https://blog.kreosoft.space/api/comment/${commentId}/tree`) {
        try {
            const response = await fetch(commentDataURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`Сетевой ответ не был успешным: ${response.statusText}`);
            }

            return await response.json() as CommentData;
        } catch (error: any) {
            console.error('Ошибка при получении комментов:', error.message);
            throw error;
        }
    } else {
        console.log('Произошла ошибка');
        throw new Error('Произошла ошибка');
    }
}
