const service = require('./service')

async function main() {
    try {
        const result = await service.getPeople('a')
        const names = []
        
        // opcao 1 
        for (let i=0; i<=result.results.length - 1; i++) {
            const pessoa = result.results[i]
            names.push(pessoa.name)
        }

        // opcao 2
        for (let i in result.results) {
            const pessoa = result.results[i]
            names.push(pessoa.name)
        }

        // opcao 3
        for (r of result.results) {
            names.push(r.name)
        }

        console.log(`names`, names)

    } catch(error) {
        console.log('error interno', error)
    }
}

main()