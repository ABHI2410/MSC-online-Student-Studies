var APIHost = "http://localhost/index.php"

class APIClient {
    async get(endpoint) {
        const response = await fetch(`${APIHost}/${endpoint}`, {
            method: 'GET',
        });
        return await response.json();
    }

    async post(endpoint, data) {
        const response = await fetch(`${APIHost}/${endpoint}`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: data, // body data type must match "Content-Type" header
          });
        return await response.json();
    }

    async put(endpoint, data) {
        const response = await fetch(`${APIHost}/${endpoint}`, {
            method: 'PUT',
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: data, // body data type must match "Content-Type" header
        });
        return await response.json();
    }

    async patch(endpoint, data) {
        const response = await fetch(`${APIHost}/${endpoint}`, {
            method: 'PATCH',
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: data, // body data type must match "Content-Type" header
        });
        return await response.json();
    }

    async delete(endpoint) {
        const response = await fetch(`${APIHost}/${endpoint}`, {
            method: 'DELETE',
        });
        return await response.json();
    }
}
