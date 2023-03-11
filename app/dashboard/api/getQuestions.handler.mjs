import { getQuestionById } from "../../question/question.mjs";

export default async function getQuestions(req, res) {
    
    const questions = req.user.getQuestions();
    
    const questionNames = Promise.all(questions.map(async questionId => {

        const questionInstance = await getQuestionById(questionId);

        const questionName = questionInstance.getName();

        return {
            id: questionId,
            name: questionName
        }
    }))

    res.json(await questionNames)

}