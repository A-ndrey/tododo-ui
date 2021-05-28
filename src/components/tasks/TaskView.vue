<template>
  <div id="view-content">
    <div class="manage-panel">
      <span class="material-icons-outlined" title="back" @click="back">arrow_back</span>
      <router-link :to="{ name: 'edit task', params: { id: task.id} }" tag="span" class="material-icons-outlined"
                   title="edit">edit
      </router-link>
    </div>
    <div id="view">
      <p class="task-info" v-if="task.isDone"><span class="material-icons-outlined">check_circle</span>Task done</p>
      <p class="task-info" v-if="task.blockedBy"><span class="material-icons-outlined">lock</span>Blocked by {{task.blockedBy}}</p>
      <h2>{{ task.title }}</h2>
      <h4 v-html="htmlLinks(task.description)"></h4>
      <h5>Weight: {{ task.weight }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskView",
  data: () => ({
    task: {}
  }),
  props: {
    id: String
  },
  methods: {
    htmlLinks: (text) => {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      return text.replace(urlRegex, '<a href="$1">$1</a>')
    },
    back() {
      this.$router.back()
    }
  },
  created() {
    this.task = this.$store.getters["tasks/findById"](parseInt(this.id))
    console.log(this.task)
  }
}
</script>

<style scoped>
#view-content {
  min-width: 40%;
  max-width: 40%;
  margin: 20px;
}

#view {
  margin: 6px;
}

.material-icons-outlined:first-child {
  margin-right: auto;
}

.task-info {
  display: flex;
  align-items: center;
  user-select: none;
  cursor: default;
  font-size: 0.75em;
}

.task-info .material-icons-outlined {
  opacity: 1;
  cursor: inherit;
  font-size: inherit;
  margin: 0 2px 0 0;
}
</style>