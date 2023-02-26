export default function getSteps(req, res) {
    res.json(req.question.getSteps());
}