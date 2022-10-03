import Section from "./Section.js";

export default class SectionsShelf {
    constructor(shelfElement, questionId) {
        this.shelfElement = shelfElement;
        this.sections = [];
    }

    static async init(shelfElement, questionId) {
        const newShelf = new SectionsShelf(shelfElement, questionId);

        const prompt = (await fetch(`/question/api/${questionId}/getPrompt`)).json();
        const steps = (await fetch(`/question/api/${questionId}/getSteps`)).json();

        let newSection = await Section.init(newShelf, await prompt);

        newShelf.sections.push(newSection);

        // newShelf.shelfElement.appendChild(newSection);

        console.log(await steps);

        for (let step = 0; step < (await steps).length; step++) {
            console.log((await steps)[step]);


            let newSection = await Section.init(newShelf, (await steps)[step]);

            newShelf.sections.push(newSection);
            // newShelf.shelfElement.appendChild(newSection);
        }

        return newShelf;
    }
}