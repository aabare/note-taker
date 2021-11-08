const router = require("express").Router();
let noteData = require("..db/db.json");
const fs = require("fs");

router.get("/notes", function(req,res){
    res.json(noteData);
});

router.post("/notes", function(req,res){
    let newNote = req.body
    newNote.id = Math.round(Math.random()*1000000);
    noteData.push(newNote);
    fs.writeFile("db/db.json", JSON.stringify(noteData), function(err){
        console.log(err)
    })
    console.log(newNote);
    res.json(noteData);
});

router.delete("/notes/:id", function(req, res){
    let noteId = req.params.id
    noteData = noteData.filter(note => note.id != noteId);
    fs.writeFile("..db/db.json", JSON.stringify(noteData), function(err){console.log("Your note has been deleted!")});
    res.json(noteData);
});

module.exports = router;