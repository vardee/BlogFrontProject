import { formatDateTime } from "../additionService/changeDateType.js";
import { showAllSubComments } from "../additionService/showSubComments.js";
import { getCommentTree } from "./getComment.js";
export const displayComments = async (post) => {
    const commentContainer = document.getElementById('commentsContainer');
    if (!commentContainer) {
        console.error('Элемент "commentsContainer" не найден.');
        return;
    }
    commentContainer.innerHTML = '';
    const commentTemplate = document.getElementById('commentExample');
    const displayCommentAndSubComments = async (commentData, container) => {
        const newComment = document.importNode(commentTemplate.content, true).firstElementChild;
        const commentId = commentData.id;
        const commentIdElement = newComment.querySelector('.comment-details');
        const commentAuthorElement = newComment.querySelector('.comment-author');
        const commentDateElement = newComment.querySelector('.comment-date');
        const commentContentElement = newComment.querySelector('.comment-text');
        const subCommentsContainerElement = newComment.querySelector('.sub-comments');
        const mainComment = newComment.querySelector('.top-level-comment');
        if (commentIdElement) {
            commentIdElement.dataset.commentId = commentId;
        }
        if (commentAuthorElement) {
            commentAuthorElement.textContent = commentData.author;
        }
        if (commentDateElement) {
            commentDateElement.textContent = await formatDateTime(commentData.createTime);
        }
        if (commentContentElement) {
            if (commentData.deleteDate) {
                commentContentElement.textContent = 'Комментарий удален';
                commentDateElement.textContent = 'Комментарий удален';
            }
            else {
                commentContentElement.textContent = commentData.content;
            }
        }
        if (commentData.subComments > 0) {
            showAllSubComments(subCommentsContainerElement);
            const subCommentsArray = await getCommentTree(commentData.id);
            if (Array.isArray(subCommentsArray) && subCommentsArray.length > 0) {
                for (const subComment of subCommentsArray) {
                    if (subComment.subComments > 0) {
                        subComment.subComments = 0;
                    }
                    await displayCommentAndSubComments(subComment, subCommentsContainerElement);
                }
            }
        }
        if (!commentData.deleteDate || commentData.subComments > 0) {
            container.appendChild(newComment);
        }
    };
    for (const comment of post.comments) {
        await displayCommentAndSubComments(comment, commentContainer);
    }
};
