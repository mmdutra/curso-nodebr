const assert = require('assert')
const MongoDB = require('./../db/strategies/mongodb/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')

const HeroiSchema = require('./../db/strategies/mongodb/schemas/heroesSchema')

const MOCK_HEROE_TO_CREATE = {
    name: 'Batman',
    power: 'speed'
}

const MOCK_HEROE_TO_UPDATE = {
    name: 'Wonder Woman',
    power: 'Strong'
}

let context = {}

describe.only('MongoDb tests', function () {

    this.timeout(Infinity)

    this.beforeAll(async () => {
        const connection = MongoDB.connect()

        context = new Context(new MongoDB(connection, HeroiSchema))

        await context.create(MOCK_HEROE_TO_CREATE)
    })

    it('it will say if db is connected', async () => {
        const result = await context.isConnected()

        assert.deepEqual(result, 'Connected')
    })

    it('it will insert a hero', async () => {
        const { name, power } = await context.create(MOCK_HEROE_TO_CREATE)

        assert.deepEqual({ name, power }, MOCK_HEROE_TO_CREATE)
    })

    it('it will return all of heroes createds', async () => {
        const [{ name, power }] = await context.read({ name: MOCK_HEROE_TO_CREATE.name })

        assert.deepEqual(MOCK_HEROE_TO_CREATE, { name, power })
    })

    it('it will update a hero by id', async () => {
        const [{ _id, name, power }] = await context.read({ name: MOCK_HEROE_TO_CREATE.name })

        const itemToUpdate = {
            _id, name, power,
            ...MOCK_HEROE_TO_UPDATE
        }

        await context.update(_id, itemToUpdate)

        const [itemUpdated] = await context.read({ _id: itemToUpdate._id })

        assert.deepEqual({ name: itemToUpdate.name , power: itemUpdated.power  }, MOCK_HEROE_TO_UPDATE)

    })

    it('it will delete a hero by id', async () => {
        const [{ _id }] = await context.read({ name: MOCK_HEROE_TO_CREATE.name })

        const { name, power } = await context.delete(_id)

        assert.deepEqual(MOCK_HEROE_TO_CREATE, { name, power })
    })
})
