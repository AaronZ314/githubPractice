const express = require('express');
const fs = require('fs');
const path = require('path');
const server = express();
const port = 3000;

//Load public folder statically
server.use(express.static('public'));

function updateHitCounter(){
    const filepath = 'hits.txt';
    let hits = 0;
    if(fs.existsSync(filepath)) {
        const data = fs.readFileSync(filepath, 'utf-8');
        hits = parseInt(data);
    }
    hits++;
    fs.writeFileSync(filepath,hits.toString());
    return hits;
}
//API endpoint that returns info on how many visits there have been
server.get('/hits', (req,res)=>{
    const hits = updateHitCounter();
    res.json({hitcount:hits});
});

function getRandomWord(){
    const filepath = 'allwords.txt';
    if(fs.existsSync(filepath)) {
        const data = fs.readFileSync(filepath, 'utf-8');
        const lines = data.split('\n');
        const randomLine = lines[Math.floor(Math.random()*lines.length)];
        const parts = randomLine.split()
        const [word,part,defn] = randomLine.split('\t');
        return {word:word, part:part, definition:defn};
    }

}

server.get('/wordRequest', (req, res)=>{
    const wordInfo = getRandomWord();
    res.json(wordInfo)
});
server.get('/goodbye', function(req, res) {
    res.send('bye!');
});

server.get('/hello', function(req, res) {
    res.send('<h1>Hello World!</h1>');
});

server.listen(port,function(){
    console.log(`Listening at http://localhost:${port}`);
});

