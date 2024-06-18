const mongoose = require("mongoose");

const connection = async () => {
    try{
        await mongoose
          .connect(
            // url to connect mongo db
          )
          .then(() => {
            console.log("Database Connected");
          });
    }catch(error){
        res.status(400).json({
          message: "Database is not Connected",
        });
    }
};

connection();
