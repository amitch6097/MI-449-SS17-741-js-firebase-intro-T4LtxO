// TODO Sign into the database anonymously
firebase.auth().signInAnonymously()

// CREATE a new woof in Firebase
function createWoofInDatabase (woof) {
  // var time = woof.created_at;
  // var text = woof.text;
  firebase.database().ref('woofs').push(woof)
}

// READ from Firebase when woofs are added, changed, or removed
// Write a function for each 'on' method and call addWoofRow,
// updateWoofRow, and deleteWoofRow to update the page. Make
// sure to pass the right parameters (hint: these functions are
// defined in woofer-ui.js).
function readWoofsInDatabase () {
  // TODO read new, changed, and deleted Firebase records
  firebase.database().ref('woofs')
    .on('child_added', childAdded);

  firebase.database().ref('woofs')
    .on('child_changed', childChanged);

  firebase.database().ref('woofs')
    .on('child_removed', childRemoved);
}

function childAdded(jokeSnapshot){
  // console.log('Key:', jokeSnapshot.key)
  // console.log('Setup:', jokeSnapshot.val().setup)
  // console.log('Punchline:', jokeSnapshot.val().punchline)
  addWoofRow(jokeSnapshot.key, jokeSnapshot.val())
}

function childChanged(jokeSnapshot){
  // console.log('Key:', jokeSnapshot.key)
  // console.log('Setup:', jokeSnapshot.val().setup)
  // console.log('Punchline:', jokeSnapshot.val().punchline)
  updateWoofRow(jokeSnapshot.key, jokeSnapshot.val())
}

function childRemoved(jokeSnapshot){
  // console.log('Key:', jokeSnapshot.key)
  // console.log('Setup:', jokeSnapshot.val().setup)
  // console.log('Punchline:', jokeSnapshot.val().punchline)
  deleteWoofRow(jokeSnapshot.key)
}

// UPDATE the woof in Firebase
function updateWoofInDatabase (woofKey, woofText) {
  // TODO update the record in Firebase
  firebase.database().ref('woofs').child(woofKey+'/text').set(woofText)
}

// DELETE the woof from Firebase
function deleteWoofFromDatabase (woofKey) {
  // TODO delete the record from Firebase
  firebase.database().ref('woofs').child(woofKey).remove()
}

// Load all of the data
readWoofsInDatabase()
