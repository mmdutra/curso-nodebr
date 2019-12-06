const { getPeople } = require('../aula01/service')

async function main() {
    try {
        const { results } = await getPeople('a')

        const heigths = results.map(item => parseFloat(item.height))

        console.log(heigths)

        const total = heigths.reduce((previous, next) => {
            return previous + next
        })

        console.log('total', total)

    } catch (error) {
        console.error('DEU RUIM', error)
    }
}

main()