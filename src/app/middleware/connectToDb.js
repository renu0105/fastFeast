import mongoose from "mongoose";
const connectToDb = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("connected to db");
  } else {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connecting to db");
  }
};
export default connectToDb;
