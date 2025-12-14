import {db} from "../app/_utils/firebase-config"
import {collection, getDocs, addDoc, getDoc, doc, query} from "firebase/firestore"
import Project from "./project"

/**

@author Nick Brunet
@coauthers ...
@description Class for handling user data

@date_created December 2nd, 2025

@modified December 8th, 2025

*/

export default class UserProfile {
    constructor (docId, data, projects) {
        this.data = data;
		this.docId = docId;
		this.projects = projects;
        // this.loadProjects()
    }

    /*
        Getter functions
    */
    async getUserDoc(){
        const userDoc = await getDoc(doc(db, "user", this.docId))
        return userDoc.exists() ? userDoc : null
    }

    getProjectCollection() {
        return collection(db, "user", this.docId, "projects")
    }
    getTaskCollection(projectId) {
        return collection(db, "user", this.docId, "projects", projectId, "tasks")
    }

    getDisplayName(){
        return this.data.displayName ? this.data.displayName : this.data.email.split("@")[0]
    }

    getEmail(){
        return this.data.email
    }

    getJoinDate(){
        return new Date(+this.data.metadata.createdAt) // the plus before user.data... converts string to number (Unary Plus Operator)
    }

    getJoinDateString(){
        // A regex split expression that splits at ' xx:' where xx is a number
        return `${this.getJoinDate()}`.split(/ \d{2}:/)[0] 
    }

    /*
        Other Functions
    */

    async createNewProject(project) { // takes project class object as input

        const projectsCollection = this.getProjectCollection()
        const projectDocRef = await addDoc(projectsCollection, project.getFirestoreData())
        const projectDoc = await getDoc(projectDocRef)

        project.setDocId(projectDoc.id)
        this.projects.push(project)

        return projectDoc.exists() ? projectDoc : null
    }
    async createNewTask(project, task) { // takes project class object as input

        const taskCollection = this.getTaskCollection(project.id)
        const taskDocRef = await addDoc(taskCollection, task.getFirestoreData())
        const taskDoc = await getDoc(taskDocRef)

        task.setDocId(taskDoc.id)
        // this.projects.tasks.push(task) doesnt use project class object

        return taskDoc.exists() ? taskDoc : null
    }
}