const mongoose = require('mongoose');
const config = require('../../config');
let URI_MONGO;

if(process.env.NODE_ENV === 'test') {
    URI_MONGO = config.MONGO_URI_TEST
} else {
    URI_MONGO = config.MONGO_URI
}

const connectDb = () => {
    mongoose.connect(URI_MONGO, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }, (err) => {
        if (err) {
            throw err
        } else {
            console.log('Connect database success!');
        }
    })
}

/* When connect successfully  */
mongoose.connection.on('connected', function () {
    console.info('Mongoose default connection open to ' + URI_MONGO);
})

/* If connect throw error */
mongoose.connection.on('error', function (err) {
    console.info('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.info('Mongoose default connection disconnected');
  });

  // If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.info(
        'Mongoose default connection disconnected through app termination',
      );
      throw new Error(
        'Mongoose default connection disconnected through app termination',
      );
    });
});

const closeDb = () => {
    mongoose.connection.close(function () {
        console.log('Mongoose connection disconnected');
    });
}

const dropCollectionByName = (name, cb) => {
    if(!name) {
        return null;
    }
    mongoose.connection.collections[name].drop((err) => {
        if(err) {
            cb(err, false);
        } else {
            console.log(`Collection ${name} dropped`);
            cb(null, true)
        }
    })
}


module.exports = {
    connectDb,
    closeDb,
    dropCollectionByName
}