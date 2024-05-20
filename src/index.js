/* -------------------------- import dependencies ------------------------- */
import express from 'express'


/* ----------------------------- initialization ----------------------------- */
const app = express();


/* --------------------------------- setting (server and templates) -------------------------------- */
app.set('port', process.env.PORT || 3000)

/* ------------------------------- middlewares ------------------------------- */



/* --------------------------------- routes --------------------------------- */

/* ------------------------------ public files (access)------------------------------ */


/* ------------------------------- run server (turn on the server)------------------------------- */
app.listen(app.get('port'), () => {
    console.log('server listening on port', app.get('port'));
});