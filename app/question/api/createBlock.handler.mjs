export default function createBlock(req, res) {
    if (!req.question.createBlock(req.params.sectionIndex, req.params.functionIndex, req.params.path.split("_"), req.params.blockType, req.params.params)) {
        res.sendStatus(400);
        return;
    }

    res.sendStatus(201);
}