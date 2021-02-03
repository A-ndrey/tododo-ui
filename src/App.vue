<template>
  <div id="app">
    <welcome v-if="!loggedIn"></welcome>
    <div id="main" v-else>
      <nav-bar></nav-bar>
      <div id="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Welcome from "@/components/Welcome";
import NavBar from "@/components/NavBar";

export default {
  name: 'App',
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn
    }
  },
  components: {
    Welcome,
    NavBar
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap');

html, body {
  margin: 0;
  height: 100vh;
  color: white;
}

#main {
  height: 100%;
}

#app {
  font-family: "Open Sans", sans-serif;
  height: 100%;
  background: linear-gradient(45deg, #26007D, #0039B5, #0066D3, #008DD9, #00B2CB, #00D5B5) fixed;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

button {
  position: relative;
  display: inline-block;
  padding: .75em 2em;
  border: 2px white solid;
  border-radius: 10em;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  font-size: 1em;
  transition-duration: 0.3s;
}

.p-btn {
  background: white;
  color: #0049C5;
}

.s-btn {
  background: transparent;
  color: white;
}

.p-btn:hover {
  background: transparent;
  color: white;
}

.s-btn:hover {
  background: white;
  color: #0049C5;
}

.manage-panel {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px rgba(255, 255, 255, 0.7) solid;
}

.material-icons-outlined {
  margin: 6px;
  cursor: pointer;
  opacity: 0.7;
  user-select: none;
}

.material-icons-outlined:hover {
  opacity: 1;
}

.manage-panel .material-icons-outlined {
  font-size: 1.75em;
}
</style>
