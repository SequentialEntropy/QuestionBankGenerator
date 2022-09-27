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
    name: "New Set",
    description: "An example set description.",
    questions: []
};

class Set {
    constructor(jsonRW) {
        this._jsonRW = jsonRW;

        this._log("Initialised");
    }
    static async init(options) {
        if (!("id" in options)) {
            log("Set", "ID not specified");
            options = Object.assign(defaults, options);
            if (options.name in nameToId.data) {
                log("Set", "Entered set name already exists", options.name);
                return false;
            }
            options.id = counter.create();
            nameToId.data[options.name] = options.id;
            nameToId.save();
            log(`Set set${options.id}.json`, "Creating new set");
        }
        let jsonRW = jsonReader.init(join(__dirname, "setFiles", `set${options.id}.json`), options);
        return new Set(await jsonRW);
    }
    _data() {
        return this._jsonRW.data;
    }
    _save() {
        this._jsonRW.save();
    }
    _log(text, postfix=false) {
        log(`Set set${this._data().id}.json`, text, postfix);
    }

    getDescription() {
        return this._data().description;
    }
    getQuestions() {
        return this._data().questions;
    }
}

function getSetByName(name) {
    return getSetById(getIdByName(name));
}

function getSetById(id) {
    if (id in counter._data().list) {
        return Set.init({ id: id });
    }
    return false;
}

function getIdByName(name) {
    if (name in nameToId.data) {
        return nameToId.data[name];
    }
    return false;
}

const counter = await Tracker.init(join(__dirname, "setList.json"));
const nameToId = await jsonReader.init(join(__dirname, "nameToId.json"));
export { Set, getSetByName, getSetById, getIdByName };