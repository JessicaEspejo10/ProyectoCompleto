/* -------------------------- import dependencies ------------------------- */
import express from 'express';
import morgan from 'morgan';
/* --------------- import different methods from a dependence --------------- */
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';
import {engine} from 'express-handlebars'

/* ----------------------------- initialization ----------------------------- */
const app = express();
/* ------ doble guion bajo para evitar colisiones de nombre de variable ----- */
const __dirname = dirname(fileURLToPath(import .meta.url));

/* --------------------------------- setting (server and templates) -------------------------------- */
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname,'views'));

app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'),'layouts'),
    partialsDir: join(app.get('views'),'partials'),
    extname: '.hbs'
}));

app.set('view engine','.hbs');

/* ------------------------------- middlewares ------------------------------- */
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

/* --------------------------------- routes --------------------------------- */
app.get('/', (req, res) => {
    res.json({'message':'Hola mundo'});
});

/* ------------------------------ public files (access)------------------------------ */
app.use(express.static(join(__dirname, 'public')));

/* ------------------------------- run server (turn on the server)------------------------------- */
app.listen(app.get('port'), () => {
    console.log('server listening on port', app.get('port'));
});