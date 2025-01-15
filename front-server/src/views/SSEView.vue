<template>
  <div>
    <h1>SSE Notifications</h1>
    <ul>
      <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [], // 알림 메시지 리스트
    }
  },
  mounted() {
    this.startSSE()
  },
  methods: {
    startSSE() {
      const eventSource = new EventSource('http://localhost:3000/sse')

      // 메시지 수신
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data)
        this.messages.push(data.message)
      }

      // 오류 처리
      eventSource.onerror = () => {
        console.error('SSE connection error')
        eventSource.close()
      }
    },
  },
}
</script>
