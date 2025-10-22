const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",   
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "numer"
})

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err)
        process.exit(1); 
    }
    console.log('Connected to MySQL database!')
})

app.get('/', (req, res) => {
    return res.json("From Backend Side")
})

/*
app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users"
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    })
})
*/

//---bisec
app.post('/api/bisection', (req, res) => {
  const { fx, xl, xr, tolerance } = req.body;
  console.log("Received POST:", { fx, xl, xr, tolerance });
  const sql = "INSERT INTO bisection_problems (fx, xl, xr, tolerance, date) VALUES (?, ?, ?, ?, NOW())";
  db.query(sql, [fx, xl, xr, tolerance], (err, result) => {
    if (err) {
      console.error("DB Insert error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Problem saved successfully!", id: result.insertId });
  });
});
app.get('/api/bisection', (req, res) => {
  const sql = "SELECT * FROM bisection_problems";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});
//------------------------------------
app.listen(8081, () => {
    console.log("listening on port 8081");
})
