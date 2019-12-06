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

const promiseUser = getUser()
//para manipular sucesso usar .then
//para manipular error usar .catch
//usuario -> telefone -> telefone
promiseUser
    .then((user) => {
        return getPhone(user.id)
        .then((result) => {
            return {
                usuario: {
                    name: user.name, 
                    id: user.id
                }, 
                telefone: result
            }
        })
    })
    .then((result) => {
        const address = getAddressAsync(result.usuario.id)
        return address.then((result2) => {
            return {
                usuario: result.usuario,
                telefone: result.telefone, 
                endereco: result2
            }
        })
    })
    .then((result) => {
        console.group(`
            Nome: ${result.usuario.name}
            Endereço: Rua ${result.endereco.street}, ${result.endereco.number}
            Telefone: (${result.telefone.ddd}) ${result.telefone.phone}
        `)
    })
    .catch((error) => {
        console.error('Deu ruim', error)
    })