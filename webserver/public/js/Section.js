export default class Section {
    // constructor(content) {
    //     this.sectionElement = this.createElement();
    //     this.titleElement = this.sectionElement.querySelector(".Section-title");
    //     if (index == 0) {
    //         this.titleElement.textContent = "Prompt";
    //     } else {
    //         this.titleElement.textContent = `Step ${index + 1}`;
    //     }
    //     this.functionsShelfElement = this.sectionElement.querySelector(".FunctionsShelf");
    //     this.functionsShelfElement.textContent = content;
    // }
    // static async init(parent, content) {
    //     const newSection = new Section(content);
        
    //     return newSection;
    // }
    // createElement() {
    //     const range = document.createRange();

    //     range.selectNode(document.body);

    //     return range.createContextualFragment(`
    //     <div class="Section">
    //         <div class="Section-title">Step #</div>
    //         <div class="FunctionsShelf"></div>
    //     </div>
    //     `).children[0];
    // }
    // updateTitle() {
    //     this.parent;
    // }

    constructor(parent) {
        this.parent = parent;
    }

    static async init(parent, content="") {
        const newSection = new Section(parent);

        newSection.content = content;

        return newSection;
    }
}