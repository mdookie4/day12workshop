const express = require('express')
const handlebars = require('express-handlebars')
const fs = require('fs')

const app = express()
const dir = './images'
const fileArray = []

app.engine('hbs', handlebars({defaultLayout: 'default.hbs'}))

app.set('view engine', 'hbs')

const PORT = parseInt(process.argv[2] || process.env.APP_PORT) || 3000

app.use(express.static(__dirname))
app.use(express.static(__dirname+'/public'))

app.get('/image', (req, resp)=> {
    resp.status(200)
    resp.type('text/html')
    const numFiles = fs.readdirSync(dir)
    // numFiles.forEach(file => {
    //     console.log('1'+file)
    // })
    console.info(numFiles)
    const imageName = numFiles[(Math.floor(Math.random()*numFiles.length))]
    console.info(Math.floor(Math.random()*numFiles.length))
    console.info('5'+imageName)
    resp.render('image', {
        image: imageName
    })
})

app.get('/random-image', (req, resp)=> {
    resp.status(200)
    resp.type('image/png')
    resp.type('text/html')
    const numFiles = fs.readdirSync(dir)
    // numFiles.forEach(file => {
    //     console.log('1'+file)
    // })
    console.info(numFiles)
    const imageName = numFiles[(Math.floor(Math.random()*numFiles.length))]
    console.info(Math.floor(Math.random()*numFiles.length))
    console.info('5'+imageName)
    resp.sendFile(__dirname+'/images/'+imageName)
    //console.info(__dirname+'/public/test.html')
    //resp.sendFile(__dirname+'/public/test.html')
})

app.listen(PORT, ()=> {
    console.info(`App listening to port ${PORT}`)
})