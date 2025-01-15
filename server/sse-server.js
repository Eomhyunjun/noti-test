const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// SSE 연결 핸들러
app.get("/sse", (req, res) => {
  // SSE 헤더 설정
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // 연결이 열렸음을 클라이언트에 알림
  res.write("event: open\n");
  res.write("data: Connected to SSE\n\n");

  // 일정 간격으로 메시지 전송 (예: 5초 간격)
  const interval = setInterval(() => {
    const data = {
      message: `Hello! Time: ${new Date().toISOString()}`,
    };
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 5000);

  // 클라이언트가 연결을 끊었을 때 처리
  req.on("close", () => {
    clearInterval(interval);
    console.log("SSE connection closed");
  });
});

// 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`SSE server running on http://localhost:${PORT}`);
});
