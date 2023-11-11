import { defineStore } from 'pinia';
import { Comment } from '../models/comment';
import { ref } from 'vue';

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref<Comment[]>([]);

  function populateComments(allComents: Comment[]) {
    comments.value = allComents;
  }

  function updateComment(comment: Comment) {
    const index = comments.value.findIndex(
      (item) => item.id === comment.id && item.postId === comment.postId
    );

    if (index !== -1) {
      comments.value[index] = comment;
    }
  }

  return { comments: comments, populateComments, updateComment };
});
