import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Tracker } from "../database/idTracker.mjs";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

const defaults = {
    id: -1,
    name: "New Classroom",
    description: "",
    sets: [],
    owner: -1,
    teachers: [],
    students: []
};

class Classroom {
    constructor(data, filePath) {
        this._filePath = filePath;
        this._load(data);
    }
    static async init(options) {
        let filePath;
        let data;
        if (options.id) {
            filePath = join(__dirname, "classroomFiles", `classroom${options.id.toString()}.json`);
            data = await Classroom._readFromFile(filePath);
        } else {
            options.id = counter.create();
            filePath = join(__dirname, "classroomFiles", `classroom${options.id.toString()}.json`);
            data = {
                id: options.id || defaults.id,
                name: options.name || defaults.name,
                description: options.description || defaults.description,
                sets: options.sets || defaults.sets,
                owner: options.owner || defaults.owner,
                teachers: options.teachers || defaults.teachers,
                students: options.students || defaults.students
            };
            Classroom._writeToFile(data, filePath);
        }
        return new Classroom(data, filePath);
    }
    readFromFile(filePath) {
        let classroomRawData = fs.readFileSync(filePath);
        let classroomParsed = JSON.parse(classroomRawData);
        this._id = classroomParsed.id || defaults.id;
        this._name = classroomParsed.name || defaults.name;
        this._description = classroomParsed.description || defaults.description;
        this._sets = classroomParsed.sets || defaults.sets;
        this._owner = classroomParsed.owner || defaults.owner;
        this._teachers = classroomParsed.teachers || defaults.teachers;
        this._students = classroomParsed.students || defaults.students;
    }
    writeToFile(filePath) {
        let classroomData = {
            id: this._id,
            name: this._name,
            description: this._description,
            sets: this._sets,
            owner: this._owner,
            teachers: this._teachers,
            students: this._students
        };
        let classroomRawData = JSON.stringify(classroomData, null, 4);
        fs.writeFileSync(filePath, classroomRawData);
    }
    static async _readFromFile(filePath) {
        const rawData = await fs.readFile(filePath);
        const data = JSON.parse(rawData);
        return data;
    }
    async _load(data) {
        this._id = data.id;
        this._name = data.name;
        this._description = data.description;
        this._sets = data.sets;
        this._owner = data.owner;
        this._teachers = data.teachers;
        this._students = data.students;
    }
    static async _writeToFile(data, filePath) {
        const rawData = JSON.stringify(await data, null, 4);
        return fs.writeFile(filePath, rawData);
    }
    async _save() {
        return {
            id: this._id,
            name: this._name,
            description: this._description,
            sets: this._sets,
            owner: this._owner,
            teachers: this._teachers,
            students: this._students
        };
    }
}

const counter = await Tracker.init(join(__dirname, "classroomList.json"));
export { Classroom };