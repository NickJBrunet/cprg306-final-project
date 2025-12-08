/**

@author Nick Brunet
@coauthers ...
@description Class for handling task data

@date_created December 2nd, 2025

@modified December 8th, 2025

*/

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