const pg = require('pg')
delete pg.native

const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroSchema = require('./db/strategies/mongodb/schemas/heroesSchema')

const Postgres = require('./db/strategies/postgres/postgres')
const UserSchema = require('./db/strategies/postgres/schemas/userSchema')

const HeroRoute = require('./routes/heroRoutes')
const AuthRoute = require('./routes/authRoutes')

const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')

const HapiJwt = require('hapi-auth-jwt2')

const JWT_SECRET = 'SECRET_KEY_321'

const swaggerConfig = {
    info: {
        title: '#CursoNodeBR - API Herois',
        version: 'v1.0'
    },
    lang: 'pt'

}

const app = new Hapi.Server({
    port: 5000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connectionPostgres = await Postgres.connect()
    const model = await Postgres.defineModel(connectionPostgres, UserSchema)
    const postgresModel = new Context(new Postgres(connectionPostgres, model));

    const connection = MongoDB.connect()
    const mongoDb = new Context(new MongoDB(connection, HeroSchema))


    await app.register([
        HapiJwt,
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerConfig
        }
    ])
    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        validate: async (dado, request) => {

            const [result] = await postgresModel.read({
                username: dado.username.toLowerCase(),
                id: dado.id
            })

            if (!result) {
                return {
                    isValid: false
                }
            }

            return {
                isValid: true
            }
        }
    })


    app.auth.default('jwt')


    app.route([
        ...mapRoutes(new HeroRoute(mongoDb), HeroRoute.methods()),
        ...mapRoutes(new AuthRoute(JWT_SECRET, postgresModel), AuthRoute.methods())
    ])

    await app.start()
    console.log('server running at', app.info.port)

    return app;
}
module.exports = main()