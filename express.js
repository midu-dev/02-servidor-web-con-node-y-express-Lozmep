// Ejercicio 2: crear servidor HTTP con Express
function startServer () {
  const path = require('node:path')
  const express = require('express')
  const app = express()
  const PORT = process.env.PORT ?? 1234

  app.disable('x-powered-by')
  app.use(express.json())
  app.use(express.static(path.join(__dirname, 'assets')))

  app.get('/', (req, res) => {
    res.status(200).send('<h1>¡Hola mundo!</h1>')
  })

  app.all('/', (req, res) => {
    res.status(405).send('<h1>405 Method Not Allowed</h1>')
  })

  app.post('/contacto', (req, res) => {
    res.status(201).json(req.body)
  })

  app.all('/contacto', (req, res) => {
    res.status(405).send('<h1>405 Method Not Allowed</h1>')
  })

  app.all('*', (req, res) => {
    res.status(404).send('<h1>404</h1>')
  })

  const server = app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })

  return server
}

module.exports = {
  startServer
}
