<template>
  <div id="item">
    <span id="box" :class="{ checked: task.isDone }" class="material-icons-outlined" @click="changeStatus"></span>
    <p id="desc" :title="task.title">{{ task.title }}</p>
    <div id="modify">
      <router-link :to="{ name: 'view task', params: { id: task.id} }" tag="span" class="material-icons-outlined"
                   title="open">open_in_new
      </router-link>
      <router-link :to="{ name: 'edit task', params: { id: task.id} }" tag="span" class="material-icons-outlined"
                   title="edit">edit
      </router-link>
      <span class="material-icons-outlined" title="delete" @click="remove">clear</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskItem",
  props: {
    task: Object
  },
  methods: {
    changeStatus() {
      this.$store.dispatch('tasks/changeStatus', this.task.id)
    },
    remove() {
      this.$store.dispatch('tasks/delete', this.task.id)
    }
  }
}
</script>

<style scoped>
#item {
  font-size: 16pt;
  margin: 20px 0;
  display: flex;
  align-items: center;
}

#box:after {
  /*content: 'check_box_outline_blank';*/
  content: 'radio_button_unchecked';
}

#box.checked:after {
  /*content: 'check_box';*/
  content: 'check_circle';
}

#box.checked + #desc {
  opacity: 0.7;
  text-decoration-line: line-through;
}

#modify {
  margin-left: auto;
  display: none;
  align-items: center;
}

#item:hover #modify {
  display: flex;
}

#desc {
  margin: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.material-icons-outlined {
  font-size: 1em;
}
</style>