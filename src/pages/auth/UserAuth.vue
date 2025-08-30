<template>
  <div>
    <base-dialog :show="!!authStore.error" title="An error ocurred" @close="handleError">
      <p>{{ authStore.error }}</p>
    </base-dialog>
    <base-dialog :show="authStore.isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="handleSubmit">
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password"/>
        </div>
        <p v-if="!formIsValid"> Please enter a valid email and password (min 6 characters)</p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCaption}}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.js';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const formIsValid = ref(true);
const mode = ref('login')

const handleSubmit = async () => {
  formIsValid.value = true;

  if (email.value == '' || !email.value.includes('@') || password.value.length < 6 ) {
    formIsValid.value = false;
    return;
  }
  if (mode.value === 'login') {
    await authStore.login({
      email: email.value,
      password: password.value,
    });
  } else {
    await authStore.signup({
      email: email.value,
      password: password.value,
    });
  }
  if (authStore.check) {
    router.replace("/coaches");
    authStore.check = false;
  }
};

const handleError = () => {
    authStore.error = null;
}

const switchAuthMode = () => {
    if (mode.value === 'login') mode.value = 'signup';
    else mode.value = 'login';
}

const submitButtonCaption = computed(() => {
    if (mode.value === 'login') return 'Login';
    else return 'Signup'
});

const switchModeButtonCaption = computed(() => {
    if (mode.value === 'login') return 'Signup instead';
    else return 'Login Instead'
});
</script>

<style lang="scss" scoped>
form {
  margin: 1rem;
  padding: 1rem;

  .form-control {
    margin-bottom: 0.5rem 0;

    label {
      font-weight: bold;
      margin-bottom: 0.5rem;
      display: block;
    }
    input,
    textarea {
      font: inherit;
      border: 1px solid #ccc;
      width: 100%;
      display: block;
      padding: 0.15rem;

      &:focus {
        outline: none;
        border-color: #3d008d;
        background-color: #faf6ff;
      }
    }
  }
}
</style>
