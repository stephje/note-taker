const router = require('express').Router();
const fs = require('fs');
//promisify fs.readFile so that async and await can be used
const util = require('util');
const readFile = util.promisify(fs.readFile);
//nanoid is used to generate unique IDs
const { nanoid } = require('nanoid');
//prettier is used for formatting
const prettier = require('prettier');

//read the db.json file, parse it and return it
async function getNotes() {
    let notesJSON = await readFile('./db/db.json');
    let notesArray = JSON.parse(notesJSON);
    return notesArray;
}

//convert array to JSON string, format with prettier, and write db.json file
function writeNotesFile(notesArray) {
    let notes = JSON.stringify(notesArray);
    notes = prettier.format(notes, { parser: 'json' });
    fs.writeFile('./db/db.json', notes, (err, data) => {
        if (err) {
            console.error(err);
        }
    });
}

//when a get request is sent to /api/notes, respond with the contents of the db.json file as a JSON string
router.get('/notes', async (req, res) => {
    let notes = await getNotes();
    return res.json(notes);
});

//when a post request is sent to /api/notes, get the content of the db.json file, add the new note, and write the file again
router.post('/notes', async (req, res) => {
    //get the contents of the new note
    let newNote = req.body;

    //give note a unique ID using the nanoID NPM package
    let id = nanoid();
    newNote.id = id;

    //get aray of existing notes and push the new note onto the array
    let notesArray = await getNotes();
    notesArray.push(newNote);

    writeNotesFile(notesArray);

    return res.json(notesArray);
});

//when a delete request is sent to /api/notes/:id, delete the note with that id
router.delete('/notes/:id', async function (req, res) {
    //get the id from the request
    let id = req.params.id;

    //get the array of exising notes
    let notesArray = await getNotes();

    //find the note that needs to be deleted, then find the index of that note
    let noteToDelete = notesArray.find(note => note.id === id);
    let index = notesArray.indexOf(noteToDelete);

    //remove the note from the array using the splice array method
    notesArray.splice(index, 1);

    writeNotesFile(notesArray);

    return res.json(notesArray);
});

module.exports = router;
