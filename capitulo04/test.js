const {
    deepEqual,
    ok
} = require('assert')

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

const database = require('./database')

describe('swite de manipulação de Herois', () => {
    
    it('deve pesquisar um heroi usando arquvios', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const [result] = await database.read(expected.id)
        deepEqual(result, expected)
    })

    it('deve cadastrar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const result = await database.create(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await database.read(DEFAULT_ITEM_CADASTRAR.id)
        
        deepEqual(actual, expected)
    })
})
