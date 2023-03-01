export default function editFunction(req, res) {
    if (!req.question.editFunction(req.params.sectionIndex, req.params.functionIndex, req.body)) {
        res.sendStatus(400);
        return;
    }

    res.statusCode = 200;

    res.json({
        message: "Success"
    })
}