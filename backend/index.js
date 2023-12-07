const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Add body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "users"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    // Create the 'signup' table
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS signup (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255),
            email VARCHAR(255),
            password VARCHAR(255)
        )
    `;

    con.query(createTableQuery, (err, result) => {
        if (err) {
            console.error(err);
            throw err;
        }
        console.log("Table 'signup' created or already exists");
    });
});

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    const sql = "INSERT INTO signup (username, email, password) VALUES (?, ?, ?)";
    const values = [name, email, password];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error signing up..' });
        } else {
            console.log('User signed up successfully');
            res.status(200).json({ success: 'User signed up successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
