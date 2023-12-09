import { getPost } from "./getPostInformation.js";
import { likePost, unlikePost , updateUI} from "./likePost.js";

document.body.addEventListener('click', async (event) => {
        const target = event.target as HTMLElement;

        if (target.classList.contains('like-icon')) {
            event.preventDefault();

            const postElement = target.closest('.post') as HTMLElement | null;
            const postId = postElement?.dataset.postId;

            if (!postId) {
                console.error('postId not found');
                return;
            }

            const post = await getPost(postId);
            const isLike = post.hasLike;

            if (isLike) {
                await unlikePost(postId);
            } else {
                await likePost(postId);
            }
        }
});
