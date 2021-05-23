<template>
  <div>
    <Register/>
    <SignIn/>
  </div>
</template>

<script>
import Register from "@/components/Register";
import SignIn from "@/components/SignIn"

export default {
  name: "Login",
  components: {Register, SignIn},

  created() {
    if(window.user){
      this.$router.push('/SummaryPage')
    }
  }
}
</script>

<style scoped>

</style>