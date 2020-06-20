const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const fs = require('fs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));


app.get('/notes', (request, response) => {
    response.send(JSON.parse(fs.readFileSync("../database/saved-notes.json").toString()));
});

app.post('/notes', (request, response) => {
    let body = request.body;
    if(!body.hasOwnProperty('value') || body.value == ""){
        response.status(500).send({error : "value dosen't exist on this object"});
    } else {
        let notes = JSON.parse(fs.readFileSync("../database/saved-notes.json").toString());
        let note = {
            id : (notes.length + 1),
            value : body.value,
            isPinned : false
        };
        notes.push(note);
        fs.writeFileSync("../database/saved-notes.json", JSON.stringify(notes, null, 2));
        response.status(200).send(JSON.parse(fs.readFileSync("../database/saved-notes.json").toString()));
      }    
});

app.put('/notes/:id', (request, response) => {
    let newObject = request.body;
    let isObjectValid = false;
    let objectFound = false;
    if(newObject.hasOwnProperty("value") && newObject.hasOwnProperty("id") && newObject.hasOwnProperty("isPinned")){isObjectValid = true}     
    if(!isObjectValid){
        response.status(500).send({error : "wrong value OR value field is empty..!"});
    } else {
        let notes = JSON.parse(fs.readFileSync("../database/saved-notes.json").toString());
        for(var i = 0; i < notes.length; i++){
            if(notes[i].id == request.params.id){
                notes[i] = newObject;
                objectFound = true;
                fs.writeFileSync("../database/saved-notes.json", JSON.stringify(notes, null, 2));
                break;
            }
        }
        if(!objectFound){
            response.status(500).send({error : "object with this id is not found.."});
        } else {
            response.status(200).send(JSON.parse(fs.readFileSync("../database/saved-notes.json").toString()));
        }
    }
});

app.delete('/notes/:id', (request, response) => {
    let notes = JSON.parse(fs.readFileSync("../database/saved-notes.json").toString());
    let objectFound = false;
    for(var i = 0; i < notes.length; i++){
        if(notes[i].id == request.params.id){
            notes.splice(i, 1);
            fs.writeFileSync("../database/saved-notes.json", JSON.stringify(notes, null, 2));
            objectFound = true;
            break;
        }
    }
    if(!objectFound){
        response.status(500).send({error : "object with this id is not found"});
    } else  {
        response.status(200).send(JSON.parse(fs.readFileSync("../database/saved-notes.json").toString()));
    }
})


app.listen(3000, () => {
    console.log("API is running at localhost:3000/notes")
});



