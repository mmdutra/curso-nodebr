const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroeSchema = require('./db/strategies/mongodb/schemas/heroesSchema')

const HeroRoute = require('./routes/heroRoutes')

const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')

const app = new Hapi.Server({
    port: 5000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroeSchema))

    const swaggerOptions = {
        info: {
            title: 'Heroes API - @CursoNodeBr',
            version: 'v1.0'
        },
        lang: 'pt'
    }

    const plugins = [
        Inert, 
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ];

    await app.register(plugins)

    await app.start()

    app.route(
        mapRoutes(new HeroRoute(context), HeroRoute.methods())
    )

    console.log('Servidor rodando na porta', app.info.port)

    return app
}


module.exports = main()