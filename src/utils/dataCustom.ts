
import {  ParticipantData } from '../interfaces/community.interface.js';
import { IncludeCompany, SelectDateTemplateContent } from '../interfaces/userChallenge.interface.js';
import { isSameDate } from './record.js'



const commentDataCustom = async(
    inputData: any

) => {

    const result: any[] = [];

    inputData.forEach((comment: { comment_id: any; comment_group: string; }) => {
    const existingComment = result.find(item => item.comment_group === 'F' && item.comment_id === comment.comment_id);

    if (existingComment) {
        // Add the comment to the "reply" array of the existing "F" comment
        existingComment.reply.push({
            ...comment,
            reply: []
        });
    } else if (comment.comment_group === '-1') {
        // Create a new object for the main comment and initialize the "reply" array
        const mainComment = {
            ...comment,
            reply: []
        };

        // Find replies with the same comment_id
        const replies = inputData.filter((reply: { comment_group: string; }) => reply.comment_group !== '-1' && reply.comment_group === comment.comment_id);

        // Add replies to the "reply" array
        mainComment.reply = replies.map((reply: any) => ({ ...reply, reply: [] }));

        // Add the main comment to the result array
        result.push(mainComment);
    }
});

return result

}

export {
    commentDataCustom

}



