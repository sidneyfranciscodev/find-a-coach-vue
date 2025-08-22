<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: invalid.firstName }">
      <label for="firstname">Firstname</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstName"
        @blur="clearValidity('firstName')"
      />
      <p v-if="invalid.firstName">Firstname must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: invalid.lastName }">
      <label for="lastname">Lastname</label>
      <input type="text" id="lastname" v-model.trim="lastName" @blur="clearValidity('lastName')" />
      <p v-if="invalid.lastName">Lastname must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: invalid.description }">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="invalid.description">Description must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: invalid.rate }">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" v-model.number="rate" @blur="clearValidity('rate')" />
      <p v-if="invalid.rate">rate must not be empty or negative number</p>
    </div>
    <div class="form-control" :class="{ invalid: invalid.areas }">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas"
          @blur="clearValidity('areas')"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas"
          @blur="clearValidity('areas')"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="invalid.areas">select at least one area of expertise</p>
    </div>
    <base-button>Register</base-button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['save-data'])

const firstName = ref('')
const lastName = ref('')
const description = ref('')
const rate = ref(null)
const areas = ref([])

const invalid = ref({
  firstName: false,
  lastName: false,
  description: false,
  rate: false,
  areas: false,
})

// Clear validity for a specific field
const clearValidity = (field) => {
  invalid.value[field] = false
}

const validateForm = () => {
  invalid.value.firstName = !firstName.value
  invalid.value.lastName = !lastName.value
  invalid.value.description = !description.value
  invalid.value.rate = !rate.value || rate.value <= 0
  invalid.value.areas = areas.value.length === 0

  return (
    !invalid.value.firstName &&
    !invalid.value.lastName &&
    !invalid.value.description &&
    !invalid.value.rate &&
    !invalid.value.areas
  )
}

const submitForm = () => {
  if (!validateForm()) {
    return
  }
  const formData = {
    first: firstName.value,
    last: lastName.value,
    desc: description.value,
    rate: rate.value,
    areas: areas.value,
  }
  emit('save-data', formData)
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}
input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}
input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}
input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}
input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}
input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}
h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}
.invalid label {
  color: red;
}
.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
