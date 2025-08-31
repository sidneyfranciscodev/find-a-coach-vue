<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.js';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.replace('/coaches');
}
</script>

<template>
  <header>
    <nav>
      <h1><router-link to="/">Find a Coach</router-link></h1>
      <ul>
        <li><router-link to="/coaches">All Coaches</router-link></li>
        <li v-if="authStore.isLoggedIn">
          <router-link to="/requests">Requests</router-link>
        </li>
        <li v-else>
          <router-link to="/auth">Login</router-link>
        </li>
        <li v-if="authStore.isLoggedIn">
          <base-button @click="logout">Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>

$link-color: #f391e3;

@mixin menu-display($content: center){
  display: flex;
  justify-content: $content;
  align-items: center;
}

a {
  text-decoration: none;
  color: $link-color;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;

  &:active,
  &:hover,
  &.router-link-active {
   border: 1px solid $link-color;
  }
}

header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  @include menu-display();

  nav {
    width: 90%;
    margin: auto;
    @include menu-display(space-between);

    h1 {
      margin: 0;

      a {
        color: white;
        margin: 0;

        &:active,
        &:hover,
        &.router-link-active {
          border-color: transparent;
        }
      }
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      @include menu-display();

      li {
        margin: 0 0 0.5rem;
      }
    }
  }
}
</style>
