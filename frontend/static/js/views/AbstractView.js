export default class {
    constructor(params) {
        this.params = params;
    }

    setTitle(title) {
        document.title = title;
    }

    async fetchJSONFromFile(filename) {
        try {
            const response = await fetch(filename);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        } catch (error) {
            console.error('There was a problem fetching the data:', error);
            return null;
        }
    }

    generateNavbar(page){
        let btnList = ``;
        let iconHref = ``;
        if (page === "home") {
            iconHref = "#home";
            btnList += `
                <li><a href="#about" class="p-1 m-3 nav-btn position-relative fs-5" style="color: var(--grayish-blue);">About</a></li>
                <li><a href="#latest-article" class="p-1 m-3 nav-btn position-relative fs-5" style="color: var(--grayish-blue);">Latest article</a></li>
                <li><a href="#gallery" class="p-1 m-3 nav-btn position-relative fs-5" style="color: var(--grayish-blue);">Gallery</a></li>
                <li><a href="/contact" data-link class="p-1 m-3 nav-btn position-relative fs-5" style="color: var(--grayish-blue);">Contact</a></li>
            `;
        }
        else if (page === "contact"){
            iconHref = "/";
            btnList = `
                <li><a href="/" data-link class="p-1 m-3 nav-btn position-relative fs-5" style="color: var(--grayish-blue);">Home</a></li>
            `;
        }
        
        return `
            <nav class="nav-bar d-flex align-items-center justify-content-between sticky-top position-sm-relative" style="height: 4em; background: var(--nav-bar);">
                <div class="nav-logo">
                    <a href="${iconHref}" class="p-2 mx-5">
                        <img class="" style="width: 50px; filter: invert();" src="static/img/logo.svg" alt="">
                    </a>
                </div>
                <div class="nav-container">
                    <ol class="nav-tabs h-100 align-items-center justify-content-around" style="list-style-type: none;">
                        ${btnList}
                    </ol>
                </div>
                <!--  -->
                <div class="nav-toggle d-md-none d-sm-flex mx-4 z-1">
                    <div class="hamburger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <input id="nav-toggle" type="checkbox"/>
                </div>
            </nav>
        `;
    }

    async getHtml() {
        return "";
    }
}



