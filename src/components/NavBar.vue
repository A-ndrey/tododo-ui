<template>
  <nav>
    <ul>
      <router-link tag="li" v-for="page in pages" :key="page.title" :to="{ name: page.routeName }">{{ page.title }}</router-link>
      <li>{{ username() }}<span class="material-icons-outlined">account_circle</span></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data: () => ({
    pages: [
      {
        title: 'Tasks',
        routeName: 'tasks'
      },
      {
        title: 'Goals',
        routeName: 'goals'
      }
    ]
  }),
  methods: {
    username() {
      const username = this.$store.getters.username
      if (username === '') {
        this.$store.dispatch("getUsername")
      }

      return username
    }
  }
}
</script>

<style scoped>
nav {
  user-select: none;
  margin-bottom: 20px;
  background: rgba( 255, 255, 255, 0.15 );
  box-shadow: 0 0 8px 0 rgba( 31, 38, 135, 0.30 );
}

ul {
  display: grid;
  grid-template-columns: 1fr repeat(2, auto) 1fr;
  grid-column-gap: 10px;
  justify-items: center;
  padding: 0;
  margin: auto;
  list-style: none;
}

li {
  display: flex;
  padding: 8px;
  text-decoration: none;
  cursor: pointer;
  align-items: center;
  opacity: 0.7;
  font-size: 1.2rem;
  transition-duration: 0.3s;
}

li:nth-child(1) {
  grid-column-start: 2;
}
li:nth-child(3) {
  margin-left: auto;
  margin-right: 20px;
  opacity: 1;
  font-size: 1rem;
}

li:hover {
  opacity: 1;
}

.router-link-active {
  opacity: 1;
}

.material-icons-outlined {
  font-size: 1.75em;
  opacity: 1;
}
</style>