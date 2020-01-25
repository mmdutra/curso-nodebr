const IDb = require('./../base/contextStrategy');
const Sequelize = require('sequelize');

class PostgreSQLStrategy extends IDb {
    constructor(connection, schema) {
        super();
        this._db = schema;
        this._connection = connection;
    }

    static async defineModel(connection, schema) {
        const model = connection.define(
            schema.name, schema.schema, schema.options,
        );
        await model.sync()
        return model
    }

    static async connect() {
        const connection = new Sequelize(
            'heroes',
            'mmoraisd',
            'password',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorAliases: false,
                logging: false
            }
        )
        return connection
    }

    async isConnected() {
        try {
            await this._connection.authenticate();
            return true;
        } catch (error) {
            console.error('fail!', error);
            return false;
        }
    }

    create(item) {
        return this._db.create(item, {
            raw: true
        });
    }

    read(item) {
        return this._db.findAll({
            where: item,
            raw: true
        });
    }

    update(id, item, upsert = false) {
        const fn = upsert ? 'upsert' : 'update'
        return this._db[fn](item, {
            where: {
                id
            }
        });
    }
    delete(id) {
        const query = id ? {
            id
        } : {};
        return this._db.destroy({
            where: query
        });
    }
}

module.exports = PostgreSQLStrategy;