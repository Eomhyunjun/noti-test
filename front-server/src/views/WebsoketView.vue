<template>
  <div>
    <h1>알림 시스템</h1>
    <section>
      <h2>실시간 알림</h2>
      <p>실시간 알림 메시지:</p>
      <ul>
        <li v-for="(msg, index) in realtimeMessages" :key="index">{{ msg }}</li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { io } from 'socket.io-client'

const realtimeMessages = ref([])
const userId = ref('user1') // 테스트용 사용자 ID

const connectToSocket = () => {
  const socket = io('http://localhost:3002')
  socket.emit('register', userId.value)

  socket.on('notification', (data) => {
    realtimeMessages.value.push(data.message)
  })
}

onMounted(() => {
  connectToSocket()
})
</script>
