// server.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3001;

const db = new sqlite3.Database('./test.db');

app.use(express.json());

app.get('/stockItems', (req, res) => {
    db.all('SELECT * FROM stockItems', (err, rows) => {
        if (err) {
            console.error('Error fetching stock items:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(rows);
        }
    });
});

app.post('/stockItems', (req, res) => {
    const { productName, quantity, note } = req.body;

    db.run('INSERT INTO stockItems (productName, quantity, note) VALUES (?, ?, ?)', [productName, quantity, note], function(err) {
        if (err) {
            console.error('Error adding stock item:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const newItemId = this.lastID;
            res.json({ _id: newItemId, productName, quantity, note });
        }
    });
});

app.delete('/stockItems/:id', (req, res) => {
    const id = req.params.id;

    db.run('DELETE FROM stockItems WHERE _id = ?', [id], function(err) {
        if (err) {
            console.error('Error deleting stock item:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.sendStatus(204);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
