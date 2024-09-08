const mongoose = require('mongoose');
const config = require('./config');
const schemas = require('../schemas');

const options = {
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connect(config.db_conn('eplus_projects'), options)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));


  
 mongoose.connection.on('connected',async function () {
    console.log('Mongoose default connection open to %s ', mongoose.connection.db.databaseName);

    for (let schema in schemas) {
        mongoose.connection.model(schema, schemas[schema])
    }


});

