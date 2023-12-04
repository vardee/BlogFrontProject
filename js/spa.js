import { updateNavbar } from "../ts/navbar.js";
import { addTagsToDiv } from '../ts/tagsToDiv.js';

const customRoute = (event, path) => {
    event.preventDefault();
    window.history.pushState({}, "", path);
    handleLocation(path);
    window.location.reload();
};

const routes = {
    "/": "/pages/main.html",
    "/authorization": "/pages/authorization.html",
    "/registration": "/pages/registration.html",
    "/profile": "/pages/profile.html",
    "/post/:id": "/pages/post.html",
    "/post/create": "/pages/create.html"
};

const handleLocation = async (path = window.location.pathname) => {
    let routePath = null;
    
    for (const [route, routePage] of Object.entries(routes)) {
        const routeParts = route.split("/").filter(part => part !== "");
        const pathParts = path.split("/").filter(part => part !== "");

        if (routeParts.length === pathParts.length) {
            const params = {};

            const isMatch = routeParts.every((part, index) => {
                if (part.startsWith(":")) {
                    const paramName = part.slice(1);
                    params[paramName] = pathParts[index];
                    return true;
                }
                return part === pathParts[index];
            });

            if (isMatch) {
                routePath = routePage;
                console.log("Matched route:", route, "with params:", params);
                break;
            }
        }
    }
    
    const token = localStorage.getItem('token');

    if (token && ((path === "/authorization") || (path === "/registration"))) {
        window.history.pushState({}, '', '/');
        console.log("asdasdasdasd");
    }

    if (path === "/") {
        addTagsToDiv();
    }

    if (routePath) {
        try {
            const response = await fetch(routePath);

            if (!response.ok) {
                throw new Error(`Ошибка загрузки страницы. Код ошибки: ${response.status}`);
            }

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
            console.error('Ошибка при загрузке файла:', error.message);
        }
    } else {
        console.error('Маршрут не найден:', path);
    }
};


const handleClick = (event) => {
    const target = event.target;
    const href = target.getAttribute('href');
    if (target.tagName === 'A' && href && href.startsWith('/')) {
        customRoute(event, href);
    }
};

document.body.addEventListener('click', handleClick);
window.addEventListener('popstate', () => handleLocation());
window.addEventListener('DOMContentLoaded', () => handleLocation());

const savedEventListeners = {
    click: [document.body, handleClick],
    popstate: [window, () => handleLocation()]
};

window.onload = () => {
    for (const [element, listener] of Object.values(savedEventListeners)) {
        element.addEventListener(listener[0], listener[1]);
    }
};
