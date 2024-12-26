const mongoose = require('mongoose');

const MONGODB_URL = process.env.DB_URI;


const connectDb = () => {
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    }).then(() => {
        console.log(`Db connceted sucessfully`)
    }).catch((err) => console.log(`no connect err=`, `${err}`))
}
module.exports = { connectDb }

