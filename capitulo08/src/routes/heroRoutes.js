const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')
class HeroRoutes extends BaseRoute {

    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/heroes',
            method: 'GET',
            config: {
                validate: {
                    // payload -> body
                    // headers -> header
                    // params -> na URL
                    // query -> query params
                    failAction: (req, res, error) => {
                        throw error
                    },
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        name: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: (req, res) => {
                try {
                    const { skip, limit, name } = req.query

                    const query = name ? {
                        name: { $regex: `.*${name || ""}*.` }
                    } : {}

                    return this.db.read(name ? query : {}, skip, limit)
                } catch (error) {
                    return Boom.internal()
                }
            }
        }
    }

    create() {
        return {
            path: '/heroes',
            method: 'POST',
            config: {
                validate: {
                    failAction: (req, res, error) => {
                        throw error
                    },
                    payload: {
                        name: Joi.string().required().min(3).max(100),
                        power: Joi.string().required().min(2).max(100)
                    }
                }
            },
            handler: async (req) => {
                try {
                    const { name, power } = req.payload
                    const result = await this.db.create({ name, power })
                    return {
                        _id: result._id,
                        message: 'Heroi cadastrado com sucesso!'
                    }
                } catch (error) {
                    return Boom.internal()
                }
            }
        }
    }

    update() {
        return {
            path: '/heroes/{id}',
            method: 'PATCH',
            config: {
                validate: {
                    params: {
                        id: Joi.string().required()
                    },
                    payload: {
                        name: Joi.string().min(3).max(100),
                        power: Joi.string().min(2).max(100)
                    }
                }
            },
            handler: async (req) => {
                try {
                    const {
                        id
                    } = req.params

                    const {
                        payload
                    } = req

                    const dadosString = JSON.stringify(payload)

                    const dados = JSON.parse(dadosString)

                    const result = await this.db.update(id, dados)

                    if (result.nModified !== 1) return Boom.preconditionFailed('ID não encontrado no banco')

                    return {
                        message: 'Heroi atualizado com sucesso!'
                    }

                } catch (error) {
                    return Boom.internal()
                }
            }
        }
    }

    delete() {
        return {
            path: '/heroes/{id}',
            method: 'DELETE',
            config: {
                validate: {
                    failAction: (req, rew, error) => {
                        throw error
                    },
                    params: {
                        id: Joi.string().required()
                    }
                }
            },
            handler: async (req) => {
                try {
                    const {id} = req.params
                    const result = await this.db.delete(id)

                    if (result.n !== 1) 
                        return Boom.preconditionFailed('ID não encontrado no banco')

                    return {
                        message: 'Heroi removido com sucesso!'
                    }

                } catch (error) {
                    return Boom.internal()
                }
            }
        }
    }
}

module.exports = HeroRoutes