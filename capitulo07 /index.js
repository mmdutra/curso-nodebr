const http = require('http')

http.createServer((rew, res) => {
    res.end('Hello Node!!')
})

.listen(5000, () => console.log('O servidor está rodando!!'))