import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

import { log } from "../logger.mjs";

import { Tracker } from "../database/idTracker.mjs";
import { jsonReader } from "../database/jsonReader.mjs";

const defaults = {
    id: -1,
    owner: -1,
    variables: [],
    type: "numerical",
    prompt: [],
    steps: []
};

class Question {
    constructor(jsonRW) {
        this._jsonRW = jsonRW;

        this._log("Initialised");
    }
    static async init(options) {
        if (!("id" in options)) {
            log("Question", "ID not specified");
            options = Object.assign(defaults, options);
            options.id = counter.create();
            log(`Question question${options.id}.json`, "Creating new question");
        }
        let jsonRW = jsonReader.init(join(__dirname, "questionFiles", `question${options.id}.json`), options);
        return new Question(await jsonRW);
    }
    _data() {
        return this._jsonRW.data;
    }
    _save() {
        this._jsonRW.save();
    }
    _log(text, postfix=false) {
        log(`Question question${this._data().id}.json`, text, postfix);
    }

    getOwner() {
        return this._data().owner;
    }

    getVariables() {
        return this._data().variables;
    }

    getType() {
        return this._data().type;
    }

    getPrompt() {
        return this._data().prompt;
    }

    getSteps() {
        return this._data().steps;
    }
    createStep() {
        const length = this.getSteps().push({}); // Return index of new step
        this._save();
        return length;
    }
}

function getQuestionById(id) {
    if (id in counter._data().list) {
        return Question.init({ id: id });
    }
    return false;
}

const counter = await Tracker.init(join(__dirname, "questionList.json"));
export { Question, getQuestionById };