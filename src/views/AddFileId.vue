<template>
  <div>
    <File v-if="waitForData"/>

  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'

import File from "@/components/File";

export default {
  name: "AddFileId",
  components: {File},

  computed : mapState('files', ['editedFolderId', 'editedFileId']),

  data: () => ({

    fileId:'',
    waitForData: false,
    file: null,
    tableName: 'files',
  }),

  methods: {
    ...mapActions('files',['setEditFileById']),
    ...mapMutations('files',['setEditedFolderIdFromFiles','setEditedFileId']),
    getFileById(fileId) {
      //add folderId
     this.setEditedFolderIdFromFiles(this.editedFolderId)
      //add fileId
      this.setEditedFileId(fileId)
      this.setEditFileById()
          .then(() => {
            this.waitForData = true

          })
    },
  },

  created() {
    //if there new file or exist file
    if (this.$route.params.fileId === 'add') {
      debugger;
      this.waitForData = true
      //folder

    } else {
      //files
      this.waitForData = false
      debugger;
      this.getFileById(this.$route.params.fileId)

    }
  },
}


</script>

<style scoped>

</style>