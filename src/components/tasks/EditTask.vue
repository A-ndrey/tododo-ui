<template>
  <task-form :initial-task="task" :done-callback="saveTask"></task-form>
</template>

<script>
import TaskForm from "@/components/tasks/TaskForm";

export default {
  name: "EditTask",
  components: {TaskForm},
  props: {
    id: Number
  },
  computed: {
    task() {
      return Object.assign({}, this.$store.getters["tasks/findById"](this.id))
    }
  },
  methods: {
    saveTask(task) {
      console.log(task)
      this.$store.dispatch("tasks/update", task)
          .then(() => this.$router.push({ name: 'tasks' }))
          .catch(console.log)
    }
  }
}
</script>

<style scoped>

</style>