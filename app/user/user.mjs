import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

import { log } from "../../utils/logger.mjs";

import { Tracker } from "../../utils/idTracker.mjs";

const defaults = {
    id: -1,
    username: "New User",
    password: "",
    questions: [],
    sharedQuestions: []
};

import { jsonReader } from "../../utils/jsonReader.mjs";

class User {
    constructor(jsonRW) {
        this._jsonRW = jsonRW;

        this._log("Initialised");
    }
    static async init(options) {
        if (!("id" in options)) { // If no ID provided, create new User
            log("User", "ID not specified");
            options = Object.assign(defaults, options);
            if (options.username in nameToId.data) {
                log("User", "Entered username already exists", options.username);
                return false;
            }
            options.id = counter.create();
            nameToId.data[options.username] = options.id;
            nameToId.save();
            log(`User user${options.id}.json`, "Creating new user");
        } // If ID provided, load existing user
        let jsonRW = jsonReader.init( // Aggregation, internally using jsonReader
            join( // Path to User file
                dirname(dirname(__dirname)),
                "database",
                "userFiles",
                `user${options.id}.json`
            )
            , options);
        return new User(await jsonRW);
    }
    _data() { // Get internal data of jsonReader Instance
        return this._jsonRW.data;
    }
    _save() { // Save user data to JSON using jsonReader's method
        this._jsonRW.save();
    }
    _log(text, postfix=false) {
        log(`User user${this._data().id}.json`, text, postfix);
    }

    getId() {
        return this._data().id;
    }

    getName() {
        return this._data().username;
    }

    getPasswordHash() { // Get hash from JSON
        return this._data().password;
    }
    getQuestions() {
        return this._data().questions;
    }
    getSharedQuestions() {
        return this._data().sharedQuestions;
    }
    addQuestion(id) {
        this._data().questions.push(id);
        this._save();
    }
    removeQuestion(id) {
        const index = this._data().questions.indexOf(id);
        if (index == -1) {
            return false
        }

        this._data().questions.splice(index, 1);
        this._save();
        return true
    }
    shareQuestion(id) {
        this._data().sharedQuestions.push(id);
        this._save();
    }
    dismissQuestion(id) {
        const index = this._data().sharedQuestions.indexOf(id);
        if (index == -1) {
            return false
        }
    
        this._data().sharedQuestions.splice(index, 1);
        this._save();
        return true
    }
}

function getUserByName(username) {
    return getUserById(getUserIdByName(username));
}

function getUserById(id) {
    if (counter._data().list.includes(id)) {
        return User.init({ id: id });
    }
    return false;
}

function getUserIdByName(username) {
    if (nameToId.data.hasOwnProperty(username)) {
        return nameToId.data[username];
    }
    return false;
}

function createUser(data) {
    return User.init(data)
}

const counter = await Tracker.init(join(dirname(dirname(__dirname)), "database", "userList.json"));
const nameToId = await jsonReader.init(join(dirname(dirname(__dirname)), "database", "userNameToId.json"));
export { User, getUserByName, getUserById, getUserIdByName, createUser };