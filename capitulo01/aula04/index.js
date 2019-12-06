const EventEmitter = require('events')

class MyEmitter extends EventEmitter {

}

const myEmitter = new MyEmitter()

const eventName = 'user:click'

/*myEmitter.on(eventName, (click) => {
    console.log('um usuário clickou', click)
})

let count = 0
setInterval(() => {
    myEmitter.emit(eventName, 'no ok ' + (count++))
}, 1000)*/

function main() {
    return new Promise((resolve, reject) => {
        const stdin = process.openStdin()
        stdin.addListener('data', (value) => {
            console.log(`voce digitou ${value.toString().trim()}`)
        })
    })
}

main().then((result) => console.log('resultado', result.toString()))

