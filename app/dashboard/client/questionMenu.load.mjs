import { LogoutButton } from "../../assets/QuestionMenu/LogoutButton.mjs";
import { MyQuestionSection, SharedQuestionSection } from "../../assets/QuestionMenu/QuestionSection.mjs";
import DashboardAPI from "./dashboard.api.mjs";

const sharedQuestions = [
    {
        id: 0,
        name: "Richard's question",
        sender: "Richard"
    },
    {
        id: 1,
        name: "Jason's question",
        sender: "Jason"
    }
]

const questions = DashboardAPI.getQuestions();

const sharedQuestionSection = new SharedQuestionSection(await sharedQuestions);

const myQuestionSection = new MyQuestionSection(await questions);

const logoutButton = new LogoutButton();

const questionMenu = document.querySelector(".question-menu");
questionMenu.appendChild(sharedQuestionSection.root);
questionMenu.appendChild(myQuestionSection.root);
questionMenu.appendChild(logoutButton.root);