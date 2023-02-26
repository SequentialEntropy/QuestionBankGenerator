export default function getPrompt(req, res) {
    res.json(req.question.getPrompt());
}