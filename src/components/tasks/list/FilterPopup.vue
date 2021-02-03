<template>
  <div id="popup">
    <details v-for="param in params()" :key="param.name" :name="param.name" open>
      <summary>{{ param.name | normalizeName }}</summary>
      <p v-for="opt in param.options" :key="opt.name" :name="opt.name">
        {{ opt.name | normalizeName }}
        <span v-if="typeof opt.value === 'boolean'" class="material-icons-outlined" :class="{ iconOff: !opt.value }"
              @click="handleClick">{{ opt.value | defineIcon }}</span>
        <input v-else type="number" min="0" @focusout="handleInput">
      </p>
    </details>
  </div>
</template>

<script>
export default {
  name: "FilterPopup",
  filters: {
    defineIcon(filterOptVal) {
      switch (filterOptVal) {
        case false:
          return 'toggle_off'
        case true:
          return 'toggle_on'
        default:
          return 'report_problem'
      }
    },
    normalizeName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' ')
    }
  },
  methods: {
    params() {
      return this.$store.getters["tasks/filtration/allParams"]
    },
    handleClick(event) {
      this.$store.commit(
          "tasks/filtration/changeOptStatus",
          {
            paramName: event.target.parentNode.parentNode.attributes.name.value,
            optName: event.target.parentNode.attributes.name.value
          }
      )
    },
    handleInput(event) {
      this.$store.commit(
          "tasks/filtration/changeOptValue",
          {
            paramName: event.target.parentNode.parentNode.attributes.name.value,
            optName: event.target.parentNode.attributes.name.value,
            val: event.target.value
          }
      )
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

#popup details {
  margin: 12px 0;
}

#popup p {
  margin: 6px 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  cursor: pointer;
}

#popup summary {
  cursor: pointer;
}

.material-icons-outlined {
  opacity: 1;
  margin: 0 0 0 8px;
}

.material-icons-outlined.iconOff {
  opacity: 0.5;
}

input[type=number] {
  font-size: 0.8em;
  text-align: center;
  width: 3em;
  margin: 0 0 0 8px;
  padding: 4px;
  border: 1px solid #0039B5;
  color: #0039B5;
  border-radius: 4px;
  background: transparent;
  appearance: none;
  -moz-appearance: textfield;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
</style>