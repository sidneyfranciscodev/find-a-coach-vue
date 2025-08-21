<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script setup>
defineProps({
  mode: {
    type: String,
    required: false,
    default: null
  },
  link: {
    type: Boolean,
    required: false,
    default: false
  },
  to: {
    type: String,
    required: false,
    default: '/'
  }
})
</script>

<style lang="scss" scoped>

$main-color: #a48bb4;
$hover-active-color: #270041;
$outline-flat: #edd2ff;

button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: $main-color;
  border: 1px solid $main-color;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;

  &:hover,
  &:active {
    background-color: $hover-active-color;
    border-color: $hover-active-color;
  }
}

.flat {
  background-color: transparent;
  color: $main-color;
  border: none;

  &:hover,
  &:active {
    background-color: $outline-flat;
  }
}

.outline {
  background-color: transparent;
  border-color: $hover-active-color;
  color: $hover-active-color;

  &:hover,
  &:active {
    background-color: $outline-flat;
  }
}
</style>