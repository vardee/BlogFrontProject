import { updateNavbar } from "../ts/navbar.js";
import { addTagsToDiv } from '../ts/tagsToDiv.js';


const customRoute = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.replaceState({}, "", event.target.href);
    handleLocation();
    window.location.reload();
};

const routes = {
    "/": "/pages/main.html",
    "/authorization": "/pages/authorization.html",
    "/registration": "/pages/registration.html",
    "/profile": "/pages/profile.html"
};

const handleLocation = async () => {
    const path = window.location.hash.substring(1);
    const routePath = routes[path];
    const token = localStorage.getItem('token');
    
    if (token && ((path === "/authorization") || (path === "/registration"))) {
        window.location.hash = "#/";
        window.location.reload();
    }
    if(path == "/"){
        addTagsToDiv();
    }
    if (routePath) {
        try {
            const response = await fetch(routePath);
            const html = await response.text();
            document.getElementById("containerId").innerHTML = html;

            const scriptTags = document.querySelectorAll('script[data-src]');
            scriptTags.forEach(scriptTag => {
                const src = scriptTag.dataset.src;
                if (src) {
                    import(src)
                        .then(module => {
                        })
                        .catch(error => {
                            console.error('Ошибка при загрузке скрипта:', error);
                        });
                }
            });

            updateNavbar();
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error);
        }
    } else {
        try {
            const response = await fetch(routes["/"]);
            const html = await response.text();
            document.getElementById("containerId").innerHTML = html;
            updateNavbar();
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error);
        }
    }
};

const handleClick = (event) => {
    const target = event.target;
    if (target.tagName === 'A' && target.getAttribute('href').startsWith('#/')) {
        customRoute(event);
    }
};

document.body.addEventListener('click', handleClick);
window.addEventListener('hashchange', handleLocation);

window.addEventListener('DOMContentLoaded', function () {
    handleLocation();
});

const savedEventListeners = {
    click: [document.body, handleClick],
    hashchange: [window, handleLocation]
};

window.onload = () => {
    for (const [element, listener] of Object.values(savedEventListeners)) {
        element.addEventListener(listener[0], listener[1]);
    }
};
