export default class Project {
    constructor (docId, name, isCompleted, dateDue, dateCreated, description, tasks) {
        this.docId = docId;
        this.name = name;
        this.isCompleted = isCompleted;
        this.dateDue = dateDue;
        this.dateCreated = dateCreated;
        this.description = description;
        this.tasks = tasks
    }
}