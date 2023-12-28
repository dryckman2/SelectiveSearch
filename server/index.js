import express, {
    json
} from 'express';

import readline from 'readline'


import db from './config/db.js';

import cors from 'cors';

const app = express();

const PORT = 3002;
app.use(cors());
app.use(json())

// Route to get all posts
app.get("/api/get", (req, res) => {
    db.query("SELECT * FROM Account", (err, result) => {
        if (err) {
            console.log(err)
            db.end();
        }
        res.send(result)
    });
});

app.get("/api/login/:username/:password", (req, res) => {
    const username = req.params.username
    const password = req.params.password
    db.query(`SELECT * FROM Account WHERE email = ? and password = ?`, [username, password], (err, result) => {
        if (err) {
            console.log(err)
            db.end();
        }
        res.send(result)
    });
});

// // Route to get one post
// app.get("/api/getFromId/:id", (req, res) => {

//     const id = req.params.id;
//     query("SELECT * FROM posts WHERE id = ?", id, (err, result) => {
//         if (err) {
//             console.log(err)
//         }
//         res.send(result)
//     });
// });

// // Route for creating the post
// app.post('/api/create', (req, res) => {

//     const username = req.body.userName;
//     const title = req.body.title;
//     const text = req.body.text;

//     console.log(username, title, text)

//     query("INSERT INTO posts (title, post_text, user_name) VALUES (?,?,?)", [title, text, username], (err, result) => {
//         if (err) {
//             console.log(err)
//         }
//         console.log(result)
//     });
// })

// // Route for like
// app.post('/api/like/:id', (req, res) => {

//     const id = req.params.id;
//     query("UPDATE posts SET likes = likes + 1 WHERE id = ?", id, (err, result) => {
//         if (err) {
//             console.log(err)
//         }
//         console.log(result)
//     });
// });

// // Route to delete a post

// app.delete('/api/delete/:id', (req, res) => {
//     const id = req.params.id;

//     query("DELETE FROM posts WHERE id= ?", id, (err, result) => {
//         if (err) {
//             console.log(err)
//         }
//     })
// })


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
    initializePrompt()
})

const inter = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function initializePrompt() {
    inter.question("server> ", (cmd) => {
        if (cmd.toLowerCase() === 'exit') {
            db.end();
            inter.close();
            console.log("Server closed successfully")
        }
    })
}