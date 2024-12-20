import { connectToDB } from "../../db";
import { Content } from "./Content";

const ID = 100;

async function getUniqueId() {
  try {
    const getLatestId = await Content.findOne().sort({ id: -1 });
    if (getLatestId && getLatestId.id !== undefined) {
      return getLatestId.id + 1;
    }
    return ID;
  } catch (error) {
    console.error("Error fetching the latest ID:", error);
    throw new Error("Unable to fetch the latest ID");
  }
}

async function saveDataToDB(data) {
  try {
    console.log("Data to save:", data);
    const content = new Content(data);
    await content.save();
  } catch (error) {
    console.error("Error saving data to DB:", error);
    throw new Error("Unable to save data to DB");
  }
}

async function getAllContentFromDB() {
  try {
    await connectToDB();
    const data = await Content.find().lean();
    return data;
  } catch (error) {
    console.error("Error fetching data from DB:", error);
    throw new Error("Unable to fetch data from DB");
  }
}

async function getContentById(id) {
  try {
    await connectToDB();
    const content = await Content.findOne({
      id: id,
    }).lean();
    return content;
  } catch (error) {
    console.error("Error fetching content by ID:", error);
    throw new Error("Unable to fetch content by ID");
  }
}

export { getUniqueId, saveDataToDB, getAllContentFromDB, getContentById };
