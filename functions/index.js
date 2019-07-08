const functions = require('firebase-functions');
const admin = require('firebase-admin');


exports.createPartyEvent = functions.firestore
	.document("partyEvents/{partyEventId}")
	.onCreate((snap, ctx) => {
		const newPartyEvent = snap.data();
		console.log("Doc created");
		var msg = {
			type: "CREATED",
			partyEvent: newPartyEvent
		}
		admin.messaging().send(msg)
			.then((response)=> {
				console.log("Sent CREATED, got response:", response);
				return null;
			})
			.catch((error)=> {
				console.log("Error sending CREATED:", error);
			});
	});

exports.deletePartyEvent = functions.firestore
	.document("partyEvents/{partyEventId}")
	.onDelete((snap, ctx) => {
		const deletedPartyEvent = snap.data();
		console.log("Doc deleted");
		var msg = {
			type: "DELETED",
			partyEvent: deletedPartyEvent
		};
		admin.messaging().send(msg)
		.then((response)=> {
			console.log("Sent DELETED, got response:", response);
			return null;
		})
		.catch((error)=> {
			console.log("Error sending DELETED:", error);
		});
	});

exports.updatePartyEvent = functions.firestore
	.document("partyEvents/{partyEventId}")
	.onUpdate((changed, ctx) => {
		const newPartyEvent = changed.after.data();
		const prevPartyEvent = changed.before.data();
		console.log("Doc updated");
		var msg = {
			type: "UPDATED",
			partyEvent: newPartyEvent
		};
		admin.messaging().send(msg)
			.then((response)=> {
				console.log("Sent UPDATED, got response:", response);
				return null;
			})
			.catch((error)=> {
				console.log("Error sending UPDATED:", error);
			});
	});



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
