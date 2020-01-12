import isoFetch from "isomorphic-fetch";
import C from '../constants';

class authService {

    static login(authData) {
        try {
            return isoFetch(`${C.HOST_URL}/v1/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${authData}`
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
}

export default authService;