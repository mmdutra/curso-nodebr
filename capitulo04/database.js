const {
    readFile,
    writeFile
} = require('fs')

const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {

    constructor() {
        this.NOME_ARQUIVO = 'herois.json'
    }
    
    async getFileData(){
        const file = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(file.toString())
    }

    async writeFile(data){
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(data))
        return true
    }

    async create(hero) {
        const data = await this.getFileData()
        const id = hero.id <= 2 ? hero.id : Date.now()

        const heroWithId = {
            id,
            ...hero
        }

        const finalData = [
            ...data, 
            heroWithId
        ]

        const result = await this.writeFile(finalData)

        return result

    }

    async read(id){
        const data = await this.getFileData()
        const filteredData = data.filter(item => (id) ? (item.id === id) : (true))
        return filteredData
    }

    async remove(id) {
        if (!id) {
            return await this.writeFile([])
        }

        const data = await this.getFileData()
        const index = data.findIndex(item => item.id = parseInt(id))
        if (index === -1) {
            throw Error('O usuario informado nao existe')
        }
        data.splice(index, 1)
        return await this.writeFile(data)
    }

    async update(id, modifications) {
        const data = await this.getFileData()

        const index = data.findIndex(item => parseInt(item.id) === (id))
        if (index === -1) {
            throw new Error('O heroi informado nao existe ainda')
        }

        const actual = data[index]

        const object = {
            ...actual,
            ...modifications
        }

        data.splice(index, 1)

        return await this.writeFile([
            ...data,
            object
        ])
    }

}

module.exports = new Database()