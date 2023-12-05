import { getCommentTree } from "./getComment.js";
export const displayComments = async (post) => {
    const commentContainer = document.getElementById('commentsContainer');
    console.log("asdkjawidiuawuidhawiudhwa");
    if (!commentContainer) {
        console.error('Элемент "commentsContainer" не найден.');
        return;
    }
    console.log("asdkjawidiuawuidhawiudhwa");
    commentContainer.innerHTML = '';
    const commentTemplate = document.getElementById('commentExample');
    const displayCommentAndSubComments = async (commentData, container) => {
        const newComment = document.importNode(commentTemplate.content, true).firstElementChild;
        const commentAuthorElement = newComment.querySelector('.comment-author');
        const commentDateElement = newComment.querySelector('.comment-date');
        const commentContentElement = newComment.querySelector('.comment-text');
        const subCommentsContainerElement = newComment.querySelector('.sub-comments');
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
                for (const subComment of subCommentsArray) {
                    if (subComment.subComments > 0) {
                        subComment.subComments = 0;
                    }
                    await displayCommentAndSubComments(subComment, subCommentsContainerElement);
                }
            }
        }
        if (!commentData.deleteDate) {
            container.appendChild(newComment);
        }
    };
    for (const comment of post.comments) {
        await displayCommentAndSubComments(comment, commentContainer);
    }
};
