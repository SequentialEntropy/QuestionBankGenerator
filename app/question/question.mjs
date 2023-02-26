import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

import { log } from "../../utils/logger.mjs";

import { Tracker } from "../../utils/idTracker.mjs";
import { jsonReader } from "../../utils/jsonReader.mjs";

import { templateBlocks, templateFunctions, fieldAcceptedBlockTypes } from "../assets/templates.mjs";

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
        let jsonRW = jsonReader.init(join(dirname(dirname(__dirname)), "database", "questionFiles", `question${options.id}.json`), options);
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
    getSection(sectionIndex) {
        if (sectionIndex == -1) {
            return this.getPrompt();
        } else if (sectionIndex < 0 || sectionIndex > (this.getSteps().length - 1)) {
            return false;
        }
        return this.getSteps()[sectionIndex];
    }
    getFunction(section, functionIndex) {
        if (functionIndex < 0 || functionIndex > (section.length - 1)) {
            return false;
        }
        return section[functionIndex];
    }
    createFunction(selectedSection, functionType) {
        const section = this.getSection(selectedSection);
        if (section === false) {
            return false;
        }

        section.push(templateFunctions[functionType]);

        this._save();

        return true;
    }
    deleteFunction(selectedSection, index) {
        const section = this.getSection(selectedSection);
        if (section === false) {
            return false;
        }

        if (this.getFunction(selectedSection, index) === false) {
            return false;
        }

        section.splice(index, 1);

        this._save();

        return true;
    }
    getFieldFromPath(sectionIndex, functionIndex, pathArray) {
        let selectedSection = this.getSection(sectionIndex);

        if (selectedSection === false) {
            return false;
        }

        let selectedFunction = this.getFunction(selectedSection, functionIndex)
        
        if (selectedFunction === false) {
            return false;
        }

        let field = {
            value: selectedFunction
        };

        pathArray.forEach(component => {

            if (!field.hasOwnProperty("value")) {
                return false;
            }

            const block = field.value;

            if (!block.hasOwnProperty("fields")) {
                return false;
            }
            
            const fields = block.fields;
            
            const index = parseInt(component);

            if (isNaN(index)) {
                return false;
            }

            if (index < 0 || index > fields.length - 1) {
                return false;
            }

            field = fields[index];
        })

        return field;
    }
    createBlock(sectionIndex, functionIndex, pathArray, blockType, params) {
        const field = this.getFieldFromPath(sectionIndex, functionIndex, pathArray);

        if (field === false) {
            return false;
        }

        if (field.value !== null) {
            return false;
        }

        const acceptedBlockTypes = fieldAcceptedBlockTypes[field.fieldType];

        if (!acceptedBlockTypes.includes(blockType)) {
            return false;
        }

        let newBlock;

        switch (blockType) {
            case "Number":
                newBlock = templateBlocks[blockType];
                break;
            case "Variable":
                newBlock = templateBlocks[blockType];
                if (!this.getVariables().includes(params)) {
                    return false;
                }
                newBlock.variableName = params;
                break;
            case "Operation":
                newBlock = templateBlocks[params];
                newBlock.operationName = params;
                break;
        }

        field.value = newBlock;

        this._save();

        return true;
    }
    deleteBlock(sectionIndex, functionIndex, pathArray) {
        const field = this.getFieldFromPath(sectionIndex, functionIndex, pathArray);

        if (field === false) {
            return false;
        }

        field.value = null;

        this._save();

        return true;
    }
    editBlock(sectionIndex, functionIndex, pathArray, newValue) {
        const field = this.getFieldFromPath(sectionIndex, functionIndex, pathArray);

        if (field === false) {
            return false;
        }
        
        const newNum = parseFloat(newValue);

        if (isNaN(newNum)) {
            return false;
        }

        if (!field.hasOwnProperty("value")) {
            return false;
        }

        field.value.value = newNum;

        this._save();

        return true;
    }
    clearBlock(sectionIndex, functionIndex, pathArray) {
        const field = this.getFieldFromPath(sectionIndex, functionIndex, pathArray);

        if (field === false) {
            return false;
        }

        if (!field.hasOwnProperty("value")) {
            return false;
        }

        field.value.value = null;
        
        this._save();

        return true;
    }
    editFunction(sectionIndex, functionIndex, newValue) {
        const selectedSection = this.getSection(sectionIndex);

        if (selectedSection === false) {
            return false;
        }

        const selectedFunction = this.getFunction(selectedSection, functionIndex);

        if (selectedFunction === false) {
            return false;
        }

        selectedFunction.value = newValue;

        this._save();

        return true;
    }
    clearFunction(sectionIndex, functionIndex, newValue) {
        const selectedSection = this.getSection(sectionIndex);

        if (selectedSection === false) {
            return false;
        }

        const selectedFunction = this.getFunction(selectedSection, functionIndex);

        if (selectedFunction === false) {
            return false;
        }

        selectedFunction.value = null;

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

const counter = await Tracker.init(join(dirname(dirname(__dirname)), "database", "questionList.json"));
export { Question, getQuestionById };