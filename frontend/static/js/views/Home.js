import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Home");
    }

    #generateMainContentHTML = (json) => {
        let html = ``;
        // let title = ;
        html += `
            <div class="wrapper p-0">
                <div id="home"></div>
                ${this.generateNavbar("home")}
        `;

        json.content.chapters.forEach((cpt, i) => {
            html += `
                <header>
                    <img data-img="${cpt.images.background.name}" class="background" src="${cpt.images.background.path}" loading="lazy">
                    <img data-img="${cpt.images.foreground.name}" class="foreground" src="${cpt.images.foreground.path}" loading="lazy">
                    <h1>${json.content.title.toUpperCase()}</h1>
                </header>
                <main class="p-5 m-5" id="${cpt.sectionId.toLowerCase()}">
                    <h1><b>${cpt.title}</b></h1>
            `;
            let hasImages = cpt.sections.some(sec => sec.image);
            html += hasImages ? `<div><div class="d-flex justify-content-center align-items-center row">` : "";
            cpt.sections.forEach((sec, j) => {
                if (hasImages){
                    html += `
                        <div class="img-container col-12 col-lg-3 p-0 low-res-img" style="background-image: url(${sec.imageSmall})">
                            <img src="${sec.image}" alt="" loading="lazy"/>
                        </div>
                    `;
                }
                else{
                    let tagType = j == 0 ? "3" : "4";
                    html += `
                        <h${tagType} id="section_${i+1}.${j+1}">${sec.title}</h${tagType}>
                        <p>${sec.content}</p>
                    `;
                }                
            });
            html += hasImages ? "</div></div>" : "";
            html += `</main>`;
        });
        html += `</div>`;
        return html;
    }
    async getHtml() {
        const json = await this.fetchJSONFromFile("/static/data/home.json");
        return `
        <div class="row mx-0 px-0">
            <!-- Main -->
            ${this.#generateMainContentHTML(json)}
        </div>
        `;
    }
}
