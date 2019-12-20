const assert = require('assert')

const api = require('../api')

const MOCK_HERO_TO_CREATE = {
    name: 'Chapoli Colorado',
    power: 'Marreta Bionica'
}

const MOCK_HERO_TO_UPDATE = {
    name: 'Black Hawk',
    power: 'Arrows'
}


let MOCK_ID = ''
describe('Suite de testes da API Heroes', function () {
    this.beforeAll(async () => {
        app = await api
        const result = await app.inject({
            method: 'POST',
            url: '/heroes',
            payload: JSON.stringify(MOCK_HERO_TO_CREATE)
        })

        const dados = JSON.parse(result.payload)
        MOCK_ID = dados._id
    })

    it('read on endpoint /heroes', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heroes?skip=0&limit=10'
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)

        assert.ok(Array.isArray(dados))
    })

    it('read heroes with filters, returning only 5 items', async () => {

        const TAMANHO_LIMITE = 5

        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMITE)
    })

    it('read heroes with filters, returning error 500', async () => {

        const TAMANHO_LIMITE = 'vai da erro'

        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const errorResult = {
            "statusCode": 400,
            "error": "Bad Request",
            "message": "child \"limit\" fails because [\"limit\" must be a number]",
            "validation": {
                "source": "query",
                "keys": ["limit"]
            }
        }

        assert.ok(result.statusCode === 400)
        assert.deepEqual(result.payload, JSON.stringify(errorResult))

    })

    it('will get a one item', async () => {

        const NAME = 'Batman123'
        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=1000&name=${NAME}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.deepEqual(dados[0].name, NAME)
    })


    it('create POST - /heroes', async () => {
        const result = await app.inject({
            method: 'POST',
            url: `/heroes`,
            payload: MOCK_HERO_TO_CREATE
        })

        const statusCode = result.statusCode
        const {
            message,
            _id
        } = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.notStrictEqual(_id, undefined)
        assert.deepEqual(message, 'Heroi cadastrado com sucesso!')
    })


    it('update PATCH - /heroes/:id', async () => {
        const _id = MOCK_ID

        const expected = {
            power: 'mira'
        }

        const result = await app.inject({
            method: 'PATCH',
            url: `/heroes/${_id}`,
            payload: JSON.stringify(expected)
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, 'Heroi atualizado com sucesso!')
    })

    it('update PATCH - /heroes/:id it will return id not found', async () => {
        const _id = '5df3f76b4aedea708bde0caa'

        const expected = {
            power: 'mira'
        }

        const result = await app.inject({
            method: 'PATCH',
            url: `/heroes/${_id}`,
            payload: JSON.stringify(expected)
        })

        const dados = JSON.parse(result.payload)

        const expectedReturn = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'ID não encontrado no banco'
        }

        assert.deepEqual(dados, expectedReturn)
    })

    it('delete DELETE - /heroes/:id', async () => {
        const _id = MOCK_ID

        const result = await app.inject({
            method: 'DELETE',
            url: `/heroes/${_id}`
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, 'Heroi removido com sucesso!')

    })

    it('delete DELETE - /heroes/:id - it will return invalid id', async () => {
        const _id = 'ID_INVALIDO'

        const result = await app.inject({
            method: 'DELETE',
            url: `/heroes/${_id}`
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        console.log(dados)

        const expectedReturn = {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'An internal server error occurred'
        }

        assert.ok(statusCode === 500)
        assert.deepEqual(dados, expectedReturn)

    })

})