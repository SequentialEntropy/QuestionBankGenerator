export default function getVariables(req, res) {
    res.json(req.question.getVariables());
}