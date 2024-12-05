const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM notes WHERE user_id = ?', [req.user.userId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/', authMiddleware, async (req, res) => {
    const { title, content } = req.body;

    try {
        await pool.query('INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)', [title, content, req.user.userId]);
        res.status(201).json({ message: 'Note added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;