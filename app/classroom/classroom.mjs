import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

import { log } from "../logger.mjs";

import { Tracker } from "../../utils/idTracker.mjs";
import { jsonReader } from "../../utils/jsonReader.mjs";

const defaults = {
    id: -1,
    name: "New Classroom",
    description: "An example classroom description.",
    sets: [],
    owner: -1,
    teachers: [],
    students: []
};

class Classroom {
    constructor(jsonRW) {
        this._jsonRW = jsonRW;

        this._log("Initialised");
    }
    static async init(options) {
        if (!("id" in options)) {
            log("Classroom", "ID not specified");
            options = Object.assign(defaults, options);
            if (options.name in nameToId.data) {
                log("Classroom", "Entered classroom name already exists", options.name);
                return false;
            }
            options.id = counter.create();
            nameToId.data[options.name] = options.id;
            nameToId.save();
            log(`Classroom classroom${options.id}.json`, "Creating new classroom");
        }
        let jsonRW = jsonReader.init(join(dirname(dirname(__dirname)), "database", "classroomFiles", `classroom${options.id}.json`), options);
        return new Classroom(await jsonRW);
    }
    _data() {
        return this._jsonRW.data;
    }
    _save() {
        this._jsonRW.save();
    }
    _log(text, postfix=false) {
        log(`Classroom classroom${this._data().id}.json`, text, postfix);
    }

    getDescription() {
        return this._data().description;
    }
    getSets() {
        return this._data().sets;
    }
    getOwnerId() {
        return this._data().owner;
    }
    getTeacherIds() {
        return this._data().teachers;
    }
    getStudentIds() {
        return this._data().students;
    }
}

function getClassroomByName(name) {
    return getClassroomById(getClassroomIdByName(name));
}

function getClassroomById(id) {
    if (id in counter._data().list) {
        return Classroom.init({ id: id });
    }
    return false;
}

function getClassroomIdByName(name) {
    if (name in nameToId.data) {
        return nameToId.data[name];
    }
    return false;
}

const counter = await Tracker.init(join(dirname(dirname(__dirname)), "database", "classroomList.json"));
const nameToId = await jsonReader.init(join(dirname(dirname(__dirname)), "database", "classroomNameToId.json"));
export { Classroom, getClassroomByName, getClassroomById, getClassroomIdByName };