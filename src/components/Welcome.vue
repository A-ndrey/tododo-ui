<template>
  <div id="welcome">
    <img src="@/assets/logo.svg" alt="logo"/>
    <p>Welcome to the Tododo. This service helps you get organized and achieve your goals.</p>
    <button class="p-btn" @click="login()">Login</button>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  methods: {
    login() {
      this.$store.dispatch('login')
    }
  }
}
</script>

<style scoped>
#welcome {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

p {
  max-width: 20%;
  margin: 50px;
}
</style>