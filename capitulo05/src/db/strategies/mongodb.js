const ICrud = require('./interfaces/interfaceCrud')
const Mongoose = require('mongoose')

const STATUS = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
}

class MongoDB extends ICrud {

    constructor() {
        super()
        this._heroes = null 
        this._connection = null
    }

    async create(item) {
        return await this._heroes.create(item)
    }

    async read(item) {
        return await this._heroes.find(item)
    }

    async update(id, item) {
        return await this._heroes.findByIdAndUpdate(
            id,
            item
        )
    }

    async delete(id) {
        return await this._heroes.findOneAndDelete({ _id: id})
    }

    defineModel() {
        const heroesSchema = new Mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            power: {
                type: String,
                required: true
            },
            created_at: {
                type: Date,
                default: new Date()
            }
        })

        this._heroes = Mongoose.model('heroes', heroesSchema)
    }

    async connect() {
        Mongoose.connect('mongodb://mmoraisd:root@localhost:27017/heroes',
            { 
                useNewUrlParser: true, 
                useUnifiedTopology: true,
                useFindAndModify: false 
            },
            (error) => {
                if (!error) return

                console.log('Falha na conexão!')
            }
        )

        this._connection = Mongoose.connection 
        this._connection.once('open', () => console.log('database connected!'))

        await this.defineModel()
    }

    async isConnected() {
        const state = STATUS[this._connection.readyState]
        
        if (state === 'Connected') return state

        if (state !== 'Connecting') return state

        await new Promise(resolve => setTimeout(resolve, 1000))
        
        return STATUS[this._connection.readyState]
    }

}

module.exports = MongoDB