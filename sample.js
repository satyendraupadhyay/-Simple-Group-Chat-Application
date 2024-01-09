const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

let storedUsername = ''; // Variable to temporarily store the username

app.get('/login', (req, res, next) => {
    res.send('<form action="/login" method="POST"><input id="username" type="text" name="username" placeholder="Enter username"><button type="submit">Send</button></form>');
});

app.post('/login', (req, res, next) => {
    const { username } = req.body;
    storedUsername = username; // Store the username temporarily
    res.redirect('/');
});

app.get('/', (req, res, next) => {
    console.log("In /");
    res.send(`<form action="/" method="POST">
        <input id="message" type="text" name="message" placeholder="Enter the message">
        <input type="hidden" name="username" value="${storedUsername}">
        <button type="submit">Send</button>
    </form>`);
});

app.post('/', (req, res, next) => {
    const { message, username } = req.body;
    console.log('Username:', username);
    console.log('Message:', message);
    const filename = "username.txt";
    
    fs.appendFile(filename, message + '\n', (err) => {
        if (err) {
            console.error(err);
            res.send('Error occurred while writing to file');
        } else {
            console.log('Message written to file');
            res.send('Message added to file successfully');
        }
    });
});

app.listen(3000);



// const bodyParser = require('body-parser');
// const fs = require('fs');
// const express = require('express');
// const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));

// // Render login form
// app.get('/login', (req, res) => {
//     res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/login" method="POST"><input id="username" type="text" name="username" placeholder="Enter username"><button type="submit">Send</button></form>');
// });

// // Handle form submission
// app.post('/login', (req, res) => {
//     const { username } = req.body;
//     const fileName = 'users.txt';

//     fs.appendFile(fileName, username + '\n', (err) => {
//         if (err) {
//             console.error(err);
//             res.send('Error occurred while writing to file');
//         } else {
//             console.log('Data written to file');
//             // Redirect to root route after saving to users.txt
//             res.redirect('/');
//         }
//     });
// });

// // Render form on root route and display contents of users.txt
// app.get('/', (req, res) => {
//     const fileName = 'users.txt';

//     fs.readFile(fileName, 'utf8', (err, data) => {
//         if (err) {
//             console.error(err);
//             res.send('Error occurred while reading file');
//         } else {
//             console.log('Data read from file');
//             res.send(`
//                 <h1>Home Page</h1>
//                 <form action="/" method="POST">
//                     <input type="text" name="data" placeholder="Enter data to save">
//                     <button type="submit">Save</button>
//                 </form>
//                 <h2>Users:</h2>
//                 <pre>${data}</pre>
//             `);
//         }
//     });
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
