import path, { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

import { log } from "../../utils/logger.mjs";

import { Tracker } from "../../utils/idTracker.mjs";
import { jsonReader } from "../../utils/jsonReader.mjs";

import { getBlockTemplate } from "../assets/Blocks/Block.routes.mjs";
import { functionTypes, getFunctionTemplate } from "../assets/Functions/Function.routes.mjs";
import { getFieldAcceptedBlockTypes } from "../assets/Fields/Field.routes.mjs";

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
    createVariable(variableName) {
        if (this.getVariables().includes(variableName)) {
            return false;
        }

        this.getVariables().push(variableName);

        this._save();

        return true;
    }
    deleteVariable(variableName) {
        const variableIndex = this.getVariables().indexOf(variableName);

        if (variableIndex == -1) {
            return false;
        }

        this.getVariables().splice(variableIndex, 1);

        this._save();

        return true;
    }
    getSection(sectionIndexString) {
        const sectionIndex= parseInt(sectionIndexString);

        if (isNaN(sectionIndex)) {
            return false;
        }

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
    createFunction(selectedSection, data) {
        const section = this.getSection(selectedSection);

        if (section === false) {
            return false;
        }

        if (!(functionTypes.hasOwnProperty(data.functionType))) {
            return false;
        }

        section.push(getFunctionTemplate(data.functionType));
        
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
    createBlock(sectionIndex, functionIndex, pathArray, data) {
        const field = this.getFieldFromPath(sectionIndex, functionIndex, pathArray);

        if (field === false) {
            return false;
        }

        if (field.value !== null) {
            return false;
        }

        const acceptedBlockTypes = getFieldAcceptedBlockTypes(field.fieldType);

        if (!acceptedBlockTypes.includes(data.blockType)) {
            return false;
        }

        let newBlock = getBlockTemplate(data);

        switch (data.blockType) {
            case "Number":
                break;
            case "Variable":
                if (!this.getVariables().includes(data.variableName)) {
                    return false;
                }
                newBlock.variableName = data.variableName;
                break;
            case "Operation":
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
    editBlock(sectionIndex, functionIndex, pathArray, data) {
        const field = this.getFieldFromPath(sectionIndex, functionIndex, pathArray);

        if (field === false) {
            return false;
        }

        let newValue;

        switch(field.value.blockType) {
            case "Number":
                
                if (data.newValue == "") {
                    newValue = null;
                    break;
                }

                newValue = parseFloat(data.newValue);

                if (isNaN(newValue)) {
                    return false;
                }
                break;

            case "Text":
                if (data.newValue == "") {
                    newValue = null;
                    break;
                }

                newValue = data.newValue;
        }

        field.value.value = newValue;

        this._save();

        return true;
    }
    editFunction(sectionIndex, functionIndex, data) {
        const selectedSection = this.getSection(sectionIndex);

        if (selectedSection === false) {
            return false;
        }

        const selectedFunction = this.getFunction(selectedSection, functionIndex);

        if (selectedFunction === false) {
            return false;
        }

        let newValue;

        switch(selectedFunction.functionType) {
            case "Text":
                if (data.newValue == "") {
                    newValue = null;
                    break;
                }
                newValue = data.newValue;
                break;
        }

        selectedFunction.value = newValue;

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