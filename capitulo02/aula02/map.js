const service = require('../aula01/service')


Array.prototype.myMap = function (callback) {
    const newArray = []
    for (let i =0; i < this.length; i++) {
        const result = callback(this[i], i)
        newArray.push(result)
    }
    return newArray
}

async function main() {
    try {
        const results = await service.getPeople('a')

        /*const names = []

        results.results.forEach(element => {
            names.push(element.name)
        });*/

        //const names = results.results.map(item => item.name)

        const names = results.results.myMap((item, i) =>{
            return `[${i}] - ${item.name}`
        })

        console.table(names)

    } catch (error) {
        console.error('DUE RUIM', error)
    }
}

main()