const http = require('http')
const { readFileSync } = require('fs')

const homePage = readFileSync('./navbar-app/index.html')
const homeStyles = readFileSync('./navbar-app/styles.css')
const homeLogo = readFileSync('./navbar-app/logo.svg')
const homeBE = readFileSync('./navbar-app/browser-app.js')


const server = http.createServer((req, res) => {
    console.log(req.method, req.url)
    const url = req.url
    if (url === '/') {
        res.writeHead(200, {'content-type' : 'text/html'})
        res.write(homePage)
    }
    else if (url === '/about') {
        res.writeHead(200, {'content-type' : 'text/html'})
        res.write('<h1>I am me</h1>')
    }
    else if (url === '/styles.css') {
        res.writeHead(200, {'content-type' : 'text/css'})
        res.write(homeStyles)
    }
    else if (url === '/logo.svg') {
        res.writeHead(200, {'content-type' : 'image/svg+xml'})
        res.write(homeLogo)
    }
    else if (url === '/browser-app.js') {
        res.writeHead(200, {'content-type' : 'text/javascript'})
        res.write(homeBE)
    }
    else {
        res.writeHead(404, {'content-type' : 'text/html'})
        res.write('<h1>Page not found</h1>')
    }
    res.end()
})

server.listen(4000)