export default function createStep(req, res) {
    res.set('Content-Type', 'text/plain');
    res.send(req.question.createStep().toString());
}