const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

// HTTP 서버와 Socket.IO 초기화
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const userSockets = new Map(); // 사용자별 소켓 연결 관리

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // 사용자 등록
  socket.on("register", (userId) => {
    userSockets.set(userId, socket);
  });

  // 연결 해제
  socket.on("disconnect", () => {
    for (const [userId, s] of userSockets.entries()) {
      if (s.id === socket.id) {
        userSockets.delete(userId);
        break;
      }
    }
    console.log("User disconnected:", socket.id);
  });
});

// 실시간 알림 전송 함수
function sendRealTimeNotification(userId, message) {
  const socket = userSockets.get(userId);
  if (socket) {
    socket.emit("notification", { message });
  }
}

// 테스트용 실시간 알림 엔드포인트
app.post("/realtime-notifications", (req, res) => {
  const { userId, message } = req.body;
  sendRealTimeNotification(userId, message);
  res.send({ success: true });
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
