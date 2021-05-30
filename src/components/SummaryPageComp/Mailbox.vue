<template>
  <div>
    <q-item>
      <q-item-section @click="goHome">
        <q-card>
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
            <div class="text-subtitle2 absolute-top text-center">
              תיבת הדואר שלי
            </div>
          </q-img>
        </q-card>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: "Mailbox",

  methods: {
    goHome() {
      this.$router.push(`/home`)
    }
  }
}
</script>

<style  scoped>

</style>

