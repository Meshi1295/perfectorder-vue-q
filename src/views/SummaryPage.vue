<template>
  <div>
  <q-page class="q-pa-md main">
    <NewEmail/>
    <Mailbox/>
  </q-page>
  </div>
</template>

<script>
import NewEmail from "@/components/SummaryPageComp/NewEmail";
import Mailbox from "@/components/SummaryPageComp/Mailbox";
export default {
  name: "SummaryPage",
  components: {NewEmail, Mailbox}
}
</script>

<style lang="sass" scoped>
.main
  display: flex
  flex-direction: row
  align-items: center
  width: 30%

</style>
