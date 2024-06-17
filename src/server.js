const express = require('express');
const router = express.Router(); // Assuming you're using a single router instance
const {json} = require('body-parser');
const morgan = require('morgan');
const cors = require('cors')
const userRoute = require('./routes/user');
const dbConnect = require('./config/db');
const { Sequelize } = require('sequelize');
const port = 3000;
const app = express();
app.use(cors())
app.use(json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
function initServer() {
    const dbConnection = new Sequelize('keyrent', 'postgres', 'admin', {
        host: 'localhost',
        dialect: 'postgres',
        operatorsAliases: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    });
    dbConnection.authenticate().then(() => {
        console.log('Database connected by sequelize orm');
    }).catch((err) => console.log('Error : ' + err))

    app.listen(port, () => {
        console.log(`Server has started on port ${port}`);
    })
}

/* 
All the route files
*/

/* 

Using the route in the app
 */
app.use('/api/user', userRoute);

// app.use('/product', productRoute);

/* 
Middleware to check any error
*/
// app.use((err, req, res, next) => {
//     if (err) {
//         res.status(500).send({
//             status: false,
//             message: err.message
//         })
//     }
// })

initServer();