
const { getPeople } = require('../aula01/service')

async function main(){
    try {
        const { results } = await getPeople('a')

        const famillyLars = results.filter(item => {
            return item.name.toLowerCase().indexOf('lars') !== -1
        })

        const names  = famillyLars.map(item => item.name)

        console.log(names)

    } catch (error) {
        console.error('DEU RUIM', error)
    }
}

main()