<template>
  <task-form :task="task" :done-callback="saveTask"></task-form>
</template>

<script>
import TaskForm from "@/components/tasks/TaskForm";

export default {
  name: "EditTask",
  components: {TaskForm},
  props: {
    id: String
  },
  computed: {
    task() {
      return this.$store.getters["tasks/findById"](parseInt(this.id))
    }
  },
  methods: {
    saveTask(task) {
      this.$store.dispatch("tasks/update", task)
          .then(() => this.$router.push({ name: 'tasks' }))
          .catch(console.log)
    }
  },
  mounted() {
    this.$store.dispatch('tasks/fetch')
  }
}
</script>

<style scoped>

</style>