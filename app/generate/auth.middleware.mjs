import { getQuestionById } from "../question/question.mjs";

export default async function auth(req, res, next) {

    const questionId = parseInt(req.params.questionId);

    if (isNaN(questionId)) {
        res.sendStatus(400);
        return;
    }

    const question = await getQuestionById(questionId);

    if (!question) {
        res.sendStatus(404);
        return;
    }

    if (req.session.userId != question.getOwner()) {
        req.session.redirect = `/generate${req.url}`;
        res.redirect("/login");
        return;
    }

    req.question = question;
    next();
}