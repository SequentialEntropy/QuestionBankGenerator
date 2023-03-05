import QuestionAPI from "../../question/client/question.api.mjs";

export default class SectionDropZone {
    static init() {
        const range = document.createRange();

        range.selectNode(document.body);

        const dropZone = range.createContextualFragment(`
        <div class="section-drop-zone"></div>
        `).children[0];

		dropZone.addEventListener("dragover", e => {
			e.preventDefault();
			dropZone.classList.add("section-drop-zone--active");
		});

		dropZone.addEventListener("dragleave", () => {
			dropZone.classList.remove("section-drop-zone--active");
		});

        dropZone.addEventListener("drop", async e => {
            e.preventDefault();
			dropZone.classList.remove("section-drop-zone--active");

            const data = JSON.parse(e.dataTransfer.getData("text/plain"));

            if (data.type != "Section") {
                return;
            }

            const shelf = dropZone.closest(".section-menu__shelf");

            const selected = data.id;
            const targeted = Array.from(shelf.querySelectorAll(".section-drop-zone")).indexOf(dropZone);

            QuestionAPI.moveStep(selected, targeted);

            let sections = Array.from(shelf.querySelectorAll(".section"));

            const selectedSection = sections.at(selected + 1);
            const targetedSection = sections.at(targeted);

            targetedSection.after(selectedSection);

            sections = Array.from(shelf.querySelectorAll(".section"));

            let title;
            for (let index = 1; index < sections.length; index++) {
                title = sections[index].querySelector(".section__title");
                title.textContent = `Step ${index}`;
            }
		});

        return dropZone;
    }
}