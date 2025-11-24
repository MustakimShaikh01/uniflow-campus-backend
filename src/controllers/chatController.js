const messages = [
  { id: 1, from: "BE001", to: "mentor-1", text: "Hello sir, I have a doubt." },
];

// GET /api/chat/messages
// Supports pagination via query params: ?page=<number>&limit=<number>&from=&to=&sort=asc|desc
export const getMessages = (req, res) => {
  const { page = "1", limit = "20", from, to, sort = "asc" } = req.query;

  let pageNum = parseInt(page, 10);
  let limitNum = parseInt(limit, 10);

  if (isNaN(pageNum) || pageNum < 1) pageNum = 1;
  if (isNaN(limitNum) || limitNum < 1) limitNum = 20;

  // apply filtering
  let filtered = messages;
  if (from) filtered = filtered.filter((m) => String(m.from) === String(from));
  if (to) filtered = filtered.filter((m) => String(m.to) === String(to));

  // sorting by id
  if (String(sort).toLowerCase() === "desc") {
    filtered = [...filtered].sort((a, b) => b.id - a.id);
  } else {
    filtered = [...filtered].sort((a, b) => a.id - b.id);
  }

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limitNum));

  // clamp pageNum to totalPages
  if (pageNum > totalPages) pageNum = totalPages;

  const start = (pageNum - 1) * limitNum;
  const data = filtered.slice(start, start + limitNum);

  res.json({ total, page: pageNum, limit: limitNum, totalPages, data });
};

export const sendMessage = (req, res) => {
  const { from, to, text } = req.body || {};
  if (!from || !to || !text) {
    return res.status(400).json({ error: 'from, to and text are required' });
  }

  const newMessage = {
    id: messages.length + 1,
    from,
    to,
    text,
  };
  messages.push(newMessage);
  res.status(201).json(newMessage);
};
