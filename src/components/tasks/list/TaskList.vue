<template>
  <div id="list">
    <div class="manage-panel">
      <router-link :to="{ name: 'new task' }" tag="span" class="material-icons-outlined" title="new task">
        add
      </router-link>
      <span class="material-icons-outlined" :class="{ activeIcon: showSort }" title="sort"
            @click="toggleSort">sort</span>
      <sort-popup class="popup" :class="{ show: showSort }"></sort-popup>
      <span class="material-icons-outlined" :class="{ activeIcon: showFilter }" title="filter" @click="toggleFilter">filter_list</span>
      <filter-popup class="popup" :class="{ show: showFilter }"></filter-popup>
    </div>
    <task-item v-for="task in getTasks" :key="task.id" :task="task"></task-item>
  </div>
</template>

<script>
import TaskItem from "@/components/tasks/list/TaskItem";
import SortPopup from "@/components/tasks/list/SortPopup";
import FilterPopup from "@/components/tasks/list/FilterPopup";

export default {
  name: "TaskList",
  components: {FilterPopup, SortPopup, TaskItem},
  data: () => ({
    showSort: false,
    showFilter: false
  }),
  methods: {
    toggleSort() {
      this.showFilter = false
      this.showSort = !this.showSort
    },
    toggleFilter() {
      this.showSort = false
      this.showFilter = !this.showFilter
    }
  },
  computed: {
    getTasks() {
      const tasks = this.$store.getters["tasks/allTasks"]
      if (tasks.length > 1) {
        const fp = this.$store.getters["tasks/filtration/actualParams"]
        const sp = this.$store.getters["tasks/sorting/actualParams"]
        return tasks.filter(t => fp.map(p => p.filterFn(t)).reduce((a, c) => a && c, true))
            .sort((t1, t2) => sp.find(p => p.compareFn(t1, t2) !== 0).compareFn(t1, t2))
      }

      return tasks
    },
  },
  mounted() {
    this.$store.dispatch('tasks/fetch')
  }
}
</script>

<style scoped>
#list {
  width: 40%;
  height: 100%;
  margin: 20px;
}

.material-icons-outlined:first-child {
  margin-right: auto;
}

.popup {
  visibility: hidden;
  position: absolute;
  z-index: 999;
  top: 110%;
  right: 0;
}

.popup.show {
  visibility: visible;
}

.activeIcon {
  opacity: 1;
}
</style>