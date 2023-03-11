import DashboardAPI from "../../dashboard/client/dashboard.api.mjs";

export class SharedQuestionSection {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="section theme__background--drop-down">
            <div class="section__area theme__color--default">
                <div class="section__heading">
                    <div class="section__title">Inbox</div>
                </div>
                <div class="function-menu">
                    <div class="function-menu__shelf"></div>
                </div>
            </div>
            <div class="section-drop-zone"></div>
        </div>
        `).children[0];
    }
    constructor(questions=[]) {
        this.root = this.createRoot();
        this.area = this.root.querySelector(".section__area");
        this.title = this.root.querySelector(".section__title");
        this.shelf = this.root.querySelector(".function-menu__shelf");

        this.shelf.addEventListener("copyQuestion", async e => {
        })

        this.shelf.addEventListener("dismissQuestion", async e => {
        })

        questions.forEach(questionData => {
            this.shelf.appendChild((new SharedQuestion(questionData.id, questionData.name, questionData.sender)).root);
        })
    }
}

class SharedQuestion {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`

        <div class="function function--full-width" draggable="false">
            <div class="function__shelf theme__color--default">
                <div class="function__sub-shelf">
                    <div class="block__prompt question__name">
                    </div>
                    <div class="block__spacer">
                    </div>
                    <div>
                        <button class="share-button theme__color--accept">
                            Copy to My Questions
                        </button>
                    </div>
                    <div>
                        <button class="share-button theme__color--delete">
                            Dismiss
                        </button>
                    </div>
                </div>
                <div class="function__sub-shelf">

                    <div class="block__prompt question__sender">
                        Shared by
                    </div>
                </div>
            </div>
        </div>

        `).children[0];
    }
    constructor(questionId, questionName, senderName) {
        this.root = this.createRoot();
        this.shelf = this.root.querySelector(".function__shelf");
        this.question = this.root.querySelector(".question__name");
        this.sender = this.root.querySelector(".question__sender");
        // this.deleteButton = this.root.querySelector(".block__delete");
        // this.username = this.root.querySelector(".block--input");

        // this.editLink = this.root.querySelector(".edit-link");
        // this.editLink.href = `/question/${questionId}`;

        // this.generateLink = this.root.querySelector(".generate-link");
        // this.generateLink.href = `/generate/${questionId}`;

        this.question.textContent = questionName;
        this.sender.textContent = `Shared by ${senderName}`;

        this.questionId = questionId;
        this.questionName = questionName;
        this.senderName = senderName;

    }
}

export class MyQuestionSection {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="section theme__background--drop-down">
            <div class="section__area theme__color--default">
                <div class="section__heading">
                    <div class="section__title">My Questions</div>
                </div>
                <div class="function-menu">
                    <div class="function-menu__shelf"></div>
                    <div class="function-menu__create-text-field"></div>
                </div>
            </div>
            <div class="section-drop-zone"></div>
        </div>
        `).children[0];
    }
    constructor(questions=[]) {
        this.root = this.createRoot();
        this.area = this.root.querySelector(".section__area");
        this.title = this.root.querySelector(".section__title");
        this.shelf = this.root.querySelector(".function-menu__shelf");
        this.root.querySelector(".function-menu__create-text-field").appendChild((new CreateQuestionButton).root);

        this.shelf.addEventListener("createQuestion", async e => {
            const questionName = e.detail.questionName;

            const result = await DashboardAPI.createQuestion(questionName);

            this.shelf.appendChild((new Question(
                result.questionId,
                questionName
            )).root);
        })

        this.shelf.addEventListener("deleteQuestion", async e => {
            const questionId = e.detail.questionId;

            DashboardAPI.deleteQuestion(questionId);
        })

        questions.forEach(questionData => {
            this.shelf.appendChild((new Question(questionData.id, questionData.name)).root);
        })
    }
}

