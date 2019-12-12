const Sequelize = require('sequelize')

const HeroeSchema = {
    name: 'heroes',
    schema: {
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
    },
    options: {
        tableName: 'heroes',
        freezeTableName: false,
        timestamps: false
    }
}


module.exports = HeroeSchema