import isoFetch from "isomorphic-fetch";
import C from '../constants';

class pagesService {

    static getPages() {
        let token = localStorage.getItem(C.TOKEN_NAME);
        try {
            return isoFetch(`${C.HOST_URL}/v1/pages`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
                .then(response => {
                    if (!response.ok) {
                        let Err = new Error("fetch error " + response.status);
                        Err.userMessage = "Ошибка связи";
                        throw Err;
                    } else
                        return response.json();
                })
        } catch (e) {
            console.log('---')
        }
    }

    static updatePage(page) {
        let token = localStorage.getItem(C.TOKEN_NAME);
        try {
            return isoFetch(`${C.HOST_URL}/v1/pages/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({page})
            })
                .then(response => {
                    if (!response.ok) {
                        let Err = new Error("fetch error " + response.status);
                        Err.userMessage = "Ошибка связи";
                        throw Err;
                    } else
                        return response.json();
                })
        } catch (e) {
            console.log('---')
        }
    }

    static createPage(page) {
        let token = localStorage.getItem(C.TOKEN_NAME);
        try {
            return isoFetch(`${C.HOST_URL}/v1/pages/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({page})
            })
                .then(response => {
                    if (!response.ok) {
                        let Err = new Error("fetch error " + response.status);
                        Err.userMessage = "Ошибка связи";
                        throw Err;
                    } else
                        return response.json();
                })
        } catch (e) {
            console.log('---')
        }
    }

    static deletePage(pageId) {
        let token = localStorage.getItem(C.TOKEN_NAME);
        try {
            return isoFetch(`${C.HOST_URL}/v1/pages/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({pageId})
            })
                .then(response => {
                    if (!response.ok) {
                        let Err = new Error("fetch error " + response.status);
                        Err.userMessage = "Ошибка связи";
                        throw Err;
                    } else
                        return response.json();
                })
        } catch (e) {
            console.log('---')
        }
    }
}

export default pagesService;
