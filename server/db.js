const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://0.0.0.0:27017/mydba';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });