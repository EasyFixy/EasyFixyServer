const mysql = require('mysql')

const dbConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'root',
    database: 'easifixy'
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
