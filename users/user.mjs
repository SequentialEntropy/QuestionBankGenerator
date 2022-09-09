import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Tracker } from "../database/idTracker.mjs";
import { jsonReader } from "../database/jsonReader.mjs";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

const defaults = {
    id: -1,
    username: "New User",
    email: "",
    password: "0x0",
    questions: [],
    sets: []
};

class User {
    constructor(data, filePath) {
        this._filePath = filePath;
        this._load(data);
    }
    static async init(options) {
        let filePath;
        let data;
        if (options.id) { // Load existing user by id
            filePath = join(__dirname, "userFiles", `user${options.id.toString()}.json`);
            data = await User._readFromFile(filePath);
        } else { // Create new user by fields and auto id
            options.id = counter.create();
            nameToId.data[options.username] = options.id;
            nameToId.save();

            filePath = join(__dirname, "userFiles", `user${options.id.toString()}.json`);
            data = {
                id: options.id || defaults.id,
                username: options.username || defaults.username,
                email: options.email || defaults.email,
                password: options.password || defaults.password,
                questions: options.questions || defaults.questions,
                sets: options.sets || defaults.sets
            };
            User._writeToFile(data, filePath);
        }
        return new User(data, filePath);
    }
    static async _readFromFile(filePath) {
        const rawData = await fs.readFile(filePath);
        const data = JSON.parse(rawData);
        return data;
    }
    async _load(data) {
        this._id = data.id;
        this._username = data.username;
        this._email = data.email;
        this._password = data.password;
        this._questions = data.questions;
        this._sets = data.sets;
    }
    static async _writeToFile(data, filePath) {
        const rawData = JSON.stringify(await data, null, 4);
        return fs.writeFile(filePath, rawData);
    }
    async _save() {
        return {
            id: this._id,
            username: this._username,
            email: this._email,
            password: this._password,
            questions: this._questions,
            sets: this._sets
        };
    }
}

function getUserByName(username) {
    return getUserById(getIdByName(username));
}

function getUserById(id) {
    return User.init({ id: id });
}

function getIdByName(username) {
    return nameToId.data[username];
}

const counter = await Tracker.init(join(__dirname, "userList.json"));
const nameToId = await jsonReader.init(join(__dirname, "nameToId.json"));
export { User, getUserByName, getUserById, getIdByName};