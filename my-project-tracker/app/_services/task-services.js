import { db } from "../_utils/firebase-config";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

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

export async function updateTaskStatus(userId, projectId, taskId, newStatus) {
  try {
    const taskRef = doc(db,"user", userId, "projects", projectId, "tasks", taskId);

    await updateDoc(taskRef, {
      isCompleted: newStatus
    });
    return true;
  } catch (error) {
    console.log(error);
    // return false
  }
}
