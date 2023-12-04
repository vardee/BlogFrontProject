import { getCommentTree } from "./getComment.js";
export const displayComments = async (post) => {
    const commentContainer = document.getElementById('commentsContainer');
    const subCommentsContainer = document.getElementById('subCommentsContainer');
    console.log("asdkjawidiuawuidhawiudhwa");
    if (!commentContainer) {
        console.error('Элемент "commentsContainer" не найден.');
        return;
    }
    if (!subCommentsContainer) {
        console.error('Элемент "subCommentsContainer" не найден.');
        return;
    }
    console.log("asdkjawidiuawuidhawiudhwa");
    commentContainer.innerHTML = '';
    subCommentsContainer.innerHTML = ''; // Очищаем контейнер для сабкомментариев
    const commentTemplate = document.getElementById('commentExample');
    const displayCommentAndSubComments = async (commentData) => {
        const newComment = document.importNode(commentTemplate.content, true);
        const commentElement = newComment.querySelector('.comment');
        const commentAuthorElement = newComment.querySelector('.comment-author');
        const commentDateElement = newComment.querySelector('.comment-date');
        const commentContentElement = newComment.querySelector('.comment-text');
        if (commentAuthorElement) {
            commentAuthorElement.textContent = commentData.author;
        }
        if (commentDateElement) {
            commentDateElement.textContent = commentData.createTime;
        }
        if (commentContentElement) {
            if (commentData.deleteDate) {
                commentContentElement.textContent = 'Комментарий удален';
            }
            else {
                commentContentElement.textContent = commentData.content;
            }
        }
        if (commentData.subComments > 0) {
            const subCommentsArray = await getCommentTree(commentData.id);
            console.log(subCommentsArray);
            if (Array.isArray(subCommentsArray) && subCommentsArray.length > 0) {
                const subCommentsContainerElement = newComment.querySelector('.sub-comments');
                if (subCommentsContainerElement) {
                    subCommentsArray.forEach(async (subComment) => {
                        await displayCommentAndSubComments(subComment);
                    });
                    if (commentData.deleteDate) {
                        subCommentsContainerElement.textContent = 'Комментарий удален';
                    }
                    else {
                        subCommentsContainerElement.appendChild(newComment);
                    }
                }
            }
        }
        else {
            if (commentData.deleteDate) {
                commentElement.textContent = 'Комментарий удален';
            }
            else {
                commentContainer.appendChild(newComment);
            }
        }
    };
    post.comments.forEach(async (comment) => {
        await displayCommentAndSubComments(comment);
    });
};
