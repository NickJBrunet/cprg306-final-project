import {db} from "../_utils/firebase"
import {collection, getDocs, addDoc, getDoc, doc, query} from "firebase/firestore"
import UserProfile from "../_classes/user-profile"


export async function loadUserProfile(user) {
	if (!user){
		return null
	}

	// first check all users to see if userId = user.uid
	const usersRef = collection(db, "user");

	const usersDoc = await getDocs(usersRef);

	const usersResult = usersDoc.docs.map(doc => ({
		id: doc.id,
		...doc.data(),
	}));

	// Gets user from query results
	const userQuery = usersResult.filter(doc => 
		doc.email == user.email
	)[0]

	// First check to see if user document exists...
	try {


		// User document exists! no need to create one
		// return user object with user prop from auth
		// and the document id for easy reference.
		if (userQuery) {
			
			console.log(`Found document for: ${user.displayName} with doc id: ${userQuery.id}`)

			return new UserProfile(
				userQuery.id,
				user,
				[]
			)
			
		} 
		// User document doesnt exist! create a new doc
		// and return user object with user prop from auth
		// and the document id for easy reference
		else {

			// Create new doc for user
			const newDoc = await addDoc(usersRef, {
				email: user.email,
				name: user.displayName
			});

			console.log(`Created new document for: ${user.displayName} with doc id: ${newDoc.id}`)

			// Create a new collection for projects

			return new UserProfile(
				userQuery.id,
				user,
				[]
			)

		}

	} 
	// catch errors.
	catch(error) {

		console.log(error)

	}

}