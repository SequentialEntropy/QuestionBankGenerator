export default function editBlock(req, res) {
    if (!req.question.editBlock(req.params.sectionIndex, req.params.functionIndex, req.params.path.split("_"), req.body)) {
        res.sendStatus(400);
        return;
    }

    res.statusCode = 200;

    res.json({
        message: "Success"
    })
}