const router = require('express').Router();
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const { nanoid } = require('nanoid');
const prettier = require('prettier');

//when a get request is sent to /api/notes, respond with the contents of the db.json file as a JSON string
router.get('/notes', (req, res) => {
    //read the db.json file
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        //parse data
        let response = JSON.parse(data);

        //respond with JSON
        res.json(response);
    });
});

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

async function getNotes() {
    let notesJSON = await readFile( './db/db.json');
    let notesArray = JSON.parse(notesJSON);
    return notesArray;
};

module.exports = router;
