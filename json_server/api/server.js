const jsonServer = require('json-server')
const dotenv = require('dotenv')    

dotenv.config()

const server = jsonServer.create()

const fs = require('fs')
const path = require('path')
const filePath = path.join('db.json')
const data = fs.readFileSync(filePath, "utf-8");
const db = JSON.parse(data);
const router = jsonServer.router(db)

const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(router)
server.listen(process.env.PORT ?? 3000, () => {
    console.log('JSON Server is running')
})

module.exports = server
