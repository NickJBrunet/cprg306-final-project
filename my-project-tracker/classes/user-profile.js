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
        this.loadProjects()
    }

    /*
        Getter functions
    */
    async getUserDoc(){
        const userDoc = await getDoc(doc(db, "user", this.docId))
        return userDoc.exists() ? userDoc : null
    }

    getProjectCollection(){
        return collection(db, "user", this.docId, "projects")
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

    async loadProjects(){
        const projectSnaps = await getDocs(this.getProjectCollection());
        var loadedProjects = []

        projectSnaps.forEach(project => {
            loadedProjects.push(new Project(
                project.id,
                project.data().name,
                project.data().isCompleted,
                new Date(project.data().dateDue),
                new Date(project.data().dateCreated),
                project.data().description,
                [] // need to add task loading here
            ))
        });

        this.projects = loadedProjects
    }

   async createNewProject(project){ // takes project class object as input

        const projectsCollection = this.getProjectCollection()
        const projectDocRef = await addDoc(projectsCollection, project.getFirestoreData())
        const projectDoc = await getDoc(projectDocRef)

        project.setDocId(projectDoc.id)
        this.projects.push(project)

        return projectDoc.exists() ? projectDoc : null
   }

   containsProjectName(projectName){
        const projectsFound = this.projects.filter(project => project.name == projectName)

        return projectsFound[0] ? true : false
   }
}