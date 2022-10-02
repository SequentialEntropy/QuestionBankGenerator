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

router.get("/api/:questionId", async (req, res) => {
    const question = await auth(req, res);

    if (!question) {
        return;
    }

    res.json(question._data());
})





async function auth(req, res) {
    const question = await getQuestionById(req.params.questionId);

    if (!question) {
        res.sendStatus(404);
        return false;
    }

    if (req.session.userId != question.getOwner()) {
        res.sendStatus(403);
        return false;
    }

    return question;
}

export { router };