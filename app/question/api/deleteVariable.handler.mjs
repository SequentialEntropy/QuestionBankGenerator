export default function deleteVariable(req, res) {
    const variableName = req.body.variableName;

    if (!req.question.deleteVariable(variableName)) {
        res.sendStatus(404);
        return;
    }

    res.statusCode = 200;

    res.json({
        message: "Success"
    })
}