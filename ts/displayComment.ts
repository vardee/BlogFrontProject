import { PostData, getPost } from "./getPostInformation.js";
import { CommentData, getCommentTree } from "./getComment.js";

export const displayComments = async (post: PostData) => {
    const commentContainer = document.getElementById('commentsContainer');
    console.log("asdkjawidiuawuidhawiudhwa");
    if (!commentContainer) {
        console.error('Элемент "commentsContainer" не найден.');
        return;
    }
    console.log("asdkjawidiuawuidhawiudhwa");

    commentContainer.innerHTML = '';

    const commentTemplate = document.getElementById('commentExample') as HTMLTemplateElement;

    const displayCommentAndSubComments = async (commentData: CommentData, container: HTMLElement) => {
        const newComment = (document.importNode(commentTemplate.content, true) as DocumentFragment).firstElementChild as HTMLElement;

        const commentAuthorElement = newComment.querySelector('.comment-author') as HTMLElement;
        const commentDateElement = newComment.querySelector('.comment-date') as HTMLElement;
        const commentContentElement = newComment.querySelector('.comment-text') as HTMLElement;
        const subCommentsContainerElement = newComment.querySelector('.sub-comments') as HTMLElement;

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
