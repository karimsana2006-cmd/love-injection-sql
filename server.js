const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));

// In-memory database for CTF
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(`
    CREATE TABLE users (
      username TEXT,
      password TEXT
    )
  `);

  db.run(`
    INSERT INTO users VALUES ('cupid', 'love123')
  `);
});

// 🚩 FLAG — ONLY EXISTS ON SERVER
const FLAG = "FLAG{cupid_loves_sql_injection}";

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // ❌ INTENTIONALLY VULNERABLE QUERY
  const query = `
    SELECT * FROM users
    WHERE username = '${username}'
    AND password = '${password}'
  `;

  console.log("Executed query:", query);

  db.all(query, (err, rows) => {
    if (err) {
      return res.json({ success: false });
    }

    if (rows.length > 0) {
      return res.json({
        success: true,
        flag: FLAG
      });
    } else {
      return res.json({ success: false });
    }
  });
});

app.listen(PORT, () => {
  console.log(`CTF server running at http://localhost:${PORT}`);
});
