function editBlock(req, res) {
    if (!req.question.editBlock(req.params.sectionIndex, req.params.functionIndex, req.params.path.split("_"), req.params.newValue)) {
        res.sendStatus(400);
        return;
    }

    res.sendStatus(200);
}

function clearBlock(req, res) {
    if (!req.question.clearBlock(req.params.sectionIndex, req.params.functionIndex, req.params.path.split("_"))) {
        res.sendStatus(400);
    }

    res.sendStatus(200);
}

export { editBlock, clearBlock };