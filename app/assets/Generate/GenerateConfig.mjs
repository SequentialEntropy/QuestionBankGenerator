export default class GenerateConfig {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`

        <div class="section theme__background--drop-down">
            <div class="section__area theme__color--render">
            <div class="section__heading">
                <div class="section__title">Generation</div>
            </div>
                <div class="function-menu">
                    <div class="function-menu__shelf">
                    
                        <div class="function function--full-width" draggable="false">
                            <div class="function__shelf theme__color--render">
                                <div class="block__prompt">
                                    Generate
                                </div>
                                <div class="block">
                                    <input class="block__shelf theme__color--white block--input" type="number" placeholder="Number">
                                </div>
                                <div class="block__prompt">
                                    questions
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <!--
            Dummy section-drop-zone as divider
            -->
            <div class="section-drop-zone"></div>
        </div>
        `).children[0];
    }
    constructor() {
        this.root = this.createRoot();
        this.area = this.root.querySelector(".section__area");
        this.shelf = this.root.querySelector(".function-menu__shelf");
    }
}