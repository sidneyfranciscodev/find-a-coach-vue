<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">Your E-mail</label>
      <input type="email" id="email" v-model.trim="email" />
    </div>
    <div class="form-control">
      <label for="message">Your Message</label>
      <textarea id="message" rows="5" v-model.trim="message"></textarea>
    </div>
    <p v-if="!formIsValid" class="errors">Please enter a valid email and message!</p>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script setup>
import { useStore } from "@/stores/store";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const route = useRoute();
const router = useRouter();

const email = ref("");
const message = ref("");
const formIsValid = ref(true);

const submitForm = () => {
  formIsValid.value = true;

  if (email.value === "" || !email.value.includes("@") || message.value === "") {
    formIsValid.value = false;
    return;
  }
  const contactDetails = {
    coachId: route.params.id,
    email: email.value,
    message: message.value,
  };
  store.addRequest(contactDetails);
  if (store.error === null) {
    router.replace("/coaches");
  }
};
</script>

<style lang="scss" scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
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
  .actions {
    text-align: center;
  }
  .errors {
    font-weight: bold;
    color: red;
  }
}
</style>
