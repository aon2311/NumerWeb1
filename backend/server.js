const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: 'numer'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1); 
    }
    console.log('Connected to MySQL database!');
});

app.get('/', (req, res) => {
    return res.json("From Backend Side");
});

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});

app.listen(8081, () => {
    console.log("listening on port 8081");
});
