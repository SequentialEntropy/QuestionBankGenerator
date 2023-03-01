export default function createFunction(req, res) {

    console.log(req.body);

    if (!req.question.createFunction(req.params.sectionId, req.body)) {
        res.sendStatus(400);
        return;
    }

    res.statusCode = 201;

    res.json({
        message: "Success"
    })
}