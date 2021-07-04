const router = require('express').Router();
const fs = require('fs');
//promisify fs.readFile so that async and await can be used for this
const util = require('util');
const readFile = util.promisify(fs.readFile);
//nanoid is used to generate unique IDs 
const { nanoid } = require('nanoid');
//prettier is used for formatting
const prettier = require('prettier');

//read the db.json file, parse it and return it
async function getNotes() {
    let notesJSON = await readFile( './db/db.json');
    let notesArray = JSON.parse(notesJSON);
    return notesArray;
};

//when a get request is sent to /api/notes, respond with the contents of the db.json file as a JSON string
router.get('/notes', async (req, res) => {
    let notes = await getNotes();
    res.json(notes);
});

//when a post request is sent to /api/notes, get the content of the db.json file, add the new note, and write the file again
router.post('/notes', async (req, res) => {
    //get the contents of the new note
    let newNote = req.body;

    //give note a unique ID using the nanoID NPM package
    let id = nanoid();
    newNote.id = id;

    //get aray of existing notes
    notesArray = await getNotes();

    //push the new note into the array
    notesArray.push(newNote);

    //convert to a JSON string 
    let notes = JSON.stringify(notesArray);

    //format it as JSON using prettier (this is just to ensure neat formatting in the written db.json file)
    notes = prettier.format(notes, { parser: 'json' });

    //write db.json file
    fs.writeFile('./db/db.json', notes, (err, data) => {
        if (err) {
            console.error(err);
        }
    });
});




module.exports = router;
