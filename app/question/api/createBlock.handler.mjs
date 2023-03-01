export default function createBlock(req, res) {
    if (!req.question.createBlock(req.params.sectionIndex, req.params.functionIndex, req.params.path.split("_"), req.body)) {
        res.sendStatus(400);
        return;
    }

    res.statusCode = 201;

    res.json({
        message: "Success"
    })
}