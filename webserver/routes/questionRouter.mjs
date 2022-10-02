import { dirname, join } from "path";
import { fileURLToPath } from "url";

import express from "express";

import { Question, getQuestionById } from "../../questions/question.mjs";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

const router = express.Router();





router.get("/", (req, res) => {
    res.render("pages/question");
})

router.get("/api/:questionId", auth, (req, res) => {
    res.json(req.question._data());
})

router.get("/api/:questionId/createStep", auth, (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(req.question.createStep().toString());
})

router.get("/api/:questionId/getSteps", auth, (req, res) => {
    res.json({length: req.question.getSteps().length});
})





async function auth(req, res, next) {
    const question = await getQuestionById(req.params.questionId);

    if (!question) {
        res.sendStatus(404);
        return;
    }

    if (req.session.userId != question.getOwner()) {
        res.sendStatus(403);
        return;
    }

    req.question = question;
    next();
}

export { router };