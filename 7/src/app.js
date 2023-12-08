const express = require('express');
const router = require('./router/index.router');
const port = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
    console.log('server started on port ' + port)
})