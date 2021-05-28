<template>
  <div id="form-content">
    <div class="manage-panel">
      <span class="material-icons-outlined" title="back" @click="back">arrow_back</span>
      <span class="material-icons-outlined" title="save" @click="done">done</span>
    </div>
    <div id="form">
      <input type="text" class="input" placeholder="Title" v-model="task.title" title="Title">
      <textarea rows="10" class="input" placeholder="Description" v-model="task.description"
                title="Description"></textarea>
      <input type="number" min="0" class="input" placeholder="Weight (default 0)" v-model.number="task.weight"
             title="Weight">
      <select v-model="task.blockedBy" class="input" title="Blocked by">
        <option value=undefined disabled selected>Blocked by (default None)</option>
        <option value=undefined>None</option>
        <option v-for="task in getTasks" :key="task.id" :value="task.id">Task#{{ task.id }} {{ task.title }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskForm",
  props: {
    task: Object,
    doneCallback: Function,
  },
  methods: {
    done() {
      this.doneCallback(this.task)
    },
    back() {
      this.$router.back()
    }
  },
  computed: {
    getTasks() {
      return this.$store.getters["tasks/allTasks"]
    }
  },
}
</script>

<style scoped>
#form-content {
  min-width: 40%;
  max-width: 40%;
  margin: 20px;
}

#form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

button {
  margin: 0.5em;
  padding: .5em 1.5em;
  font-size: 0.75em;
}

#form * {
  outline: none !important;
  width: 100%;
  margin: 10px 0;
  padding: 8px;
  box-sizing: border-box;
  font-size: 1.15rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.20);
  color: white;
}

textarea {
  resize: none;
}

input[type=number] {
  appearance: none;
  -moz-appearance: textfield;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

.material-icons-outlined:first-child {
  margin-right: auto;
}

select {
  appearance: none;
}
</style>