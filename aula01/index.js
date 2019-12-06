/*
 0 - Obter o usuário
 1 - Obter o numero de telefone de um usuário a partir do seu id 
 2 - Obter o endereço do usuário
*/

function getUser(callback) {
    setTimeout(() => {
        return callback(null, {
            id: 1,
            name: "Mateus",
            bornDate: new Date()
        })
    }, 1000)
}

function getPhone(id, callback) {
    setTimeout(() => {
        return callback(null, {
            phone: "92902-0209",
            ddd: "31"
        })
    }, 2000)
}

function getAddress(id, callback) {
    setTimeout(() => {
        return callback(null, {
            street: "dos Bobos",
            number: 0
        })
    }, 2000)
}

getUser((error, user) => {
    if (error) {
        console.log('Deu ruim no USUARIO', error)
        return;
    }

    getPhone(user.id, (error1, phone) => {
        if (error) {
            console.log('Deu ruim no TELEFONE', error1)
            return;
        }

        getAddress(user.id, (error2, address) => {
            if (error) {
                console.log('Deu ruim no ENDERECO', errror2)
                return;
            }
    
            console.log(`
                Nome: ${user.name},
                Endereço: ${address.number},
                Telefone: (${phone.ddd}) ${phone.phone}
            `)
        })
    })
})