import mongoose from "mongoose";

const { connection_string } = process.env;

// export const connectionString = "mongodb+srv://bubun:bubun@cluster0.k2fec.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
export const connectionString = connection_string;

export async function connectToDB() {
  if (!connectionString) {
    console.error(
      "Connection string is not defined. Please set the MONGODB_URI environment variable."
    );
    return;
  }
  try {
    await mongoose.connect(connectionString);
    console.log("Successfully connected to the database.");
  } catch (error) {
    if (error.name === "MongoNetworkError") {
      console.error(
        "Network error while connecting to the database. Please check your network connection and database server."
      );
    } else if (error.name === "MongoParseError") {
      console.error(
        "Error parsing the connection string. Please check the format of your connection string."
      );
    } else {
      console.error("Error connecting to the database:", error);
    }
  }
}
