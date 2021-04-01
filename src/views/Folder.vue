<template>
  <div>

    <Files v-if="waitForData" :files="files" :tableName="tableName"/>
    <q-btn class="add-btn" fab icon="add" color="accent" glossy @click="goToAddFile()"/>

  </div>
</template>


<script>
import firebaseDatabase from '../drivers/firebase/database'
import Files from '../components/Files'


export default {
  name: "Folder",
  components: {
    Files
  },

  data() {
    return {

      waitForData : false,
      files: {},
      tableName: 'files'
    }
  },

  methods: {
    getFiles() {
      firebaseDatabase.readFiles({secondEntity: this.tableName, id: this.$route.params.id})
          .then((res) => {
            debugger
            this.files = res.filter(file => file.id == this.$route.params.id)
            console.log(this.files)
            this.waitForData =true
          })
    },

    goToAddFile() {
      this.$router.push(`/AddFileId/${this.$route.params.id}/add`)
    }
  },

  created() {
    debugger
    this.getFiles();
  }
}


</script>

<style scoped>

</style>