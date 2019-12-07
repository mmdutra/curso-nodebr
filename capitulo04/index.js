const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')
async function main() {
    Commander
        .version('v1')
        .option('-n, --nome [value]', "nome do heroi")
        .option('-p, --poder [value]', "poder do heroi")
        .option('-i, --id [value]', "poder do heroi")
        .option('-c --cadastrar', "Cadastrar um heroi")
        .option('-l --listar', "Listar os herois")
        .option('-d --deletar [value]', "Remove heroi pelo id")
        .option('-a --alterar [value]', "Altera heroi pelo id")
        .parse(process.argv)

    const heroi = new Heroi(Commander)

    try {
        if (Commander.cadastrar) {

            const result = Database.create(heroi)
            if (!result) {
                console.error('HEroi nao foi cadastrado!')
            } else {
                console.log('Heroi cadastrado!')
            }
            console.log(heroi)
        }

        if (Commander.listar) {
            const lista = await Database.read()
            console.log(lista)
            return;
        }

        if (Commander.deletar) {
            const result = await Database.remove(heroi.id)
            if (!result) {
                console.error('Não foi possível cadastrar o herói!')
            } else {
                console.log('Herói removido com sucesso!')
            }
        }

        if (Commander.alterar) {
            const id = parseInt(Commander.alterar)
            //remover todas as chaves undefined/null
            const dado = JSON.stringify(heroi)
            const heroiUpdate = JSON.parse(dado)
            const result = await Database.update(id, heroiUpdate)
            if (!result) {
                console.error('Não foi possível atualizar o heroi')
                return;
            } else {
                console.log('Heroi atualizado com sucesso!')
            }
        }

    } catch (error) {
        console.log('DEU RUIM', error)
    }
}

main()