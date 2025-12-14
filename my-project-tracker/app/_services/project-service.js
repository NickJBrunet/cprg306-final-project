import { db } from "../_utils/firebase-config";
import { collection, doc, updateDoc, getDoc, getDocs } from "firebase/firestore";

/**

 @author Firaol Ahmed
 @coauthers ...
 @description methods to aid in projects services across the website

 @date_created December 8th, 2025

 @modified December 9th, 2025

 */

export async function getProjects(userId) {
  if (!userId) return [];
  try {
    const projectsRef = collection(db, "user", userId, "projects");
    const projectsDoc = await getDocs(projectsRef);

    return projectsDoc.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getProjectByDocId(userId, projectId) {
  if (!userId || !projectId) {
    console.log("missing userId or projectId");
    return null;
  }

  try {
    const projectRef = doc(db, "user", userId, "projects", projectId);
    const projectDoc = await getDoc(projectRef);

    if (projectDoc.exists()) {
      return {
        id: projectDoc.id,
        ...projectDoc.data(),
      };
    } else {
      console.log("No project with this docID.");
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function updateProjectStatus(userId, projectId, newStatus) {
  try {
    const projectRef = doc(db,"user", userId, "projects", projectId);

    await updateDoc(projectRef, {
      isCompleted: newStatus
    });
    return true;
  } catch (error) {
    console.log(error);
    // return false
  }
}