const {
    deepEqual,
    ok
} = require('assert')

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Super Man',
    poder: 'Todos',
    id: 2
}

const database = require('./database')

describe('swite de manipulação de Herois', () => {
    before(async () => {
        await database.create(DEFAULT_ITEM_CADASTRAR)
        await database.create(DEFAULT_ITEM_ATUALIZAR)
    })
    
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

    it('deve remover um heroi por um id', async () => {
        const expected = true
        const result = await database.remove(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(result, expected)
    })

    it('deve atualizar um heroi pelo id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Dinheiro'
        }

        const newData = {
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        
        await database.update(DEFAULT_ITEM_ATUALIZAR.id, newData)
        const [result] = await database.read(DEFAULT_ITEM_ATUALIZAR.id)
        deepEqual(result, expected)
    })
})
