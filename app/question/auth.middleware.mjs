import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

import { getQuestionById } from "./question.mjs";

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

    if (!req.session.hasOwnProperty("userId")) {
        req.session.redirect = `/question${req.url}`;
        res.redirect("/login");
        return;
    }

    if (req.session.userId != question.getOwner()) {
        res.render(`${__dirname}/client/noPermission.views.ejs`);
        return;
    }

    req.question = question;
    next();
}