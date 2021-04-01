<template>
  <div >
    <File v-if="waitForData" :folderId=$route.params.folderId :fileId=$route.params.fileId :tableName="tableName" :file="file"/>

  </div>
</template>

<script>
import firebaseDatabase from '../drivers/firebase/database'
import File from "@/components/File";

export default {
  name: "AddFileId",
  components: {File},

  data: () => ({

    waitForData: false,
    // isReload: false,
    file: null,
    tableName: 'files',
    folderId: '',
    fileId:''
  }),

  methods: {


getFileById(){
  firebaseDatabase.getFile({secondEntity: this.tableName,folderId: this.$route.params.folderId, fileId: this.$route.params.fileId})
  .then((result)=> {
    this.file=result
    this.waitForData = true

  })
},

    getUpdatedById() {
      firebaseDatabase.UpdatedById({
        secondEntity: this.tableName, folderId: this.$route.params.id,
        fileId: this.$route.params.id
      })
          .then((res) => {
            console.log(res)
            this.file = res
            this.waitForData = true
          })
    },

    // reloadFiles() {
    //   this.isReload = !this.isReload
    //
    // }
  },

  created() {
    //if there new file or exist file
    if (this.$route.params.fileId === 'add') {
      this.waitForData=true
    //folder

      } else {
      //files
      this.waitForData=false
      this.getFileById()

    }
  },
}

</script>

<style scoped>

</style>