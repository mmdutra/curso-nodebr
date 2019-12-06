
/*
 0 - Obter o usuário
 1 - Obter o numero de telefone de um usuário a partir do seu id 
 2 - Obter o endereço do usuário
*/

//importamos um modulo interno do nodejs
const util = require('util')
const getAddressAsync = util.promisify(getAddress)


function getUser() {
    //quando der erro -> call reject
    //se nao der erro -> call resolve
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                id: 1,
                name: "Mateus",
                bornDate: new Date()
            })
        }, 1000)
    })
}

function getPhone(id) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                phone: "92902-0209",
                ddd: "31"
            })
        }, 2000)
    })
}

function getAddress(id, callback) {
    setTimeout(() => {
        return callback(null, {
            street: "dos Bobos",
            number: 0
        })
    }, 2000)
}

main()
// adicionar o async -> retornará uma Promise
async function main() {
    try{
        console.time('medida-tempo-promise')
        const user = await getUser()

        const result = await Promise.all([
            getPhone(user.id),
            getAddressAsync(user.id)
        ])

        const address = result[1]
        const phone = result[0]

        console.log(`
            Nome: ${user.name}
            Telefone: (${phone.ddd}) ${phone.phone}
            Endereço: ${address.street}, ${address.number}
        `)

        console.timeEnd('medida-tempo-promise')
    }catch(error) {
        console.log('DEU RUIM', error)
    }
}