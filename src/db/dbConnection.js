const mysql = require('mysql2')
require('dotenv').config({ path: './../.env' })

const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    port: process.env.DB_PORT
})

/*dbConnection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    //console.log('Conexión a la base de datos MySQL establecida correctamente.');
    module.exports = dbConnection;
});*/

module.exports = dbConnection;