class Question {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`

        <div class="function function--full-width" draggable="false">
            <div class="function__shelf theme__color--default">
                <div class="function__sub-shelf">
                    <div class="block__prompt question__name">
                    </div>
                    <div class="block__spacer">
                    </div>
                    <a class="edit-link">
                        <div class="drop-down__toggle theme__color--operation">
                            Edit
                        </div>
                    </a>
                    <a class="generate-link">
                        <div class="drop-down__toggle theme__color--render">
                            Generate
                        </div>
                    </a>
                </div>
                <div class="function__sub-shelf">

                    <div class="block__prompt">
                        Share with
                    </div>

                    <div class="block block__spacer">
                        <div contenteditable class="block__shelf theme__color--white block--input override__text--default">
                            Username
                        </div>
                    </div>

                    <div>
                        <button class="share-button theme__color--accept">
                            Share
                        </button>
                    </div>
                </div>
            </div>
            <button class="block__delete">
            ×
            </button>
        </div>

        `).children[0];
    }
    constructor(questionId, questionName) {
        this.root = this.createRoot();
        this.shelf = this.root.querySelector(".function__shelf");
        this.question = this.root.querySelector(".question__name");
        this.deleteButton = this.root.querySelector(".block__delete");
        this.username = this.root.querySelector(".block--input")

        this.editLink = this.root.querySelector(".edit-link");
        this.editLink.href = `/question/${questionId}`;

        this.generateLink = this.root.querySelector(".generate-link");
        this.generateLink.href = `/generate/${questionId}`;

        this.question.textContent = questionName;
        this.questionId = questionId;
        this.questionName = questionName;

        this.root.addEventListener("mouseover", e => {
            e.stopPropagation();
            this.shelf.classList.add("function__shelf--hover");
            this.deleteButton.classList.add("block__delete--show");
        })
        this.root.addEventListener("mouseout", e => {
            e.stopPropagation();
            this.shelf.classList.remove("function__shelf--hover");
            this.deleteButton.classList.remove("block__delete--show");
        })

        this.deleteButton.addEventListener("click", e => {
            if (!confirm(`Are you sure you want to delete the question named "${this.questionName}"?`)) {
                return;
            }

            const shelf = this.root.closest(".function-menu__shelf");

            const event = new CustomEvent("deleteQuestion", {
                detail: {
                    questionId: this.questionId
                }
            });

            shelf.dispatchEvent(event);

            shelf.removeChild(this.root);
        })

        this.username.addEventListener("focus", e => {

            this.username.classList.add("block__shelf--focus");

            const height = this.username.clientHeight;

            this.username.style.minHeight = height + "px";

            if (this.username.classList.contains("override__text--default")) {
                this.username.textContent = "";
                
                this.username.classList.remove("override__text--default");
            }

        })

        this.username.addEventListener("blur", e => {
            
            this.username.classList.remove("block__shelf--focus");

            if (this.username.textContent == "") {
                
                this.username.textContent = "Username";
                
                this.username.classList.add("override__text--default");
                
            }

            this.username.style.minHeight = "";
            
        })

        this.username.addEventListener("mouseover", e => {
            e.stopPropagation();
            this.username.classList.add("block__shelf--hover");
        })
        this.username.addEventListener("mouseout", e => {
            e.stopPropagation();
            this.username.classList.remove("block__shelf--hover");
        })
    }
}

class CreateQuestionButton {
    constructor() {
        this.root = document.createElement("div");
        this.root.contentEditable = true;

        this.root.textContent = "+ Create Question";
        this.root.classList.add("function-menu__input");
        this.root.classList.add("theme__outline--dashed");
        this.root.classList.add("theme__color--default");
        
        this.root.addEventListener("mouseover", e => {
            this.root.classList.add("function-menu__input--hover");
        })
        
        this.root.addEventListener("mouseout", e => {
            this.root.classList.remove("function-menu__input--hover");
        })
        
        this.root.addEventListener("focus", e => {
            const height = this.root.clientHeight;

            this.root.style.minHeight = height + "px";

            this.root.classList.add("function-menu__input--focus");
            this.root.classList.add("function__shelf--hover");

            this.root.textContent = "";
        })
        
        this.root.addEventListener("blur", e => {

            this.root.style.minHeight = "";

            this.root.classList.remove("function-menu__input--focus");
            this.root.classList.remove("function__shelf--hover");

            if (this.root.textContent != "") {
                const shelf = this.root.closest(".function-menu").querySelector(".function-menu__shelf");

                const event = new CustomEvent("createQuestion", {
                    detail: {
                        questionName: this.root.textContent
                    }
                })

                shelf.dispatchEvent(event);
            }

            this.root.textContent = "+ Create Question";
        })
    }
}