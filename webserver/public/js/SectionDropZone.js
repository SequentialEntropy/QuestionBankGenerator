import QuestionAPI from "./QuestionAPI.js";

export default class SectionDropZone {
    static init() {
        const range = document.createRange();

        range.selectNode(document.body);

        const dropZone = range.createContextualFragment(`
        <div class="SectionDropZone"></div>
        `).children[0];

		dropZone.addEventListener("dragover", e => {
			e.preventDefault();
			dropZone.classList.add("SectionDropZone__active");
		});

		dropZone.addEventListener("dragleave", () => {
			dropZone.classList.remove("SectionDropZone__active");
		});

        dropZone.addEventListener("drop", async e => {
            e.preventDefault();
			dropZone.classList.remove("SectionDropZone__active");

            const data = JSON.parse(e.dataTransfer.getData("text/plain"));

            if (data.type != "Section") {
                return;
            }

            const shelf = dropZone.closest(".SectionsShelf");

            const selected = data.id;
            const targeted = Array.from(shelf.querySelectorAll(".SectionDropZone")).indexOf(dropZone);

            QuestionAPI.moveStep(selected, targeted);

            let sections = Array.from(shelf.querySelectorAll(".Section"));

            const selectedSection = sections.at(selected + 1);
            const targetedSection = sections.at(targeted);

            targetedSection.after(selectedSection);

            sections = Array.from(shelf.querySelectorAll(".Section"));

            let title;
            for (let index = 1; index < sections.length; index++) {
                title = sections[index].querySelector(".Section-title");
                title.textContent = `Step ${index}`;
            }
		});

        return dropZone;
    }
}