const assert = require('assert')
const api = require('../api')
const Context = require('./../db/strategies/base/contextStrategy')
const PostgresDB = require('./../db/strategies/postgres/postgres')
const UserSchema = require('./../db/strategies/postgres/schemas/userSchema')

let app = {}
const USER = {
    username: 'mateus',
    password: '321123'
}

const USER_DB = {
    ...USER,
    password: '$2b$04$SdlyEJsy.o5UgsgVr5csJ.ralZVyPviGH80BOb0zJCTSis30RB8Ba'
}


describe('Auth test suite', function () {
    this.beforeAll(async () => {
        app = await api

        const connectionPostgres = await PostgresDB.connect()
        const model = await PostgresDB.defineModel(connectionPostgres, UserSchema)
        const postgresModel = new Context(new PostgresDB(connectionPostgres, model));
        await postgresModel.update(null, USER_DB, true)
    })
    it('deve obter um token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER
        });
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(JSON.parse(result.payload).token.length > 10)
    })

    it('deve retornar não autorizado ao tentar obter um token com login errado', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'erickwendel',
                password: '123'
            }
        });
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 401)
        assert.deepEqual(JSON.parse(result.payload).error, "Unauthorized")
    })
})