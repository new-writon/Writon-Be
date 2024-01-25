
import {  CommentWithReplies, ParticipantData, SelectComment } from '../interfaces/community.interface.js';
import { IncludeCompany, SelectDateTemplateContent } from '../interfaces/userChallenge.interface.js';
import { isSameDate } from './record.js'




const commentDataCustom = async (
    commentData : SelectComment[]
  )=> {
    const result: CommentWithReplies[] = [];
  
    commentData.forEach((comment: SelectComment) => {
      const existingComment = result.find(
        (item) => item.comment_group === '-1' && item.comment_id === comment.comment_id
      );
  
      if (existingComment) {
        existingComment.reply.push({
          ...comment,
          reply: [],
        });
      } else if (comment.comment_group === '-1') {
        const mainComment: CommentWithReplies = {
          ...comment,
          reply: [],
        };
  
     
        const replies = commentData.filter(
          (reply) =>
            reply.comment_group !== '-1' &&
            reply.comment_group === comment.comment_id
        );
  

        mainComment.reply = replies.map((reply) => ({
          ...reply,
          reply: [],
        }));
  
        result.push(mainComment);
      }
    });
  
    return result;
  };









export {
    commentDataCustom

}



