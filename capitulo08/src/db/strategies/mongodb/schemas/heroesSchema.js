const Mongoose = require('mongoose')

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

module.exports = Mongoose.model('heroes', heroesSchema)