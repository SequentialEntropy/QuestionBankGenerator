function editFunction(req, res) {
if (!req.question.editFunction(req.params.sectionIndex, req.params.functionIndex, req.params.newValue)) {
    res.sendStatus(400);
    return;
}

res.sendStatus(200);
}

function clearFunction(req, res) {
    if (!req.question.clearFunction(req.params.sectionIndex, req.params.functionIndex)) {
        res.sendStatus(400);
    }
    
    res.sendStatus(200);
}

export { editFunction, clearFunction };