const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    
        if (connection) console.log(`[database] established connection to the database(${process.env.DB_NAME})`);
    } catch (error) {
        console.log("[database] error establishing a database connection");
    }
}

connectDB();