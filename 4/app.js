const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3001;

app.use('/', express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.send("Express")
})

app.get('/realtimeproducts', (req, res) => {
    res.render('home.hbs')
})

server.listen(port, () => console.log(`Server listening on port ${port}`))

io.on('connection', (socket) => {
    console.log('Servidor de productos iniciado')
    io.emit('userConnected', "Aplicacion cargada");

    socket.on('productAdded', (data)=>{
        io.emit('addProduct', (data));
    })

    socket.on('productDeleted', (data)=>{
        io.emit('deleteProduct', (data));
    })
});