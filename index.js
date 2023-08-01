const http = require('node:http')
const fs = require('node:fs')

// Ejercicio 1: crear servidor HTTP con Node
function startServer () {
  const PORT = process.env.PORT || 1234

  const validateMethod = (method, target, res) => {
    if (method !== target) {
      res.statusCode = 405
      res.setHeader('Content-Type', 'image/jpg')
      res.end('<h1>405 Method Not Allowed</h1>')
      return false
    }
    return true
  }

  const processRequest = (req, res) => {
    const { method, url } = req
    let body = ''

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    switch (url) {
      case '/':
        if (!validateMethod(method, 'GET', res)) {
          return
        }
        res.statusCode = 200
        return res.end('<h1>¡Hola mundo!</h1>')
      case '/logo.webp':
        if (!validateMethod(method, 'GET', res)) {
          return
        }
        fs.readFile('./assets/logo.webp', (err, data) => {
          if (err) {
            console.log(err)
            res.statusCode = 500
            res.end('<h1>500 Internal Server Error</h1>')
          } else {
            res.setHeader('Content-Type', 'image/webp')
            res.statusCode = 200
            res.end(data)
          }
        })
        break
      case '/contacto':
        if (!validateMethod(method, 'POST', res)) {
          return
        }

        req.on('data', chunk => {
          body += chunk.toString()
        })

        req.on('end', () => {
          const data = JSON.parse(body)
          // llamar a una base de datos para guardar la info
          res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
          res.end(JSON.stringify(data))
        })

        break
      default:
        res.statusCode = 404
        return res.end('<h1>404</h1>')
    }
  }

  const server = http.createServer(processRequest)

  server.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })

  return server
}

module.exports = {
  startServer
}
