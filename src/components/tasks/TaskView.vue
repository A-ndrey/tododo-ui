<template>
  <div id="view-content">
    <div class="manage-panel">
      <router-link :to="{ name: 'tasks' }" tag="span" class="material-icons-outlined" title="back">arrow_back
      </router-link>
      <router-link :to="{ name: 'edit task', params: { id: task.id} }" tag="span" class="material-icons-outlined"
                   title="edit">edit
      </router-link>
    </div>
    <div id="view">
      <p id="done-status" v-if="task.is_done"><span class="material-icons-outlined">check_circle</span>Task done</p>
      <h2>{{ task.title }}</h2>
      <h4>{{ task.description }}</h4>
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
    id: Number
  },
  created() {
    this.task = this.$store.getters["tasks/findById"](this.id)
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

#done-status {
  display: flex;
  align-items: center;
  user-select: none;
  cursor: default;
  font-size: 0.75em;
}

#done-status .material-icons-outlined {
  opacity: 1;
  cursor: inherit;
  font-size: inherit;
  margin: 0 2px 0 0;
}
</style>