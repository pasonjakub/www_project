import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Contact");
    }

    #generateContactContentHTML = (json) => {
        let html = ``;
        // let title = ;
        html += `
            <div class="wrapper p-0">
                <div id="home"></div>
                ${this.generateNavbar("contact")}
        `;

        json.content.chapters.forEach((cpt, i) => {
            html += `
                <header>
                    <div class="low-res-img">
                        <img data-img="${cpt.images.background.name}" class="background" src="${cpt.images.background.path}" loading="lazy">
                    </div>
                    <div class="low-res-img">    
                        <img data-img="${cpt.images.foreground.name}" class="foreground" src="${cpt.images.foreground.path}" loading="lazy">
                    </div>
                    <h1>${json.content.title.toUpperCase()}</h1>
                </header>
                <main class="p-5 m-5" id="${cpt.sectionId}">
                    <h1><b>${cpt.title}</b></h1>
                
            `;
            cpt.sections.forEach((sec, j) => {
                html += `   
                    <h4 id="section_${i+1}.${j+1}">${sec.title}</h4>
                    <p>${sec.content}</p>
                `;
            });
            html += `</main>`;
        });
        html += `</div>`;
        return html;
    }
    async getHtml() {
        const json = await this.fetchJSONFromFile("/static/data/contact.json");
        return `
        <div class="row mx-0 px-0">
            <!-- Contact -->
            ${this.#generateContactContentHTML(json)}
        </div>
        `;
    }
}
