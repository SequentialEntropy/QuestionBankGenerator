import { dirname, join } from "path";
import { fileURLToPath } from "url";

import express from "express";

import { Question, getQuestionById } from "../../questions/question.mjs";

import { templateFunctions } from "../../questions/templates.mjs";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

const router = express.Router();





router.get("/:questionId", auth, (req, res) => {
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
    res.json(req.question.getSteps());
})

router.get("/api/:questionId/moveStep/:selected/:targeted", auth, (req, res) => {
    const selected = parseInt(req.params.selected);
    const targeted = parseInt(req.params.targeted);

    if (isNaN(selected) || isNaN(targeted)) {
        res.sendStatus(400);
        return;
    }

    if (req.question.moveStep(selected, targeted)) {
        res.sendStatus(200);
        return;
    };
    res.sendStatus(404);
})

router.get("/api/:questionId/deleteStep/:selected", auth, (req, res) => {
    if (req.question.deleteStep(req.params.selected)) {
        res.sendStatus(200);
        return;
    }
    res.sendStatus(404);
})

router.get("/api/:questionId/getPrompt", auth, (req, res) => {
    res.json(req.question.getPrompt());
})

router.get("/api/:questionId/getVariables", auth, (req, res) => {
    res.json(req.question.getVariables());
})

router.get("/api/:questionId/createFunction/:sectionId/:functionType", auth, (req, res) => {
    const sectionId = parseInt(req.params.sectionId);

    if (isNaN(sectionId)) {
        res.sendStatus(400);
        return;
    }

    if (!(templateFunctions.hasOwnProperty(req.params.functionType))) {
        res.sendStatus(400);
        return;
    }

    if (!req.question.createFunction(sectionId, req.params.functionType)) {
        res.sendStatus(400);
        return;
    }

    res.sendStatus(201);
})

router.get("/api/:questionId/deleteFunction/:sectionId/:functionIndex", auth, (req, res) => {
    const sectionId = parseInt(req.params.sectionId);
    const functionIndex = parseInt(req.params.functionIndex);

    if (isNaN(sectionId) || isNaN(functionIndex)) {
        res.sendStatus(400);
        return;
    }

    if (!req.question.deleteFunction(sectionId, functionIndex)) {
        res.sendStatus(400);
        return;
    }

    res.sendStatus(200);
})

router.get("/api/:questionId/createBlock/:sectionIndex/:functionIndex/:path/:blockType/:params", auth, (req, res) => {
    if (!req.question.createBlock(req.params.sectionIndex, req.params.functionIndex, req.params.path.split("_"), req.params.blockType, req.params.params)) {
        res.sendStatus(400);
        return;
    }

    res.sendStatus(201);
})

router.get("/api/:questionId/deleteBlock/:sectionIndex/:functionIndex/:path", auth, (req, res) => {
    if (!req.question.deleteBlock(req.params.sectionIndex, req.params.functionIndex, req.params.path.split("_"))) {
        res.sendStatus(400);
        return;
    }

    res.sendStatus(200);
})

router.get("/api/:questionId/editBlock/:sectionIndex/:functionIndex/:path/:newValue", auth, (req, res) => {
    if (!req.question.editBlock(req.params.sectionIndex, req.params.functionIndex, req.params.path.split("_"), req.params.newValue)) {
        res.sendStatus(400);
        return;
    }

    res.sendStatus(200);
})

router.get("/api/:questionId/editBlock/:sectionIndex/:functionIndex/:path/", auth, (req, res) => {
    if (!req.question.clearBlock(req.params.sectionIndex, req.params.functionIndex, req.params.path.split("_"))) {
        res.sendStatus(400);
    }

    res.sendStatus(200);
})





async function auth(req, res, next) {
    const question = await getQuestionById(req.params.questionId);

    if (!question) {
        res.sendStatus(404);
        return;
    }

    if (req.session.userId != question.getOwner()) {
        req.session.redirect = `/question${req.url}`;
        res.redirect("/login");
        return;
    }

    req.question = question;
    next();
}

export { router };