const assert = require('assert')

const PasswordHelper = require('../helpers/PasswordHelper')


const PWD = '123'
const HASH = '$2b$04$6MZNCpvLrUzBK3mKEvpxlu3PFwHKhGHdtvZA4gXDpN9ngwu2i9xT6'

describe('UserHelper test suite', function () {
    it('deve gerar um hash a partir de uma senha', async () => {
        const result = await PasswordHelper.hashPassword(PWD)
        assert.ok(result.length > 10)
    })

    it('deve validar a senha', async () => {
        const result = await PasswordHelper.comparePassword(PWD, HASH)

        assert.ok(result)
    })
})