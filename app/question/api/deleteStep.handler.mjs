export default function deleteStep(req, res) {
    if (req.question.deleteStep(req.params.selected)) {
        res.sendStatus(200);
        return;
    }
    res.sendStatus(404);
}