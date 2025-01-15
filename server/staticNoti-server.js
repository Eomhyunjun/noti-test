const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const sqlite3 = require("sqlite3").verbose(); // SQLite 사용

const app = express();
app.use(cors());
app.use(express.json());

// SQLite 데이터베이스 초기화
const db = new sqlite3.Database(":memory:"); // 메모리 데이터베이스 사용 (테스트용)
db.serialize(() => {
  db.run(`
    CREATE TABLE notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      message TEXT NOT NULL,
      type TEXT NOT NULL,
      read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// HTTP 서버와 Socket.IO 초기화
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const userSockets = new Map(); // 사용자별 소켓 연결 관리

// **1. 비실시간 알림 API**
// 알림 저장
app.post("/notifications", (req, res) => {
  const { userId, message, type } = req.body;
  db.run(
    "INSERT INTO notifications (user_id, message, type, read) VALUES (?, ?, ?, ?)",
    [userId, message, type, 0],
    function (err) {
      if (err) return res.status(500).send({ error: err.message });
      res.status(201).send({ success: true, id: this.lastID });
    }
  );
});

// 알림 조회
app.get("/notifications/:userId", (req, res) => {
  const { userId } = req.params;
  db.all(
    "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC",
    [userId],
    (err, rows) => {
      if (err) return res.status(500).send({ error: err.message });
      res.send(rows);
    }
  );
});

// 읽음 처리
app.put("/notifications/:id/read", (req, res) => {
  const { id } = req.params;
  db.run(
    "UPDATE notifications SET read = 1 WHERE id = ?",
    [id],
    function (err) {
      if (err) return res.status(500).send({ error: err.message });
      res.send({ success: true });
    }
  );
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
