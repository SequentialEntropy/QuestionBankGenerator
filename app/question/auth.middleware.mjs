import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

import { getQuestionById } from "./question.mjs";

export default async function auth(req, res, next) {
    // Get questionId from URL
    const questionId = parseInt(req.params.questionId);
    // Check if id is a number
    if (isNaN(questionId)) {
        res.sendStatus(400);
        return;
    }
    // Get question instance
    const question = await getQuestionById(questionId);
    // Return if question doesn't exist
    if (!question) {
        res.sendStatus(404);
        return;
    }
    // Redirect if the user isn't logged in
    if (!req.session.hasOwnProperty("userId")) {
        req.session.redirect = `/question${req.url}`;
        res.redirect("/login");
        return;
    }
    // Redirect if the user if logged in but doesn't own the question
    if (req.session.userId != question.getOwner()) {
        res.render(`${__dirname}/client/noPermission.views.ejs`);
        return;
    }
    // Pass question as req property, encapsulate fetching questions
    req.question = question;
    next();
}