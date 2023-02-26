export default function deleteBlock(req, res) {
    if (!req.question.deleteBlock(req.params.sectionIndex, req.params.functionIndex, req.params.path.split("_"))) {
        res.sendStatus(400);
        return;
    }

    res.sendStatus(200);
}