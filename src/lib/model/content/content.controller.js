import { getUniqueId,saveDataToDB } from "./content.model";

export async function modifyBody(body) {
  try {
    const id = await getUniqueId();
    const data = {
      id: id,
      contentName: body.contentName,
      categorize: body.categorize,
      taskItems: body.taskItems,
      cloze: body.cloze,
      clozeHeader: body.clozeText,
      comprehension: body.Comprehension,
      comprehensionHeader: body.comprehensionText,
    };

    console.log("reached at controller Data to save:", data);
    await saveDataToDB(data);
 
  } catch (error) {
    console.log("Error modifying body:", error);
  }
}
