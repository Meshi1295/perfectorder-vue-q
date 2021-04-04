<template>
  <div>

    <Files v-if="waitForData"/>
    <q-btn class="add-btn" fab icon="add" color="accent" glossy @click="goToAddFile()"/>

  </div>
</template>


<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import Files from '../components/Files'

export default {
  name: "Folder",
  components: {
    Files
  },
  computed: mapState('files', ['editedFileId', 'editedFolderId', 'files']),

  data() {
    return {
      waitForData: false,
    }
  },

  methods: {
    ...mapActions('files', ['getFiles']),
    ...mapMutations('files', ['setFiles', 'setEditedFolderIdFromFiles']),

    read() {
     this.getFiles()
      .then(() => {
    //   // this.files = filter(file => file.id === this.$route.params.id)
    //   // console.log(this.files)
      this.waitForData = true
      })
    },

    goToAddFile() {
      this.$router.push(`/AddFileId/${this.$route.params.id}/add`)
    }
  },

  created() {
    this.read()
  }
}


</script>

<style scoped>

</style>