<template>
  <div class="q-pa-md" style="max-width: 400px">
    <h5 class="h5">Register</h5>
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
    <q-btn @click="login()">התחבר</q-btn>

  </div>

</template>

<script>
import firebaseInstance from "@/drivers/firebase/index";

export default {
  name: "Register",

  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      const provider = new firebaseInstance.firebase.auth.GoogleAuthProvider();
      firebaseInstance.firebase.auth()
          .signInWithPopup(provider)
          .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            window.user = result.user;
            this.$router.push('/home')
            // ...
          }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
      });
    },
    onSubmit() {
      firebaseInstance.firebase.auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((userCredential) => {
            var user = userCredential.user;
            window.user = userCredential.user;
            this.$router.push('/home')
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
          });
    },
    onReset() {
      this.email = null
      this.password = null
    }
  },
}
</script>

<style scoped>
/*.q-pa-md{*/
/*  background-color: #f7f7e8;*/


/*}*/
.h5{
  color: #5eaaa8
}
</style>