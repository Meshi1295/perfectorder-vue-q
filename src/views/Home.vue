<template>
  <div class="home">
    <Folders v-if="isReady"/>
    <q-btn class="add-btn" fab icon="add" color="accent" glossy @click="goToAddFolder()"/>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

import Folders from "@/components/Folders";

export default {
  name: 'Home',
  components: {Folders},

  computed: mapState('folders',['editedFolder', 'folders']),

  data() {
    return {
      tableFolders: 'allFolders',
      isReady: false

    }
  },

  methods: {
    ...mapActions('folders',['getFolders']),

   async read(){
      await this.getFolders()
      this.isReady = true
    },

    goToAddFolder() {
      this.$router.push(`/addFolder/add`)
    }
  },

   created() {
    this.read()
  }
}
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;


  .add-btn {
    position: fixed;
    top: 85%;
    left: 95%;
  }
}

</style>
