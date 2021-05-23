<template>
  <div>
    <q-layout view="lHh Lpr lFf">
      <q-header>
          <q-toolbar class="bg-primary text-white q-my-md shadow-2">
            <q-btn flat round dense icon="menu" class="q-mr-sm"/>

            <q-space/>
            <q-btn push color="primary" @click="logOut()">התנתק</q-btn>
          </q-toolbar>
      </q-header>

      <div>
        <q-footer class="text-bg-footer">
          <q-toolbar>
            <q-space/>
            <q-toolbar-title>Perfect Order@</q-toolbar-title>

          </q-toolbar>
        </q-footer>
      </div>

      <q-page-container style="background-color: #f8f1f1">
        <router-view></router-view>
      </q-page-container>

    </q-layout>
  </div>
</template>

<script>
import firebaseInstance from "@/drivers/firebase";
import SummaryPage from "@/views/SummaryPage";

export default {
  name: "MainLayout",
  components: {SummaryPage},
  data() {
    return {

      model: 'one'

    }
  },
  methods: {
    logOut() {
      firebaseInstance.firebase.auth().signOut()
          .then(() => {
            window.user = null
            this.$router.push('Login')
          })
          .catch(() => {
            alert('error')
          });
    }
  },

  created() {
    if (window.user != null){
      this.$router.push('/SummaryPage')
    } else {
      this.$router.push('/Login')
    }
  }
}
</script>

<style scoped>

</style>