import express from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import { path, __dirname } from './utils/index.utils.js';
import router from './routes/index.routes.js';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('index.handlebars');
})

app.use('/', router);

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})