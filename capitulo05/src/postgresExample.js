const Sequelize = require('sequelize')
const driver = new Sequelize(
    'heroes',
    'mmoraisd',
    'password', 
    {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorAliases: false
    }
)

async function main() {}