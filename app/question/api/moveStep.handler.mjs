export default function moveStep(req, res) {
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
}