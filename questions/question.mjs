import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

import { log } from "../logger.mjs";

import { Tracker } from "../database/idTracker.mjs";
import { jsonReader } from "../database/jsonReader.mjs";

import { blocks, functions } from "./templates.mjs";

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
        const length = this.getSteps().push([]); // Return index of new step
        this._save();
        return length;
    }
    moveStep(selected, targeted) {
        if (selected < 0 || selected > (this.getSteps().length - 1) || targeted < 0 || targeted > this.getSteps().length) {
            return false;
        }

        if (selected == targeted || selected == (targeted - 1)) {
            return true;
        }

        const step = this.getSteps()[selected];

        if (selected > targeted) {
            selected++;
        }
        this.getSteps().splice(targeted, 0, step);
        this.getSteps().splice(selected, 1);
        this._save();

        return true;
    }
    deleteStep(selected) {
        if (selected < 0 || selected > (this.getSteps().length - 1)) {
            return false;
        }

        this.getSteps().splice(selected, 1);
        this._save();

        return true;
    }
    getVariables() {
        return this._data().variables;
    }
    getSection(section) {
        if (section == -1) {
            return this.getPrompt();
        } else if (section < 0 || section > (this.getSteps().length - 1)) {
            return false;
        }
        return this.getSteps()[section];
    }
    createFunction(selectedSection, functionType) {
        const section = this.getSection(selectedSection);
        if (section === false) {
            return false;
        }

        section.push(functions[functionType]);

        this._save();

        return true;
    }
    deleteFunction(selectedSection, index) {
        const section = this.getSection(selectedSection);
        if (section === false) {
            return false;
        }

        if (index < 0 || index > (section.length - 1)) {
            return false;
        }

        section.splice(index, 1);

        this._save();

        return true;
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