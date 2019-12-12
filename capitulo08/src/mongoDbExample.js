const Mongoose = require('mongoose')

Mongoose.connect('mongodb://mmoraisd:root@localhost:27017/heroes', 
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error)  => {
        if(!error) return 

        console.log('Falha na conexão!')
    }
)

const connection = Mongoose.connection



connection.once('open', () => console.log('Database is working!'))