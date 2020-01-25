const assert = require('assert')
const Postgres = require('../db/strategies/postgres/postgres')
const Context = require('../db/strategies/base/contextStrategy')

const HeroeSchema = require('../db/strategies/postgres/schemas/heroeSchema')

const MOCK_HEROI_CADASTRAR = {
    name: 'Black hawk',
    power: 'arrows'
}
const MOCK_HEROI_ATUALIZAR = {
    name: 'Batman',
    power: 'Money'
}

let context = {}

describe('Postgres Strategy', function (suite) {
    this.timeout(Infinity)

    before(async function () {
        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, HeroeSchema)

        context = new Context(new Postgres(connection, model))

        await context.delete()
        await context.create(MOCK_HEROI_ATUALIZAR)
    })

    it('PostgresSql Connection', async () => {
        const result = await context.isConnected()
        assert.equal(result, true)
    })

    it('Create Heroe', async function () {
        const result = await context.create(MOCK_HEROI_CADASTRAR)

        delete result.dataValues.id

        assert.deepEqual(result.dataValues, MOCK_HEROI_CADASTRAR)
    })

    it('Read Heroes', async function () {
        const [result] = await context.read({
            name: MOCK_HEROI_CADASTRAR.name
        })

        delete result.id

        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('Update Heroe', async () => {

        const [itemUpdate] = await context.read({
            name: MOCK_HEROI_ATUALIZAR.name
        })

        const newItem = {
            ...MOCK_HEROI_ATUALIZAR,
            name: 'Wonder Woman'
        }

        const [result] = await context.update(itemUpdate.id, newItem)
        const [itemUpdated] = await context.read({ id: itemUpdate.id })

        assert.deepEqual(result, 1)

        assert.deepEqual(itemUpdated.name, newItem.name)

    })

    it('Delete Heroe', async () => {

        const [itemDelete] = await context.read({ name: MOCK_HEROI_CADASTRAR.name, power: MOCK_HEROI_CADASTRAR.power })

        const result = await context.delete(itemDelete.id)

        assert.deepEqual(true, result)

    })
})