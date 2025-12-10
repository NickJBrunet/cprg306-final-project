import {db} from "../_utils/firebase-config"
import {collection, getDocs} from "firebase/firestore";
export async function getProjects(userId) {
    if (!userId) return [];
    try {
        const projectRef = collection(db, "user", userId, "projects");
        const projectDoc = await getDocs(projectRef);

        const projectList = projectDoc.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        return projectList;
    } catch (error) {
        console.log(error);
        return [];
    }

}