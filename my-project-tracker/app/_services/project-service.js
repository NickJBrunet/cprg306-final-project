import {db} from "../_utils/firebase-config"
import {collection, getDocs} from "firebase/firestore";


/**

 @author Firaol Ahmed
 @coauthers ...
 @description methods to aid in user services across the website

 @date_created December 8th, 2025

 @modified December 9th, 2025

 */

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