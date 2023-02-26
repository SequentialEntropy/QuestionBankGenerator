export default function deleteFunction(req, res) {
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
}