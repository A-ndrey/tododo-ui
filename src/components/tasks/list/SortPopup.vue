<template>
  <div id="popup">
    <p v-for="param in params()" :key="param.name" :name="param.name" @click="handle">
      <span class="order" :class="{ hide: param.order === 0 }">{{ param.order }}</span>
      <span class="material-icons-outlined">{{ param.sortType | defineIcon }}</span>
      {{ param.name | normalizeName }}
    </p>
  </div>
</template>

<script>
export default {
  name: "SortPopup",
  filters: {
    defineIcon(sortType) {
      switch (sortType) {
        case 1:
          return 'expand_less'
        case -1:
          return 'expand_more'
        default:
          return 'unfold_more'
      }
    },
    normalizeName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' ')
    }
  },
  methods: {
    params() {
      return this.$store.getters["tasks/sorting/modParams"]
    },
    handle(event) {
      this.$store.commit("tasks/sorting/changeParam", event.target.attributes.name.value)
    }
  }
}
</script>

<style scoped>
#popup {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  padding: 8px;
  font-size: 0.75em;
  color: #0039B5;
  box-shadow: 0 0 8px 0 rgba(31, 38, 135, 0.4);
}

#popup p {
  margin: 12px 6px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
}

#popup p span.hide {
  visibility: hidden;
}

.material-icons-outlined {
  opacity: 1;
  margin: 0 4px 0 0;
}
</style>