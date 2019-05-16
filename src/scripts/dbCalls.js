const baseURL = ' http://localhost:8088';

const API = {
    getAllPlaces() {
        return fetch(`${baseURL}/places`)
            .then(response => response.json())
    },
    getAllInterests() {
        return fetch(`${baseURL}/interests?_expand=place`)
            .then(response => response.json())
    },
    getOneInterest(interestId) {
        return fetch(`${baseURL}/interests/${interestId}?_expand=place`)
            .then(response => response.json())
    },
    updateInterest(interestId, obj) {
        return fetch(`${baseURL}/interests/${interestId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    addNewInterest(obj) {
        return fetch(`${baseURL}/interests`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    deleteInterest(interestId) {
        return fetch(`${baseURL}/interests/${interestId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
    }
}

export default API