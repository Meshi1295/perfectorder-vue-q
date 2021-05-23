<template>
  <div>
  <q-page class="q-pa-md main">
    <NewEmail/>
  </q-page>
  </div>
</template>

<script>
import NewEmail from "@/components/SummaryPageComp/NewEmail";
export default {
  name: "SummaryPage",
  components: {NewEmail}
}
</script>

<style lang="sass" scoped>
.main
  width: 100%
  max-width: 30%
  display: flex
  flex-direction: column
  align-items: center

</style>