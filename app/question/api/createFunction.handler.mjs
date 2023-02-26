import { templateFunctions } from "../../assets/templates.mjs";

export default function createFunction(req, res) {
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
}