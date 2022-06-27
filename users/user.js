const fs = require("fs");
const path = require("path");

const defaults = {
    id: -1,
    username: "New User",
    email: "",
    password: "0x0",
    questions: [],
    sets: []
}

class UserList {
    constructor(filePath = "userlist.json") {
        this.filePath = path.join(__dirname, filePath);
        try {
            this.readFromFile(this.filePath);
        } catch (err) {
            if (err.code === "ENOENT") { // File not found
                this.nextId = 0;
                this.list = [];
                this.writeToFile(this.filePath);
            } else {
                throw err;
            }
        };
    }
    newUser() {
        let id = this.nextId;
        this.nextId++;
        if (this.list.includes(id)) {
            return id;
        }
        this.list.push(id);
        this.writeToFile(this.filePath);
        return id;
    }
    removeUser(id) {
        let index = this.list.indexOf(id);
        this.list.splice(index, 1);
        this.writeToFile(this.filePath);
    }
    readFromFile(filePath) {
        let userListRawData = fs.readFileSync(filePath);
        let userListParsed = JSON.parse(userListRawData);
        this.nextId = userListParsed.nextId || 0;
        this.list = userListParsed.list || [];
    }
    writeToFile(filePath) {
        let userListData = {
            nextId: this.nextId,
            list: this.list
        };
        let userListRawData = JSON.stringify(userListData, null, 4);
        fs.writeFileSync(filePath, userListRawData);
    }
}
const counter = new UserList();

class User {
    constructor(options) {
        if (options.id) {
            // Load user from database
            this.filePath = path.join(__dirname, "userFiles", `user${options.id.toString()}.json`);
            this.readFromFile(this.filePath);
        } else {
            // Assign new ID, increment ID counter
            this.id = counter.newUser();
            this.username = options.username || defaults.username;
            this.email = options.email || defaults.email;
            this.password = options.password || defaults.password;
            this.questions = options.questions || defaults.questions;
            this.sets = options.sets || defaults.sets;
            this.filePath = path.join(__dirname, "userFiles", `user${this.id.toString()}.json`);
            this.writeToFile(this.filePath);
        }
    }
    readFromFile(filePath) {
        let userRawData = fs.readFileSync(filePath);
        let userParsed = JSON.parse(userRawData);
        this.id = userParsed.id || defaults.id;
        this.username = userParsed.username || defaults.username;
        this.email = userParsed.email || defaults.email;
        this.password = userParsed.password || defaults.password;
        this.questions = userParsed.questions || defaults.questions;
        this.sets = userParsed.sets || defaults.sets;
    }
    writeToFile(filePath) {
        let userData = {
            id: this.id,
            username: this.username,
            email: this.email,
            password: this.password,
            questions: this.questions,
            sets: this.sets
        };
        let userRawData = JSON.stringify(userData, null, 4);
        fs.writeFileSync(filePath, userRawData);
    }
}

module.exports.User = User;