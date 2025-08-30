<template>
  <div>
    <base-dialog :show="!!coachesStore.error" title="An error occurred!" @close="handleError">
      <p>{{ coachesStore.error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <h2>Register as a coach now!</h2>
        <coach-form @save-data="saveData"></coach-form>
      </base-card>
    </section>
  </div>
</template>

<script setup>
import CoachForm from '@/components/coaches/CoachForm.vue';
import { useCoachesStore } from '@/stores/coaches.js';
import { useRouter } from 'vue-router';

const coachesStore = useCoachesStore();
const router = useRouter();

const saveData = async (data) => {
  await coachesStore.registerCoach(data);
  if (coachesStore.check) {
    router.replace("/coaches");
    coachesStore.check = false;
  }
}

const handleError = () => coachesStore.error = null;
</script>
