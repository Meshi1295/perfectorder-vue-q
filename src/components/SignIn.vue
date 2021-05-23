<template>
  <div class="q-pa-md" style="max-width: 400px">
    <h5 class="h5">SignIn</h5>

    <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
    >
      <q-input
          filled
          v-model="email"
          label="Your Email *"
          hint="Email"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type email']"
      />
      <q-input
          filled
          type="password"
          v-model="password"
          label="Your Password *"
          lazy-rules
          :rules="[
          // val => val !== null && val !== '' || 'Please type your password',
          // val => val > 0 && val < 8 || 'Please type a real password'
        ]"
      />
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
      </div>
    </q-form>
  </div>
</template>
<script>

import firebaseInstance from "@/drivers/firebase/index";


export default {
  name: "SignIn",
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    onSubmit() {
      firebaseInstance.firebase.auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            this.$router.push('/SummaryPage')
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
          });
    },

    onReset() {
      this.email = null
      this.password = null
    },
  }
}
</script>

<style scoped>
.h5{
  color: #5eaaa8
}
</style>