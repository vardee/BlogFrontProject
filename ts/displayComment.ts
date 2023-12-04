import { PostData, getPost } from "./getPostInformation.js";
import { CommentData, getCommentTree } from "./getComment.js";

export const displayComments = async (post: PostData) => {
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

    const commentTemplate = document.getElementById('commentExample') as HTMLTemplateElement;

    const displayCommentAndSubComments = async (commentData: CommentData) => {
        const newComment = document.importNode(commentTemplate.content, true);
    
        const commentElement = newComment.querySelector('.comment') as HTMLElement;
        const commentAuthorElement = newComment.querySelector('.comment-author') as HTMLElement;
        const commentDateElement = newComment.querySelector('.comment-date') as HTMLElement;
        const commentContentElement = newComment.querySelector('.comment-text') as HTMLElement;
    
        if (commentAuthorElement) {
            commentAuthorElement.textContent = commentData.author;
        }
    
        if (commentDateElement) {
            commentDateElement.textContent = commentData.createTime;
        }
    
        if (commentContentElement) {
            if (commentData.deleteDate) {
                commentContentElement.textContent = 'Комментарий удален';
            } else {
                commentContentElement.textContent = commentData.content;
            }
        }
    
        if (commentData.subComments > 0) {
            const subCommentsArray = await getCommentTree(commentData.id);
            console.log(subCommentsArray);
            if (Array.isArray(subCommentsArray) && subCommentsArray.length > 0) {
                const subCommentsContainerElement = newComment.querySelector('.sub-comments') as HTMLElement;
                if (subCommentsContainerElement) {
                    subCommentsArray.forEach(async (subComment) => {
                        await displayCommentAndSubComments(subComment);
                    });
                    if (commentData.deleteDate) {
                        subCommentsContainerElement.textContent = 'Комментарий удален';
                    } else {
                        subCommentsContainerElement.appendChild(newComment);
                    }
                }
            }
        } else {
            if (commentData.deleteDate) {
                commentElement.textContent = 'Комментарий удален';
            } else {
                commentContainer.appendChild(newComment);
            }
        }
    };
    
    post.comments.forEach(async (comment) => {
        await displayCommentAndSubComments(comment);
    });
    
};
