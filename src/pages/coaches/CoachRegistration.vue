<template>
  <div>
    <base-dialog :show="!!store.error" title="An error occurred!" @close="handleError">
      <p>{{ store.error }}</p>
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
import { useStore } from '@/stores/store';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const saveData = async (data) => {
  await store.registerCoach(data);
  if (store.check) {
    router.replace("/coaches");
    store.check = false;
  }
}

const handleError = () => store.error = null;
</script>
