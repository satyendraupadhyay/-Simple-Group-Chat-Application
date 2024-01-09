const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res, next) => {
    fs.readFile('username.txt', (err, data) => {
        if (err) {
            console.log(err);
            data = "No data exists";
        }
        res.send(`${data}<form action="/" method="POST" onSubmit="document.getElementById('username').value = localStorage.getItem('username')">
    <input type="text" id="message" name="message" placeholder="Enter the message"><input id="username" name="username" type="hidden" placeholder="Enter the username"><button type="submit">Send</button></form>`);

    })
    
})

app.post('/', (req, res, next) => {
    console.log(req.body.username);
    console.log(req.body.message);
    fs.writeFile("username.txt", `${req.body.username}: ${req.body.message}, `, {flag: 'a'}, (err) => {
        err ? console.log(err) : res.redirect('/');
    })
    
})

app.get('/login', (req, res, next) => {
    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/login" method="POST"><input id="username" name="username" type="text" placeholder="Enter the username"><button type="submit">Send</button></form>');
})

app.post('/login', (req, res, next) => {
    const { username } = req.body;
    const fileName = "username.txt";
    res.redirect('/');
    // fs.appendFile(fileName, username, (err) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
            
    //         res.redirect('/');
    //     }
    // })
});





app.listen(3000);