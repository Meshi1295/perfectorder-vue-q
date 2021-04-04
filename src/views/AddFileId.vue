<template>
  <div>
    <File v-if="waitForData"
          :file="file"/>

  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'

// import firebaseDatabase from '../drivers/firebase/database'
import File from "@/components/File";

export default {
  name: "AddFileId",
  components: {File},

  computed : mapState('files', ['editedFolderId', 'editedFileId']),

  data: () => ({

    waitForData: false,
    file: null,
    tableName: 'files',
  }),

  methods: {
    ...mapActions('files',['setEditFileById']),
    ...mapMutations('files',['setEditedFolderId']),
    getFileById() {
      //add folderId
     this.setEditedFolderId()
      this.setEditFileById()

          .then((result) => {
            this.file = result
            this.waitForData = true

          })
    },
  },

  created() {
    //if there new file or exist file
    if (this.$route.params.fileId === 'add') {
      this.waitForData = true
      //folder

    } else {
      //files
      this.waitForData = false
      this.getFileById()

    }
  },
}

</script>

<style scoped>

</style>