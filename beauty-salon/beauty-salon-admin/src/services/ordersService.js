import isoFetch from "isomorphic-fetch";
import C from '../constants';

class ordersService {

    static getOrders() {
        let token = localStorage.getItem(C.TOKEN_NAME);
        try {
            return isoFetch(`${C.HOST_URL}/v1/orders`, {
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

    static updateOrderStatus(arr, code) {
        let token = localStorage.getItem(C.TOKEN_NAME);
        try {
            return isoFetch(`${C.HOST_URL}/v1/orders/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({arr, code})
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

export default ordersService;
