const ICrud = require('./../interfaces/interfaceCrud')
const Mongoose = require('mongoose')

const STATUS = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
}

class MongoDB extends ICrud {

    constructor(connection, schema) {
        super()
        this._schema = schema 
        this._connection = connection
    }

    async create(item) {
        return await this._schema.create(item)
    }

    async read(item, skip = 0, limit = 10) {
        return await this._schema.find(item).skip(skip).limit(limit)
    }SSSAAA

    async update(id, item) {
        return await this._schema.updateOne(
            {_id: id},
            {$set: item }
        )
    }

    async delete(id) {
        return await this._schema.deleteOne({_id: id})
    }

    static connect() {
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

        const connection = Mongoose.connection

        connection.once('open', () => console.log('database connected!'))

        return connection

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