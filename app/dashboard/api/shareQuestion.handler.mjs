import { getUserByName } from "../../user/user.mjs";

export default async function shareQuestion(req, res) {
    const questionId = req.body.id;
    
    const recipentUser = req.body.recipent;

    if (recipentUser == req.user.getName()) {
        res.statusCode = 400;
        res.json({
            message: "You cannot send a question to yourself!"
        })
        return
    }

    const recipentUserInstance = await getUserByName(recipentUser);
    
    if (recipentUserInstance === false) {
        res.statusCode = 400;
        res.json({
            message: `The user "${recipentUser}" does not exist!`
        })
        return
    }

    recipentUserInstance.shareQuestion(questionId);

    res.statusCode = 200;
    res.json({
        message: "Shared successfully!"
    })
}