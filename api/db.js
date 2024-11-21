// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://retrojoker:savetrees@mymongodbcluster.bk0uiz1.mongodb.net/MyMongoDBCluster?retryWrites=true&w=majority&appName=MyMongoDBCluster', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
