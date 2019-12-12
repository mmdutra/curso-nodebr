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

async function main() {
    const Heroes = driver.define('heroes', {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            required: true
        },
        power: {
            type: Sequelize.STRING,
            required: true
        }
    }, {
        tableName: 'heroes',
        freezeTableName: false,
        timestamps: false
    })

    await Heroes.create({
        name: 'Lanterna verde',
        power: 'Ring'
    })

    await Heroes.sync()

    const result = await Heroes.findAll({
        raw: true, attributes: ['name']
    })

    console.log('resultado', result)
}

main()