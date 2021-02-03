<template>
  <div id="form-content">
    <div class="manage-panel">
      <router-link :to="{ name: 'tasks' }" tag="span" class="material-icons-outlined" title="back">arrow_back</router-link>
      <span class="material-icons-outlined" title="save" @click="done">done</span>
    </div>
    <div id="form">
      <input type="text" placeholder="Title" v-model="task.title" title="Title">
      <textarea rows="10" placeholder="Description" v-model="task.description" title="Description"></textarea>
      <input type="number" min="0" placeholder="Weight (default 0)" v-model.number="task.weight" title="Weight">
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskForm",
  props: {
    initialTask: Object,
    doneCallback: Function,
  },
  data: function () {
    return {
      task: this.initialTask || {}
    }
  },
  methods: {
    done() {
      this.doneCallback(this.task)
    }
  }
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
</style>