<script setup>
import TheHeader from './components/layout/TheHeader.vue';
import { useAuthStore } from './stores/auth';
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
authStore.autoLogin();

const router = useRouter();

const didAutoLogout = computed(() => authStore.didAutoLogout);

watch(didAutoLogout, (curVal, oldVal) => {
  if (curVal && curVal !== oldVal) {
    router.replace('/coaches');
    authStore.didAutoLogout = false;
  }
});
</script>

<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<style>
 @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}
html {
  font-family: "Roboto", sans-serif;
}
body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

</style>
