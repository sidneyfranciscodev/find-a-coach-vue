<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script setup>
import CoachForm from '@/components/coaches/CoachForm.vue';
import { useStore } from '@/stores/store';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const saveData = (data) => {
  store.registerCoach(data);
  router.replace('/coaches');
}
</script>