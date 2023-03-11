export class LogoutButton {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="section">
            <div class="section__area theme__color--default">
                <a href="/login/logout">
                    <button class="section__button theme__color--delete">Logout</button>
                </a>
            </div>
        </div>
        `).children[0];
    }
    constructor() {
        this.root = this.createRoot();
        this.button = this.root.querySelector(".section__button");
    }
}