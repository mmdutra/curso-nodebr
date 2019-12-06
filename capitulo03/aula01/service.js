const { get } = require('axios')

const URL = 'https://swapi.co/api/people'

async function getPeople(name) {
    const url = `${URL}/?search=${name}&format=json`
    const result = await get(url)
    console.log(JSON.stringify(result.data))
    return result.data.results.map(mapPeople)
}

function mapPeople(item) {
    return {
        nome: item.name, 
        peso: item.height
    }
}

module.exports = {
    getPeople
}