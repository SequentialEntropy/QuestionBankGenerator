import { getQuestionById } from "../question/question.mjs";

export default async function auth(req, res, next) {
    const question = await getQuestionById(req.params.questionId);

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