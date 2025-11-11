 //Despliegue del app.js
'use strict';
require('dotenv').config();
const sequelize = require('./App/config/db'); // Importa la instancia directamente
const App = require('./App/app');
const port = process.env.PORT || process.env.APP_PORT || 3000;
sequelize.sync({ force: false })  // Sincroniza modelos con la base de datos
    .then(() => {
        console.info('Base de datos sincronizada correctamente');
        App.listen(port, (error) => {
            if (error) {
                console.error('Error al iniciar el servidor Express:', error);
            } else {
                console.info(`Servidor Express ejecutándose en el puerto ${port}`);
            }
        });
    })
    .catch((error) => {
        console.error('Error en la sincronización de la base de datos:', error);
    });