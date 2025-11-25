// server.js (simple message filter backend)
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data', 'messages.json');

// helper: read messages
async function readMessages() {
  try {
    const txt = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(txt || '[]');
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

// helper: write messages
async function writeMessages(arr) {
  await fs.writeFile(DATA_FILE, JSON.stringify(arr, null, 2), 'utf8');
}

// Health
app.get('/', (req, res) => res.send('Running - message filter easy'));

// GET /messages
// optional query: ?user=USERNAME
app.get('/messages', async (req, res) => {
  try {
    const { user } = req.query;
    let messages = await readMessages();

    if (user) {
      const u = String(user).toLowerCase();
      messages = messages.filter(m => String(m.userId).toLowerCase() === u);
    }

    // newest first
    messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ total: messages.length, data: messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /messages  -> create new message
// body: { "userId": "name", "text": "message text" }
app.post('/messages', async (req, res) => {
  try {
    const { userId, text } = req.body;
    if (!userId || !text) return res.status(400).json({ error: 'userId and text required' });

    const messages = await readMessages();
    const newMsg = {
      id: uuidv4(),
      userId: String(userId),
      text: String(text),
      createdAt: new Date().toISOString()
    };
    messages.push(newMsg);
    await writeMessages(messages);
    res.status(201).json(newMsg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
