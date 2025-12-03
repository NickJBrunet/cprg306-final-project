export default class Task {
    constructor (docId, name, isCompleted, dateDue, dateCreated, description) {
        this.docId = docId;
        this.name = name;
        this.isCompleted = isCompleted;
        this.dateDue = dateDue;
        this.dateCreated = dateCreated;
        this.description = description;
    }
}