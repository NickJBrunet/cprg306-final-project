import { db } from "../_utils/firebase-config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

/**

 @author Firaol Ahmed
 @coauthers ...
 @description methods to aid in tasks services across the website

 @date_created December 12th, 2025

 @modified ...

 */

export async function getTasks(userId, projectId) {
  if (!userId || !projectId) return [];
  try {
    const tasksRef = collection(
      db,
      "user",
      userId,
      "projects",
      projectId,
      "tasks",
    );
    const tasksDoc = await getDocs(tasksRef);

    return tasksDoc.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getTasksByDocId(userId, projectId, taskId) {
  if (!userId || !projectId || !taskId) {
    console.log("missing id");
    return null;
  }

  try {
    const taskRef = doc(
      db,
      "user",
      userId,
      "projects",
      projectId,
      "tasks",
      taskId,
    );
    const taskDoc = await getDoc(taskRef);

    if (taskDoc.exists()) {
      return {
        id: taskDoc.id,
        ...taskDoc.data(),
      };
    } else {
      console.log("No task with this docId");
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
