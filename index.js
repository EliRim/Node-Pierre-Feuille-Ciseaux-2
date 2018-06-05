const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get("/game", function (req, res) {
    res.render('game', {});
} );

app.post("/gameresult", function (req, res) {
    let valueUser1 = req.body.valueUser1;
    let valueUser2 = req.body.valueUser2;
    let winningUser = [];
    if((valueUser1 === "Pierre")&&(valueUser2 === "Feuille")){
        winningUser = "User 2"
    } else if((valueUser1 === "Pierre")&&(valueUser2 === "Ciseaux")){
        winningUser = "User 1"
    } else if((valueUser1 === "Feuille")&&(valueUser2 === "Pierre")){
        winningUser = "User 1"
    } else if((valueUser1 === "Feuille")&&(valueUser2 === "Ciseaux")){
        winningUser = "User 2"
    } else if((valueUser1 === "Ciseaux")&&(valueUser2 === "Pierre")){
        winningUser = "User 2"
    } else if((valueUser1 === "Ciseaux")&&(valueUser2 === "Feuille")){
        winningUser = "User 1"
    } else { winningUser = "Nobody"
    }
    
    res.render('gameresult', {valueUser1, valueUser2, winningUser});
} );

app.get('/', function (req, res) {
    res.render('home', {maintenant: (new Date()).toLocaleTimeString(), students: [{name:"Marie","sex":"female"},{"name":"Joseph","sex":"male", honors:true},{"name":"Pierre","sex":"male"}]});
});


app.get('/mapage', (req, res) => res.send('Tu ne devrais pas être là!!!'));
app.use(express.static('client'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));

