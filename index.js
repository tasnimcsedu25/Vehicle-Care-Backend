const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vehicle care'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Vehicle Care API');
});

// User routes
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/users/:UserID', (req, res) => {
    const sql = 'SELECT * FROM users WHERE UserID = ?';
    db.query(sql, [req.params.UserID], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    const sql = 'INSERT INTO users (UserName, Email, Password) VALUES (?, ?, ?)';
    db.query(sql, [newUser.UserName, newUser.Email, newUser.Password], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.put('/users/:UserID', (req, res) => {
    const updatedUser = req.body;
    const sql = 'UPDATE users SET UserName = ?, Email = ?, Password = ? WHERE UserID = ?';
    db.query(sql, [updatedUser.UserName, updatedUser.Email, updatedUser.Password, req.params.UserID], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.delete('/users/:UserID', (req, res) => {
    const sql = 'DELETE FROM users WHERE UserID = ?';
    db.query(sql, [req.params.UserID], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Vehicle routes
app.get('/vehicles', (req, res) => {
    const sql = 'SELECT * FROM vehicles';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/vehicles/:vehicleID', (req, res) => {
    const sql = 'SELECT * FROM vehicles WHERE vehicleID = ?';
    db.query(sql, [req.params.vehicleID], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/vehicles', (req, res) => {
    const newVehicle = req.body;
    const sql = 'INSERT INTO vehicles (model, engineNumber, chesisNumber) VALUES (?, ?, ?)';
    db.query(sql, [newVehicle.model, newVehicle.engineNumber, newVehicle.chesisNumber], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.put('/vehicles/:vehicleID', (req, res) => {
    const updatedVehicle = req.body;
    const sql = 'UPDATE vehicle SET model = ?, engineNumber = ?, chesisNumber = ? WHERE vehicleID = ?';
    db.query(sql, [updatedVehicle.model, updatedVehicle.engineNumber, updatedVehicle.chesisNumber, req.params.vehicleID], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.delete('/vehicles/:vehicleID', (req, res) => {
    const sql = 'DELETE FROM vehicle WHERE vehicleID = ?';
    db.query(sql, [req.params.vehicleID], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});

module.exports = db;
//
