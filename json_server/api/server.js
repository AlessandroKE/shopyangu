const jsonServer = require('json-server')
const dotenv = require('dotenv')    

dotenv.config()

const server = jsonServer.create()

const router = jsonServer.router('db.json')

const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(router)
server.listen(process.env.PORT ?? 3000, () => {
    console.log('JSON Server is running')
})

module.exports = server
