## 비실시간 알림 추가 명령어

**power shell**

```shell
Invoke-RestMethod -Uri "http://localhost:3001/notifications" -Method POST -Headers @{
    "Content-Type" = "application/json"
} -Body '{
    "userId": "user1",
    "message": "새로운 메시지가 도착했습니다.",
    "type": "info"
}'
```

## WebSocket 알림 추가 명령어

**power shell**

```shell
Invoke-RestMethod -Uri "http://localhost:3002/realtime-notifications" -Method POST -Headers @{
    "Content-Type" = "application/json"
} -Body '{
    "userId": "user1",
    "message": "실시간 알림 테스트 메시지입니다."
}'
```

## SSE 알림

시간마다 자동으로 보냄.
