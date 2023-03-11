import { getQuestionById } from "../../question/question.mjs";
import { getUserById } from "../../user/user.mjs";

export default async function getSharedQuestions(req, res) {

    const questions = req.user.getSharedQuestions();
    
    const questionNames = Promise.all(questions.map(async questionId => {

        const questionInstance = await getQuestionById(questionId);

        const questionName = questionInstance.getName();

        const questionOwnerId = questionInstance.getOwner();

        const ownerInstance = await getUserById(questionOwnerId);

        const questionOwnerName = ownerInstance.getName();

        return {
            id: questionId,
            name: questionName,
            sender: questionOwnerName
        }
    }))

    res.json(await questionNames)

}