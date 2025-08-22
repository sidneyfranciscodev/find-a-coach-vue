<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="lastname">Firstname</label>
      <input type="text" id="firstname" v-model.trim="firstName"/>
    </div>
    <div class="form-control">
      <label for="lastname">Lastname</label>
      <input type="text" id="lastname" v-model.trim="lastName"/>
    </div>
    <div class="form-control">
      <label for="descrition">Description</label>
      <textarea type="text" id="description" rows="5" v-model.trim="description"></textarea>
    </div>
    <div class="form-control">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" v-model.number="rate"/>
    </div>
    <div class="form-control">
      <h3>Areas of Expertise</h3>
      <div>
        <input type="checkbox" id="frontend" value="frontend" v-model="areas"/>
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input type="checkbox" id="backend" value="backend" v-model="areas"/>
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input type="checkbox" id="career" value="career" v-model="areas"/>
        <label for="career">Career Advisory</label>
      </div>
    </div>
    <base-button>Register</base-button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const firstName = ref('');
const lastName = ref('');
const description = ref('');
const rate = ref(null);
const areas = ref([])

const submitForm = () => {
  const formData = {
    first: firstName.value, 
    last: lastName.value, 
    desc: description.value, 
    rate: rate.value, 
    areas: areas.value
  };
}
</script>