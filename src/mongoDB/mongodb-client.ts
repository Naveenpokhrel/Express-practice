import mongoose from "mongoose";

//connect to MongoDB
const url = process.env.MONGODB_URL || "mongodb://localhost:27017/mydatabase";
mongoose.connect(
  "mongodb+srv://admin:admin123@cluster0.feswjj6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
// get a reference to the connection
const db = mongoose.connection;

//log an error if the connection faiils and exit the process
db.on("error", (error) => { 
  console.error("connection error:", error);
});

//log success message once connected
db.once("open", function () {
  console.log("Connected to MongoDB!");
});

export default mongoose;
