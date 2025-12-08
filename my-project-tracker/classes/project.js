/**

@author Nick Brunet
@coauthers ...
@description Class for handling project data

@date_created December 2nd, 2025

@modified December 8th, 2025

*/

export default class Project {
    constructor (docId, name, isCompleted, dateDue, dateCreated, description, tasks) {
        this.docId = docId;
        this.name = name;
        this.isCompleted = isCompleted ? isCompleted : false;
        this.dateDue = dateDue ? dateDue : new Date()
        this.dateCreated = dateCreated ? dateCreated : new Date()
        this.description = description ? description : ""
        this.tasks = tasks ? tasks : []
    }

    setDocId(newDocId){
        this.docId = newDocId;
    }

    getFirestoreData(){
        return {
            name: this.name,
            description: this.description,
            dateDue: this.dateDue.getTime(),
            dateCreated: this.dateCreated.getTime(),
            isCompleted: this.isCompleted,
        }
    }
}