const userId = document.querySelector('meta[name="userId"]').content;

console.log("Logged in as User ID", userId);

import { LogoutButton } from "../../assets/QuestionMenu/LogoutButton.mjs";
import { QuestionSection } from "../../assets/QuestionMenu/QuestionSection.mjs";
import DashboardAPI from "./dashboard.api.mjs";

const questions = DashboardAPI.getQuestions();

const questionSection = new QuestionSection(await questions);

const logoutButton = new LogoutButton();

const questionMenu = document.querySelector(".question-menu");
questionMenu.appendChild(questionSection.root);
questionMenu.appendChild(logoutButton.root);