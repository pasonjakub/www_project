import Home from "./views/Home.js";
import Contact from "./views/Contact.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: Home },
        { path: "/contact", view: Contact }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));

    document.querySelector("#app").innerHTML = await view.getHtml();
    setupEventListeners();
};

const setupEventListeners = () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
            document.getElementById("nav-toggle").checked = false;
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const wrapper = document.querySelector(".wrapper");
            document.getElementById("nav-toggle").checked = false;
            // const mainSection = document.getElementsByClassName("wrapper");
            
            if (targetSection) {
                const navbarHeight = 86; // Replace with your actual navbar height in pixels
                const targetPosition = targetSection.offsetTop - navbarHeight; // Adjusted position calculation
                
                wrapper.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    const lowResImgs = document.querySelectorAll('.low-res-img');
    lowResImgs.forEach((div) => {
        const img = div.querySelector('img');

        const loaded = () => {
            div.classList.add("loaded");
        }

        if (img.complete){
            loaded();
        }
        else{
            img.addEventListener("load", loaded);
        }
    });


    
    const blurryElement = document.querySelector('.blurry');
    const contentElement = document.querySelector('.wrapper');

    const applyBlur = () => {
        if (window.scrollY > 0) {
            blurryElement.classList.remove('top-blur');
        } 
        else {
            blurryElement.classList.add('top-blur');
        }
    }
    window.addEventListener('scroll', applyBlur);
    // contentElement.style.height = (document.body.clientHeight * 2) + 'px';
}


window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    router();   
});


