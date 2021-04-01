<template class="app">
  <q-layout view="lHh Lpr lFf">
    <div class="q-pa-md">
      <q-toolbar class="bg-primary text-white q-my-md shadow-2">
        <q-btn flat round dense icon="menu" class="q-mr-sm"/>

        <q-space/>

        <q-btn-toggle
            v-model="model"
            flat stretch
            toggle-color="grey-10"
            :options="[
          {label: 'מסקנות השנה', value: 'one'},
          {label: 'ארכיון', value: 'two'},
        ]"
        />
      </q-toolbar>


    </div>
    <div>
      <q-footer class="text-bg-footer">
        <q-toolbar >
          <q-space/>
          <q-toolbar-title>Perfect Order@</q-toolbar-title>

        </q-toolbar>
      </q-footer>
    </div>

    <q-page-container style="background-color: #f8f1f1">
      <router-view></router-view>
    </q-page-container>

  </q-layout>
</template>

<script>

import Home from "@/views/Home";

export default {
  name: 'LayoutDefault',

  components: {
    Home,
  },

  data() {
    return {
      leftDrawerOpen: false,

      model: 'one'

    }
  }
}
</script>

<style>



</style>
