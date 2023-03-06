export default function createVariable(req, res) {
    const variableName = req.body.variableName;

    if (!req.question.createVariable(variableName)) {
        res.sendStatus(400);
        return;
    }

    res.statusCode = 201;

    res.json({
        message: "Success"
    })
}