const axios = require('axios');

export default {
    get: options => {
        console.log(options.entity)
        return axios.get(`http://localhost:4000/${options.entity}`)
            .then(response => {
                console.log(response);
                return response.data.result.cards
            })
            .catch(error => {
                console.error(error);
            })

    },
    create: options => {
        return axios.post(`http://localhost:4000/${options.entity}`, {cards: options.cards})
            .then(response => {
                console.log(response);
                return response.data.result.cards
            })

    },
    remove: options => {
        return axios.delete(`http://localhost:4000/${options.entity}/${options.id}`)
            .then(response => {
                console.log(response);
                return response.data.result.cards
            })
    },
    update: options => {
        return axios.put(`http://localhost:4000/${options.entity}/${options.id}`, {cards: options.card})
            .then(response => {
                console.log(response);
                return response.data.result.cards

            })
    },

    UpdatedById: options => {
        return axios.get(`http://localhost:4000/${options.entity}/${options.id}`)
            .then(response => {
                console.log(response);
                return response.data.result[0]
            })
    },
}


