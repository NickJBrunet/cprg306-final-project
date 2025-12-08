export default class UserProfile {
    constructor (docId, data, projects) {
        this.data = data;
		this.docId = docId;
		this.projects = projects;
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
        return `${this.getJoinDate().getFullYear()}, ${this.getJoinDate().getMonth() + 1}, ${this.getJoinDate().getDay()}`
    }
}