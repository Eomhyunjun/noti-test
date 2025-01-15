<template>
  <div>
    <h1>알림 시스템</h1>

    <section>
      <h2>비실시간 알림</h2>
      <button @click="fetchNotifications">알림 가져오기</button>
      <ul>
        <li v-for="notification in notifications" :key="notification.id">
          <strong>{{ notification.type }}</strong
          >: {{ notification.message }}
          <button v-if="!notification.read" @click="markAsRead(notification.id)">읽음 처리</button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const notifications = ref([])
const userId = ref('user1') // 테스트용 사용자 ID

const fetchNotifications = async () => {
  console.log(userId.value)
  const response = await fetch(`http://localhost:3001/notifications/${userId.value}`)
  notifications.value = await response.json()
}

const markAsRead = async (notificationId) => {
  await fetch(`http://localhost:3001/notifications/${notificationId}/read`, {
    method: 'PUT',
  })
  fetchNotifications()
}
</script>
