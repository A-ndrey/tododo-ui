<template>
  <task-form :done-callback="createTask"></task-form>
</template>

<script>
import TaskForm from "@/components/tasks/TaskForm";
export default {
  name: "NewTask",
  components: {TaskForm},
  methods: {
    createTask(task) {
      this.$store.dispatch('tasks/create', task)
          .then(() => this.$router.push({name: 'tasks'}))
          .catch(console.log)
    }
  }
}
</script>

<style scoped>

</style>